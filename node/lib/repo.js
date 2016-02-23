/* global require, console, exports */
var http = require('http');
var emitter = require('events').EventEmitter;


function loadJson(url) {
	var events = new emitter();
	console.log('Downloading ' + url + ' ...');
	http.get(url, function (res) {
		var data = '';

		res.on('data', function (chunk){
			data += chunk;
		});

		res.on('end',function(){
			var obj = JSON.parse(data);
			events.emit('done', obj);
		});
	});
	return events;
}



exports.loadrepository = function(repoUrl) {
	return loadJson(repoUrl);
};