exports.get = (url, params, callback) => {
  let xhr = new XMLHttpRequest();

  if (!params) {
    params = '';
  }

  xhr.open('GET', url + params);
  xhr.onload = () => {
    if (xhr.status === 200) {
      callback(xhr.responseText);
    } else {
      callback('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
};
