;(function () {

var myName = 'Cascade'

function Me (job)
{
	this.timers = {}
	this.children = []
	if (job)
		this.job = job
	this.state = 'ready'
	this.constructor = Me
}

Me.running = 0

Me.prototype =
{
	state: 'undefined',
	selfCompleted: false,
	parallel: Infinity,
	spawnable: true,
	holder: self, // window
	
	oncomplete: function () {},
	_oncomplete: function ()
	{
		if (this.parent && this.parent.sigchild)
			this.parent.sigchild(this)
		
		this.oncomplete()
	},
	
	doJob: function ()
	{
		// passing “this” as a parameter is handy in tangled closures
		this.job(this)
		
		this.selfCompleted = true
		this.checkCompleteness()
	},
	
	add: function (job)
	{
		if (this.state != 'ready' && this.state != 'running')
			throw new Error('can not add children while "' + this.state + '" state')
		
		var children = this.children
		
		if (typeof job === 'function')
			job = new Me(job)
		else
			if (children.indexOf(job) >= 0)
				return null
		
		job.parent = this
		children.push(job)
		return job
	},
	
	sigchild: function (child)
	{
		if (this.state != 'running')
			throw new Error('sigchild() while "' + this.state + '" state from ' + child.name)
		
		this.checkCompleteness()
	},
	
	checkCompleteness: function ()
	{
		if (!this.selfCompleted)
			return
		
		this.spawn()
		
		var children = this.children, count = 0
		for (var i = 0; i < children.length; i++)
			if (children[i].state != 'completed')
				count++
		
		if (count == 0)
		{
			this.state = 'completed'
			Me.running--
			var me = this
			this.timer('completed', function () { me._oncomplete() }, 0)
		}
	},
	
	spawn: function ()
	{
		var ready = [], running = []
		
		var children = this.children
		for (var i = 0; i < children.length; i++)
		{
			var child = children[i]
			
			if (!child.spawnable)
				continue
			
			if (child.state == 'ready')
				ready.push(child)
			else if (child.state == 'running')
				running.push(child)
		}
		
		var spawn = this.parallel - running.length
		for (var i = 0, il = ready.length; i < il && i < spawn; i++)
			ready[i].start()
	},
	
	start: function (delay)
	{
		if (this.state != 'ready')
			return
		
		this.state = 'running'
		Me.running++
		
		var me = this
		this.timer('job', function () { me.doJob() }, delay)
	},
	
	stop: function ()
	{
		if (this.state == 'completed')
			return
		
		this.timersClear()
		
		var children = this.children
		for (var i = 0; i < children.length; i++)
			children[i].stop()
		
		this.selfCompleted = true
		
		this.checkCompleteness()
	},
	
	timer: function (name, func, delay)
	{
		var timers = this.timers, holder = this.holder
		if (timers[name])
			holder.clearTimeout(timers[name])
		
		return timers[name] = holder.setTimeout(func, delay)
	},
	
	timersClear: function ()
	{
		var timers = this.timers, holder = this.holder
		for (var k in timers)
		{
			holder.clearTimeout(timers[k])
			delete timers[k]
		}
	}
}

self[myName] = Me

})();