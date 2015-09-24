'use strict';
http = require('http')

module.exports = Controller 'Home/BaseController', ->
	{
		songAction:(source)->
			that = @
			source = decodeURIComponent source
			buffers = []

			req = http.request({
				hostname: 'file.qianqian.com'
				port: 80
				path: source.replace 'http://file.qianqian.com/', ''
				method: 'GET'
				headers: {
					'Accept-Encoding':'identity;q=1, *;q=0'
					'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6'
					'Cache-Control':'no-cache'
					'Connection':'keep-alive'
					'Host':'file.qianqian.com'
					'Pragma':'no-cache'
					'Range':'bytes=0-'
					'Referer':'http://file.qianqian.com/'
					'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
				}
			}, (res)->

				res.on('data',(chuck)->
					buffers.push(chuck)
				)
				res.on('end', ()->
					that.http.cthIsSend = true;
					that.http.setHeader('Content-Type', 'audio/mpeg');

					buffers = Buffer.concat(buffers)

					that.end(buffers)
				)
			)
			req.end()

	}