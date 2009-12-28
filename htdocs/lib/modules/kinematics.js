;(function(){

function Kinematics () {}
Kinematics.className = 'Kinematics'
self[Kinematics.className] = Kinematics

function Space ()
{
	this.timers = {}
	this.ticks = 0
	this.freeze = 0
	this.points = []
	this.forces = []
}

Space.prototype =
{
	minPulse: 0.01,
	maxFreeze: GlobalTimer.fps, // wait one seccond before freeze
	
	run: function (timeout)
	{
		if (this.running)
			return
		this.running = true
		
		this.freeze = 0
		
		var me = this
		if (timeout)
			this.timers.timeout = setTimeout(function (d) { me.timeout(d) }, timeout)
		this.timers.tick = GlobalTimer.add(function (d) { me.tick(d) })
	},
	
	timeout: function (d)
	{
		this.ontimeout && this.ontimeout()
		this.stop()
	},
	
	stop: function ()
	{
		if (!this.running)
			return
		this.running = false
		
		clearTimeout(this.timers.timeout)
		GlobalTimer.remove(this.timers.tick)
	},
	
	tick: function (d)
	{
		this.ticks++
		
		var forces = this.forces, points = this.points
		for (var i = 0, il = forces.length; i < il; i++)
		{
			var force = forces[i]
			for (var j = 0, jl = points.length; j < jl; j++)
				force.apply(points[j])
		}
		
		var pulse = 0
		for (var i = 0, il = points.length; i < il; i++)
		{
			var v = points[i].v
			pulse += v.x + v.y
		}
		
		if (!pulse || pulse < this.minPulse)
		{
			if (++this.freeze == this.maxFreeze)
			{
				this.freeze = 0
				if (this.onfreeze && this.onfreeze() !== false)
				this.stop()
			}
		}
		else
			this.freeze = 0
		
		this.pulse = pulse
	},
	
	add: function (object)
	{
		if (object instanceof Force)
			this.forces.push(object)
		else if (object instanceof Point)
			this.points.push(object)
		else
			throw new Error('unknown object added ' + object)
	}
}

Space.className = 'Space'
Kinematics[Space.className] = Space


function Point (x, y, vx, vy, m)
{
	this.x = x || 0
	this.y = y || 0
	this.m = m || 1
	this.v = new Vector(vx || 0, vy || 0)
}

Point.prototype =
{
	
}

Point.className = 'Point'
Kinematics[Point.className] = Point


function Force () {}

Force.prototype =
{
	apply: function () {}
}

Force.className = 'Force'
Kinematics[Force.className] = Force



function Friction (mu)
{
	this.mu = mu
}

Friction.prototype = new Force()
Friction.prototype.apply = function (point)
{
	point.v.addC(-this.mu)
}

Friction.className = 'Friction'
Kinematics[Friction.className] = Friction


function Vector (x, y)
{
	this.x = x
	this.y = y
	this.h = -1
}

Vector.prototype =
{
	sum: function (v)
	{
		this.x += v.x
		this.y += v.y
	},
	
	addC: function (c)
	{
		var x = this.x, y = this.y
		
		var h = this.h
		if (h === -1)
			h = this.h = Math.sqrt(x * x + y * y)
		
		if (h == 0)
			return
		
		var cos = x / h,
			sin = y / h
		
		h += c
		
		if (h > 0)
		{
			this.x = h * cos
			this.y = h * sin
			this.h = h
		}
		else
		{
			this.x = 0
			this.y = 0
			this.h = 0
		}
	}
}

Vector.className = 'Vector'
self[Vector.className] = Vector


})();