import xhrPool from './XhrPool.js';

const requestButton = document.querySelectorAll('.request_button');
const cancelButton = document.querySelectorAll('.request_cancel');
const cancelAllButton = document.querySelector('.request_cancelAll');
const requestListContainer = document.querySelector('.request_onGoing');
const responseLogContainer = document.querySelector('.responseLog');

requestButton.forEach(el => {
  el.addEventListener('click', (e) => {
    const url = e.currentTarget.dataset.url;
    const request = xhrPool.sendRequest(url);
    updateRequestList();
    request.then((res) => {
      addResponseLog(res);
      updateRequestList();
    }, (errorMessage) => {
      console.log(errorMessage);
      updateRequestList();
    });
  });
});

cancelButton.forEach(el => {
  el.addEventListener('click', (e) => {
    const url = e.currentTarget.dataset.url;
    xhrPool.abort(url);
    updateRequestList();
  });
});

cancelAllButton.addEventListener('click', () => {
  xhrPool.reset();
  updateRequestList();
});

const updateRequestList = () => {
  while (requestListContainer.firstChild) {
    requestListContainer.removeChild(requestListContainer.firstChild);
  }
  xhrPool.requestList().forEach(req => {
    const el = document.createElement('li');
    el.appendChild(document.createTextNode(`${req.method} ${req.url}`));
    requestListContainer.appendChild(el);
  });
}

const addResponseLog = (res => {
  const el = document.createElement('li');
  el.appendChild(document.createTextNode(res.timestamp));
  responseLogContainer.appendChild(el);
});
