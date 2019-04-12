'use strict';

const main = () => {
  $$('form-password-reset').addEventListener('submit', (event) => {
    event.preventDefault();

    const params = getUrlParams(location.href);
    const url = `password_reset/${params['reset_token']}`;

    const body = new FormData();
    body.append('pass', $$('input-pass').value);

    const process = result => {
      if (result.errors) {
        // パスワードリセット失敗
        $$('div-errors').innerHTML = '';
        result.errors.forEach(value => $$('div-errors').innerHTML += `<p class="bg-danger text-danger">${value}</p>`);
      } else {
        // パスワードリセット成功
        top.location = '/'; // メイン画面を表示
      }
    }
    fetcher(url, { method: 'PUT', body: body }, process);
  });
}

document.addEventListener('DOMContentLoaded', main);
