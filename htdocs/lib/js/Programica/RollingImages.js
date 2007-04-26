
window.addEventListener('load', function () { Programica.RollingImages.onLoader() }, false)

Programica.RollingImages =
{
	bind: function (node)
	{
		node.pmc || (node.pmc = {})
		node.pmc.imageRoller = new Programica.RollingImages.Handler(node)
		node.pmc.imageRoller.goInit()
	},
	
	Handler: function (node)
	{
		this.mainNode = node
		
		this.ns					= this.mainNode.getAttribute('animation-namespace')
		this.viewport			= this.my('viewport')[0]
		this.points				= this.my('point')
		this.buttons			= this.my('button')
		this.aPrev				= this.my('prev')[0]
		this.aNext				= this.my('next')[0]
		this.current			= 0
		
		var t = this
		if (this.aPrev) this.aPrev.onmousedown = function () { t.goPrev() }
		if (this.aNext) this.aNext.onmousedown = function () { t.goNext() }
		for (var i = 0, il = this.buttons.length; i < il; i++)
			//да, в жабаскрипте приходится так изголяться с замыканиями
			this.buttons[i].onmousedown = (function (fi) { return function () { t.goToFrame(fi) } })(i)
	},
	
	onLoader: function ()
	{
		var all = document.getElementsByClassName('programica-rolling-images')
		
		for (var i = 0; i < all.length; i++)
			this.bind(all[i])
	}
}

Programica.RollingImages.Handler.prototype =
{
	goPrev:			function ()		{ if (this.current > 0) this.goToFrame((this.points.length + this.current - 1) % this.points.length) },
	goNext:			function ()		{ if (this.current < this.points.length - 1) this.goToFrame((this.current + 1) % this.points.length) },
	
	animationType:	function ()		{ return this.mainNode.getAttribute('animation-type') || 'easeOutBack' },
	getDuration:	function ()		{ return this.mainNode.getAttribute('animation-duration') || 1 },
	my:				function (cn)	{ return this.mainNode.getElementsByClassName(this.ns ? this.ns + "-" + cn : cn) },
	
	goInit: function (n)
	{
		var node = this.my('selected')[0]
		if (node)
			this.goToNode(node, 'directJump')
		else
			this.goToFrame(0, 'directJump')
		
		return n
	},
	
	goToFrame: function (n, anim)
	{
		n = n || 0
		this.goToNode(this.points[n], anim)
		
		this.current = n
		this.updateNavigation()
		
		return n
	},
	
	goToNode: function (node, anim)
	{
		if (!node) return
		anim = anim || this.animationType()
		
		for (var i = 0, il = this.points.length; i < il; i++)
			if (this.points[i] == node) this.current = i
		
		log(this.current + ': offsetTop = ' + node.offsetTop + ', offsetLeft = ' + node.offsetLeft)
		if (!this.viewport) log('Viewport is undefined!')
		if (!this.viewport.animate) log('Viewport can`t be animated!')
		
		//this.viewport.scrollTop = node.offsetTop, this.viewport.scrollLeft = node.offsetLeft
		this.viewport.animate(anim, {scrollTop:  [node.offsetTop], scrollLeft: [node.offsetLeft]},  this.getDuration()).start()
		
		this.updateNavigation()
	},
	
	updateNavigation: function ()
	{
		if (this.aPrev)
		{
			this.aPrev.className = this.aPrev.className.replace(/ disabled/g, '')
			!this.current ? this.aPrev.className += ' disabled' : this.aPrev.className = this.aPrev.className.replace(/ disabled/g, '')
		}
		
		if (this.aNext)
		{
			this.aNext.className = this.aNext.className.replace(/ disabled/g, '')
			this.current == this.points.length - 1 ? this.aNext.className += ' disabled' : this.aNext.className = this.aNext.className.replace(/ disabled/g, '')
		}
	}
}