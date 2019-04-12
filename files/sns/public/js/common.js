'use strict';

function fetcher(url, request, callback) {
  request['headers'] = { 'X-Requested-With': 'Fetch' };
  request['credentials'] = 'include';
  request['cache'] = 'no-cache';

  const process = response => {
    if (response.status === 502) {
      alert('サーバを起動していますので、しばらくお待ちください。');
    } else {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(json => json);
      }
    }
  };

  fetch(url, request).then(process).then(callback);
}

function getUrlParams(url) {
  // URLパラメータを抽出して連想配列を作成
  const params = {};
  const param_index = url.indexOf("?") + 1;
  if (!param_index) return params

  url.slice(param_index).split("&").forEach(param => {
    const kv = param.split("=");
    params[kv[0]] = kv[1];
  });
  return params;
}

const $$ = (id) => document.getElementById(id);

Node.prototype.prependChild = function (e) { this.insertBefore(e, this.firstChild); }
