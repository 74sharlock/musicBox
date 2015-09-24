'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var Actions = {
    songAction: function songAction(source) {
        var that = this,
            buffers = [];
        source = decodeURIComponent(source);

        var headers = {
            'Accept-Encoding': 'identity;q=1, *;q=0',
            'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Host': 'file.qianqian.com',
            'Pragma': 'no-cache',
            'Range': 'bytes=0-',
            'Referer': 'http://file.qianqian.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
        };

        var config = {
            hostname: 'file.qianqian.com',
            port: 80,
            path: source.replace('http://file.qianqian.com/', ''),
            method: 'GET',
            headers: headers
        };

        var req = _http2['default'].request(config, function (res) {
            res.on('data', function (chuck) {
                return buffers.push(chuck);
            });
            res.on('end', function () {
                that.http.cthIsSend = true;
                that.http.setHeader('Content-Type', 'audio/mpeg');
                buffers = Buffer.concat(buffers);
                return that.end(buffers);
            });
        });

        req.end();
    }
};

exports['default'] = Controller('Home/BaseController', function () {
    return Actions;
});
module.exports = exports['default'];

//# sourceMappingURL=MusicController.es.js.map