;(function(){

var types = ['success', 'information', 'success', 'redirect', 'error', 'error']

function onreadystatechange (r, callback)
{
	if (r.readyState != 4)
		return
	
	if (r.status != 200)
	{
		callback(null, r)
		return
	}
	
	callback(r)
}

var Request =
{
	onreadystatechange: onreadystatechange,
	charset: 'utf-8',
	post: function (url, data, callback, sync)
	{
		var r = new XMLHttpRequest()
		
		r.open('POST', url, !sync)
		r.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=' + this.charset)
		if (!sync)
			r.onreadystatechange = function () { onreadystatechange.call(r) } // wrapped for FF 2.0
		if (callback)
			r.callback = callback
		r.send(data)
		if (sync)
			onreadystatechange.call(r)
		
		return r
	},
	
	get: function (url, callback)
	{
		var r = new XMLHttpRequest()
		
		r.open('GET', url, true)
		
		// no need to check state without the callback present
		if (callback)
			r.onreadystatechange = function () { onreadystatechange(r, callback) }
		
		// postpone sending a request giving caller a chance to configure the request
		window.setTimeout(function () { r.send() }, 0)
		
		return r
	}
}

self.Request = Request

})();
