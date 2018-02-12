class XhrPool {
  constructor() {
    this.requestQue = [];
  }

  sendRequest(url) {
    return new Promise((resolve, reject) => {
      if (this.requestQue.length >= 6) {
        reject('Xhr que is full');
        return;
      }
      const xhr = new XMLHttpRequest();
      this.requestQue.push({url: url, method: 'GET', xhrObj: xhr});

      xhr.open('GET', url, true);
      xhr.onload = () => {
        this._removeReq(xhr);
        if (xhr.status === 200) {
          const res = xhr.response === '' ? null : JSON.parse(xhr.response);
          resolve(res);
        } else {
          reject(xhr.status);
        }
      };
      xhr.onerror = () => {
        this._removeReq(xhr);
        reject(xhr.status);
      };
      xhr.send();
    });
  }

  requestList() {
    return this.requestQue;
  }

  abort(url, method) {
    let aborted = [];
    this.requestQue.forEach(req => {
      if (req.url.replace(/\?.*$/, '') === url.replace(/\?.*$/, '') && url.method === method) {
        req.xhrObj.abort();
        aborted.push(req);
      }
    });
    aborted.forEach(req => {
      this._removeReq(req.xhrObj);
    });
  }

  reset() {
    this.requestQue.forEach(req => {
      req.xhrObj.abort();
    });
    this.requestQue = [];
  }

  _removeReq(xhrObj) {
    let newQue = [];
    this.requestQue.forEach(req => {
      if (req.xhrObj !== xhrObj) {
        newQue.push(req);
      }
    });
    this.requestQue = newQue;
  }
};

export default new XhrPool();
