
// DOM для всех

;(function(){


var proto = Element.prototype

if (!document.getElementsByClassName)
{
	// from prototype 1.5.1.1
	proto.getElementsByClassName = document.getElementsByClassName = function (className, tagName)
	{
			// geting elems with native function
		var children = this.getElementsByTagName(tagName || '*'),
			// predeclaring vars
			elements = [], child, i, l = 0,
			// precompile regexp
			rex = new RegExp("(?:\\s+|^)" + className + "(?:\\s+|$)"),
			// length is constant, so caching its value
			len = children.length
		
		// memory for array of nodes will be allocated only once
		elements.length = len
		for (i = 0; i < len; i++)
		{
			// even caching the reference for children[i] gives us some nanoseconds ;)
			child = children[i]
			// just rely on RegExp engine
			if (rex.test(child.className))
			{
				// simple assignment
				elements[l] = child
				// simple increment
				l++
			}
		}
		// truncating garbage length
		elements.length = l
		
		return elements
	}
}

proto.setClassName = function (cn)
{
	this.className = cn
	return cn
}

proto.addClassName = function (cn)
{
	this.removeClassName(cn)
	this.className += ' ' + cn
	return cn
}

proto.removeClassName = function (cn)
{
	if (this.className)
		this.className = this.className.replace(new RegExp('(?:\\s+|^)' + cn + '(?:\\s+|$)', 'g'), ' ').replace(/^\s+|\s+$/g, '')
	return cn
}

proto.hasClassName = function (cn)
{
	return (this.className == cn || (new RegExp('(?:\\s+|^)' + cn + '(?:\\s+|$)')).test(this.className))
}

proto.disable = function ()
{
	this.setAttribute('disabled', true)
	this.addClassName('disabled')
}

proto.enable = function ()
{
	this.removeAttribute('disabled')
	this.removeClassName('disabled')
}

proto.empty = function ()
{
	var node
	while (node = this.firstChild)
		this.removeChild(node)
}

proto.show = function ()
{
	if (this.onshow)
	{
		if (typeof this.onshow == 'string')
			this.onshow = eval('function (event) { ' + this.onshow + ' }')
		
		if (this.onshow({}) === false)
			return false
	}
	
	this.style.visibility = 'visible'
	this.style.display = 'block'
	
	return true
}

proto.hide = function (t)
{
	if (this.onhide)
	{
		if (typeof this.onhide == 'string')
			this.onhide = eval('function (event) { ' + this.onhide + ' }')
		
		if (this.onhide({}) === false)
			return false
	}
	
	this.style.display = 'none'
	
	return true
}

proto.setVisible = function (show)
{
	if (show && !this.visible()) this.show()
	else if(!show) this.hide()
}

proto.visible = function ()
{
	return this.offsetWidth && this.style.display != 'none' && parseFloat(this.style.opacity) != 0
}

proto.toggle = function ()
{
	return this.visible() ? this.hide() : this.show()
}

proto.remove = function ()
{
	return this.parentNode ? this.parentNode.removeChild(this) : this
}

proto.isParent = function (parent, root)
{
	var node = this
	do
	{
		if (node === parent)
			return true
		if (node === root)
			break
	}
	while ((node = node.parentNode))
	
	return false
}


proto.getComputedStyle = function (prop)
{
	return document.defaultView.getComputedStyle(this, null)
}


})();