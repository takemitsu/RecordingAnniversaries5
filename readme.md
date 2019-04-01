# RecordingAnniversaries

> [RecordingAnniversaries](https://github.com/takemitsu/RecordingAnniversaries) のLaravel 5.8 Version。
> 次のLTSが出たら対応予定

[サーバ要件](https://readouble.com/laravel/5.8/ja/installation.html#server-requirements)

- PHP >= 7.1.3
- OpenSSL PHP拡張
- PDO PHP拡張
- Mbstring PHP拡張
- Tokenizer PHP拡張
- XML PHP拡張
- Ctype PHP拡張
- JSON PHP拡張
- BCMath PHP拡張

## 準備

### mysql (5.7.18)

for dev

> 本番時にはユーザ権限は適切に設定すること  
> 5.7 より新しい場合は以下は失敗する恐れあり(主にgrantの部分)

```mysql
create database ra5;
grant all privileges on ra5.* to ra_user@localhost identified by 'secret';
```

.env (以下インストール内の .env編集時に行う)

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ra5
DB_USERNAME=ra_user
DB_PASSWORD=secret
```

connection, database, host, port, user, password は合わせること

TODO: 色々書く

## インストール

```bash
$ git clone xxx.git ra5
$ cd ra5
$ cp .env.example .env
$ # ( ここで .env 編集 )
$ composer install
$ php artisan key:generate
$ php artisan migrate
```

## 動作確認

```bash
$ php artisan serve
```

デフォルトだと localhost:8000 でアクセスできるはず。
