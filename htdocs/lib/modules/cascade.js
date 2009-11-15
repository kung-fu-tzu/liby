;(function () {

var myName = 'Cascade', Me = self[myName] = function (job, delay)
{
	this.timers = {}
	this.data = {}
	this.children = []
	
	if (job)
	{
		this.job = job
		this.run(delay)
	}
}
Me.running = 0
Me.prototype =
{
	completed: false,
	
	onerror: function (ex, job)
	{
		if (this.parent)
			this.parent.onerror(ex, job || this)
		else
			throw ex
	},
	
	oncomplete: function ()
	{
		if (this.parent)
			this.parent.sigchild(this)
	},
	
	run: function (delay)
	{
		Me.running++
		
		if (delay === undefined)
			delay = 0
		
		if (delay >= 0)
		{
			var me = this
			this.timer('job', function () { me._run() }, delay)
		}
	},
	
	_run: function ()
	{
		try
		{
			this.job.call(this.data, this)
		}
		catch (ex)
		{
			this.onerror(ex)
		}
		
		this.sigchild()
	},
	
	add: function (job, delay)
	{
		if (this.completed)
			return
		
		var children = this.children
		
		if (typeof job === 'function')
			job = new Me(job, delay)
		else
			if (children.indexOf(job) >= 0)
				return -1
		
		job.parent = this
		return children.push(job)
	},
	
	sigchild: function ()
	{
		if (this.completed)
			return
		
		var children = this.children, count = 0
		for (var i = 0; i < children.length; i++)
			if (!children[i].completed)
				count++
		
		if (count == 0)
		{
			this.completed = true
			Me.running--
			var me = this
			this.timer('completed', function () { me.oncomplete() }, 0)
		}
	},
	
	stop: function ()
	{
		if (!this.completed)
		{
			this.timersClear()
			
			var children = this.children, count = 0
			for (var i = 0; i < children.length; i++)
				children[i].stop()
			
			this.sigchild()
		}
		
		return this.completed
	},
	
	timer: function (name, func, delay)
	{
		var timers = this.timers
		if (timers[name])
			clearTimeout(timers[name])
		
		return timers[name] = setTimeout(func, delay)
	},
	
	timersClear: function ()
	{
		var timers = this.timers
		for (var k in timers)
		{
			clearTimeout(timers[k])
			delete timers[k]
		}
	}
}

})();
