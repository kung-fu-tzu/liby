;(function(){

var myName = 'Tracker',
	escape = window.encodeURIComponent || window.escape

var Me =
{
	version: 0.3,
	reportPath: '/tracker/report?',
	sessionID: +new Date() + '-' + Math.round(Math.random() * 1E+17),
	
	track: function (category, action, label, value)
	{
		try
		{
			var q =
				'vr=' + escape(this.version) +
				'&c=' + escape(category) +
				'&a=' + escape(action) +
				'&l=' + escape(label) +
				'&v=' + escape(value)
			
			this.send(q)
			
			return true
		}
		catch (ex)
		{
			this.log('could not report a track')
		}
	},
	
	send: function (data)
	{
		var r = new Image(1, 1)
		r.src = this.reportPath + data
		r.onload = function () { this.log('error reported successfuly: ' + data) }
	},
	
	log: function (str) { try { console.log(myName + ': ' + str) } catch (ex) {} }
}

self.className = Me
self[myName] = Me

})();