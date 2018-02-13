import xhrPool from './XhrPool.js';

const requestButton = document.querySelectorAll('.request_button');
const cancelButton = document.querySelectorAll('.request_cancel');
const cancelAllButton = document.querySelector('.request_cancelAll');
const requestListContainer = document.querySelector('.pendingList_ul');
const responseLogContainer = document.querySelector('.responseLog_ul');
const clearButton = document.querySelector('.clear_button');

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
  document.querySelectorAll('.pendingList_ul > li').forEach(el => {
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

clearButton.addEventListener('click', () => {
  document.querySelectorAll('.responseLog_ul > li').forEach(el => {
    el.remove();
  });
});
