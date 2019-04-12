'use strict';

const main = () => {
  $$('div-drop').addEventListener('dragover', (event) => event.preventDefault());
  $$('div-drop').addEventListener('drop', (event) => {
    event.preventDefault();

    if ($$('input-icon-file-name').value.length > 0) return;

    $$('div-drop').textContent = '画像アップロード中';
    $$('div-drop').classList.add('drop-zone-droped');

    const body = new FormData();
    body.append('image', event.dataTransfer.files[0]);
    body.append('resize_max_pixel', 240);

    const process = result => {
      if (result.file_name) {
        // 画像アップロード成功
        $$('div-drop').textContent = '画像アップロード完了';
        $$('div-errors').innerHTML = '';
        $$('input-icon-file-name').value = result.file_name
      } else {
        // 画像アップロード失敗
        $$('div-drop').textContent = 'ここに画像をドロップ';
        $$('div-drop').classList.remove('drop-zone-droped');
        $$('div-errors').innerHTML = '<p class="bg-danger text-danger">画像のアップロードに失敗しました</p>';
      }
    }
    fetcher('/icons', { method: 'POST', body: body }, process);
  });

  $$('form-register').addEventListener('submit', (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append('user[login_id]', $$('input-login-id').value);
    body.append('user[name]', $$('input-name').value);
    body.append('user[email]', $$('input-email').value);
    body.append('user[pass]', $$('input-pass').value);
    body.append('user[icon_file_name]', $$('input-icon-file-name').value);

    const process = result => {
      if (result.errors) {
        // ユーザ登録失敗
        $$('div-errors').innerHTML = '';
        result.errors.forEach(value => $$('div-errors').innerHTML += `<p class="bg-danger text-danger">${value}</p>`);
      } else {
        // ユーザ登録成功
        top.location = '/'; // メイン画面を表示
      }
    }
    fetcher('/users', { method: 'POST', body: body }, process);
  });
}

document.addEventListener('DOMContentLoaded', main);
