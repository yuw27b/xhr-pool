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
  document.querySelectorAll('.request_onGoing > li').forEach(el => {
    el.remove();
  });
  const requestListItems = xhrPool.requestList().map(req => {
    const el = document.createElement('li');
    el.append(`${req.method} ${req.url}`);
    return el;
  });
  requestListContainer.append(...requestListItems);
}

const addResponseLog = (res => {
  const el = document.createElement('li');
  el.append(res.timestamp);
  responseLogContainer.append(el);
});
