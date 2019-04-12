'use strict';

const main = () => {
  $$('form-password-forget').addEventListener('submit', (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append('email', $$('input-email').value);

    const process = result => {
      if (result.errors) {
        // メール送信失敗
        $$('div-errors').innerHTML = '';
        result.errors.forEach(value => $$('div-errors').innerHTML += `<p class="bg-danger text-danger">${value}</p>`);
      } else {
        // メール送信成功
        $$('div-errors').innerHTML = '<p class="bg-success text-success">メールを送信しました</p>';
      }
    }
    fetcher('/password_reset', { method: 'POST', body: body }, process);
  });
}

document.addEventListener('DOMContentLoaded', main);
