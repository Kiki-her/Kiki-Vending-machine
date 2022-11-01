const receiptline = require('receiptline');
const http = require('http');
const message = 'Hey';

const text = `Kiki Vending Machine
ナマケモノ都
登録番号　K1234555

2022年11月1日 12:00
{border:line; width:22}
^領 収 書
{border:space; width: 30}
-
{border:space; width:3,14,3,6}
198  | dog-lovers | 1個 | ¥200*
398 | cat-party | 2個 | ¥500*
{border:space; width: 30}
-
{border:space; width: 26}
your dog is good boy.
your cat is master.
cat is god.
${message}
{border:space; width: 30}
-
{width:5,5,16; text:wrap}
小計 | 3点 | ¥700
{border:space; width: 30}
-
{width:auto}
合計 | ^¥700
お預かり | ^¥1,000
お釣り | ^¥300
*印はかわいい免税対象商品です

010001000100100101000111`;

const svg = receiptline.transform(text, {cpl: 32, encoding: 'cp932', spacing: 'true'});
const style = 'float: left; padding: 24px; background: lavender;';
const html = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>レシート</title>
    </head>
    <body>
        <div style="${style}">${svg}</div>
    </body>
</html>`;

// HTTP Server
const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            res.end(html);
            break;
        default:
            res.end();
            break;
    }
});
server.listen(8080, "127.0.0.1", () => {
    console.log('Server running at http://127.0.0.1:8080/');
});


