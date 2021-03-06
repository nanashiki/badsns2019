'use strict';

const main = () => {
  $$('form-login').addEventListener('submit', (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append('login_id', $$('input-login-id').value);
    body.append('pass', $$('input-pass').value);

    const process = result => {
      if (result.errors) {
        // ログイン失敗
        $$('div-errors').innerHTML = '';
        result.errors.forEach(value => $$('div-errors').innerHTML += `<p class="bg-danger text-danger">${value}</p>`);
      } else {
        // ログイン成功
        top.location = '/'; // メイン画面を表示
      }
    }

    fetcher('/sessions', { method: 'POST', body: body }, process);
  });
}

document.addEventListener('DOMContentLoaded', main);
