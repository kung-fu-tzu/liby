;(function(){

var myName = 'Timers'

function Me () {}

Me.prototype =
{
	setTimeout: function (f, d)
	{
		var timers, callbacks
		if (!(timers = this.__timers))
		{
			timers = this.__timers = {}
			callbacks = this.__callbacks = []
		}
		else
			callbacks = this.__callbacks
		
		var n = callbacks.length
		callbacks.push(f)
		
		var t = +new Date() + d
		
		if (timers[t])
			timers[t].push(n)
		else
			timers[t] = [n]
		
		if (t < (this.__timers_nextTimer || Infinity))
		{
			this.__timers_nextTimer = t
			this.setTimer(this.expireTimers, d) // setTimer invokes with this
		}
		
		return n
	},
	
	clearTimeout: function (n)
	{
		var callbacks = this.__callbacks
		if (!callbacks)
			return
		
		delete callbacks[n]
	},
	
	expireTimers: function ()
	{
		this.__timers_nextTimer = Infinity
		
		var timers
		if (!(timers = this.__timers))
			return
		
		var callbacks = this.__callbacks
		
		var todo = []
		
		var now = +new Date(), min = Infinity
		for (var k in timers)
		{
			var d = k - now
			if (d <= 0)
				todo.push(k)
			else
			{
				if (d < min)
					min = d
			}
		}
		
		todo.sort()
		
		for (var i = 0, il = todo.length; i < il; i++)
		{
			var t = todo[i], arr = timers[t]
			delete timers[t]
			for (var j = 0, jl = arr.length; j < jl; j++)
			{
				var f = callbacks[arr[j]]
				if (!f)
					continue
				
				try
				{
					f.call(this, now - t)
				}
				catch (ex) { /* needs to be reported */ }
			}
		}
		
		if (min < Infinity)
		{
			this.__timers_nextTimer = now + min
			this.setTimer(this.expireTimers, min) // setTimer invokes with this
		}
	}
}

Me.className = myName
self[myName] = Me

})();