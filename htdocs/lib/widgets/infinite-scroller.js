;(function(){

var myName = 'InfiniteScroller'

function Me ()
{
	this.nodes = {}
}

Me.prototype =
{
	power: 1.5,
	spaceTimeout: 30000,
	maxInertia: 500,
	onscroll: function () {},
	
	bind: function (root, width)
	{
		this.nodes.root = root
		this.globalX = root.scrollLeft
		
		var clientWidth = root.clientWidth
		this.setWidth(width || this.guessWidth())
		
		var moveable = this.moveable = new Moveable().bind(root)
		moveable.softStart = true
		
		var me = this
		moveable.addEventListener('moveabout', function (e) { me.onmoveabout(e) }, false)
		moveable.addEventListener('movestart', function (e) { me.onmovestart(e) }, false)
		moveable.addEventListener('move', function (e) { me.onmoving(e) }, false)
		moveable.addEventListener('moveend', function (e) { me.onmoveend(e) }, false)
		
		this.setX = function (x)
		{
			if (me.globalX == x)
				return
			me.globalX = x
			
			var w = me.width,
				real
			if (w == 0)
				real = 0
			else
				real = x < 0 ? w + x % w : x % w
			root.scrollLeft = real
			this.onscroll(x, real)
		}
		// this.setY = function (v) { root.scrollTop = v }
		
		
		var space = this.space = new Kinematics.Space()
		var point = this.point = new Kinematics.Point(0, 0, 0, 0)
		space.add(point)
		
		space.ontick = function () { me.spaceTick() }
		
		return this
	},
	
	guessWidth: function ()
	{
		var root = this.nodes.root
		return root.scrollWidth - root.clientWidth
	},
	
	setWidth: function (width)
	{
		this.width = width
	},
	
	setMovable: function (v)
	{
		this.moveable.disabled = !v
	},
	
	reset: function ()
	{
		this.space.stop()
		this.setX(0)
		this.point.x = this.globalX
		this.setVelocity(0, 0)
	},
	
	spaceTick: function ()
	{
		this.setX(this.point.x)
	},
	
	onmovestart: function (e)
	{
		this.space.stop()
		this.startX = this.globalX
	},
	
	onmoveabout: function ()
	{
		if (this.space.running)
		{
			Moveable.dropClick()
			this.space.stop()
		}
	},
	
	onmoving: function (e)
	{
		this.setX(this.startX - e.data.dx)
	},
	
	onmoveend: function (e)
	{
		var ms = e.data.movements.reverse()
		
		if (ms[3]) // got at least five movements
		{
			
			var root = this.nodes.root,
				// approximating last movements
				vx = ((ms[1].dx - ms[0].dx) + (ms[2].dx - ms[1].dx) + (ms[3].dx - ms[2].dx)) / 3// + (ms[4].dx - ms[3].dx) + (ms[5].dx - ms[4].dx)) / 5
			
			if (Math.abs(vx) > this.maxInertia)
				vx = (vx < 0 ? -1 : 1) * this.maxInertia
			
			this.point.x = this.globalX
			this.setVelocity(vx ? vx * this.power : 0, 0)
			this.run()
		}
	},
	
	addVelocity: function (x, y)
	{
		this.point.v.add(x, y)
	},
	
	setVelocity: function (x, y)
	{
		this.point.v.set(x, y)
	},
	
	run: function (timeout)
	{
		this.space.run(timeout === undefined ? this.spaceTimeout : timeout) // set a reasonable timeout
	}
}

Me.className = myName
self[myName] = Me

})();