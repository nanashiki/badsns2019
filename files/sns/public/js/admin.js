'use strict';

const main = () => {
  (function init() {
    const process = result => {
      if (result && result.users) {
        // Admin権限を持つユーザのみAPIから結果を得られる
        document.documentElement.removeAttribute('hidden');
        result.users.forEach(user => {
          $$('table-body-users').appendChild(createUserElement(user));
        });
      } else {
        // それ以外のユーザはメイン画面にリダイレクト
        top.location = "/";
      }
    }
    fetcher('/users', { method: 'GET' }, process);
  })();

  // ユーザ情報1行のDOM生成
  function createUserElement(user) {
    const tr = document.createElement('tr');
    const columns = ['id', 'login_id', 'name', 'email', 'pass', 'admin', 'icon', 'icon_file_name', 'created_at'];

    columns.forEach(column => {
      const td = document.createElement('td');
      if (column == 'admin') {
        td.textContent = user[column] ? 'Admin' : '';
      } else if (column == 'icon') {
        const img = document.createElement('img');
        img.src = `/users/${user.id}/icon`;
        img.width = img.height = 128;
        td.appendChild(img);
      } else {
        td.textContent = user[column];
      }
      tr.appendChild(td);
    });
    return tr;
  }
}

document.addEventListener('DOMContentLoaded', main);
