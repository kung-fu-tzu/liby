
if (!self.HTMLFormElement) self.HTMLFormElement = {prototype:{}}
if (!self.Element) self.Element = {prototype:{}}

function IEFixes_opacity (node)
{
	if ((s = node.style))
	{
		if (s.opacity < 1)
			s.filter = 'alpha(opacity=' + Math.round(s.opacity * 100) + ')'
		else
			s.filter = ''
		
		s.zoom = 1
	}
}

function IEFixes_disabled (node)
{
	node.addClassName('disabled')
	node.disabled ? node.addClassName('disabled') : node.remClassName('disabled')
}

// отчасти исправляет обработку png
function IEFixes_imgPng (node)
{ 
	if (node.offsetWidth)         
		node.runtimeStyle.width = node.offsetWidth + 'px'
	if (node.offsetHeight)
		node.runtimeStyle.height = node.offsetHeight + 'px'
	
	node.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + node.src + "',sizingMethod='image')"
	node.setAttribute('src', '/lib/img/dot.gif')
	//node.runtimeStyle.visibility = 'hidden'
}

var IEFixes_bgUrlRex = /url\("(.+?)"\)$/

function IEFixes_bgPng (node)
{
	var m = IEFixes_bgUrlRex.exec(node.currentStyle.backgroundImage)
	
	node.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + m[1] + "',sizingMethod='crop')"
	node.runtimeStyle.backgroundImage = 'none'
}

function IEFixes_bg2Png (node)
{
	var m = IEFixes_bgUrlRex.exec(node.currentStyle.backgroundImage)
	
	node.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + m[1] + "',sizingMethod='scale')"
	node.runtimeStyle.backgroundImage = 'none'
}

// clickabe labels
function IEFixes_label (node)
{
	node.attachEvent
	(
		'onclick',
		function ()
		{//alert(event.srcElement)
			// трай/кеч нужен; иначе необходимо определять,
			// может элемент принять фокус или не может
			try
			{
				n = (node.getElementsByTagName('input')[0] ||
						node.getElementsByTagName('textarea')[0] ||
						node.getElementsByTagName('select')[0])
				if (n)
					//n.fireEvent('on' + event.type, event)
					n.click(), n.focus()
			}
			catch (ex) { log(ex.message) }
		}
	)
}

// input onchange bubbling on forms
function IEFixes_input (node)
{
	//node.form = p
	Element.prototype.addEventListener.apply
	(
		node,
		[node.type == 'text' ? 'change' : 'click',
		function (e) { try { node.form.onchange(e) } catch (ex) { log(ex.message) } }]
	)
}

function IEFixes_fixThem (nodes)
{
	var fixie = IEFixes_fixIE
	for (var i = 0, il = nodes.length; i < il; i++)
		fixie(nodes[i])
}

function IEFixes_fixThemAll ()
{
	IEFixes_fixThem(document.all)
}

function IEFixes_onpropertychange6 ()
{
	if (event.propertyName == 'style.opacity')
		IEFixes_opacity(this)
	else if (event.propertyName == 'disabled')
		IEFixes_disabled(this)
	else if (event.propertyName == 'innerHTML')
		IEFixes_fixThem(this.all)
}

function IEFixes_onpropertychange7 ()
{
	if (event.propertyName == 'style.opacity')
		IEFixes_opacity(this)
	else if (event.propertyName == 'innerHTML')
		IEFixes_fixThem(this.all)
}

function IEFixes_proto (node)
{
	var el = self.Element.prototype
	for (var p in el)
		node[p] = el[p]
}

function IEFixes_formProto (node)
{
	var hfel = HTMLFormElement.prototype
	for (var p in hfel)
		node[p] = hfel[p]
}


function IEFixes_fixIE6 (node)
{
	IEFixes_proto(node)
	node.onpropertychange = IEFixes_onpropertychange6
}

function IEFixes_fixIE7 (node)
{
	IEFixes_proto(node)
	node.onpropertychange = IEFixes_onpropertychange7
}

if (/MSIE 7/.test(navigator.userAgent))
	IEFixes_fixIE = IEFixes_fixIE7
else if (/MSIE 6/.test(navigator.userAgent))
	IEFixes_fixIE = IEFixes_fixIE6

function IEFixes ()
{
	IEFixes.realEvents = {onabort: 1, onactivate: 1, onafterprint: 1, onafterupdate: 1, onbeforeactivate: 1, onbeforecopy: 1, onbeforecut: 1, onbeforedeactivate: 1, onbeforeeditfocus: 1, onbeforepaste: 1, onbeforeprint: 1, onbeforeunload: 1, onbeforeupdate: 1, onblur: 1, onbounce: 1, one: 1, oncellchange: 1, onchange: 1, onclick: 1, oncontextmenu: 1, oncontrolselect: 1, oncopy: 1, oncut: 1, ondataavailable: 1, ondatasetchanged: 1, ondatasetcomplete: 1, ondblclick: 1, ondeactivate: 1, ondrag: 1, ondragend: 1, ondragenter: 1, ondragleave: 1, ondragover: 1, ondragstart: 1, ondrop: 1, onerror: 1, onerror: 1, onerrorupdate: 1, onfilterchange: 1, onfinish: 1, onfocus: 1, onfocusin: 1, onfocusout: 1, onhashchange: 1, onhelp: 1, onkeydown: 1, onkeypress: 1, onkeyup: 1, onlayoutcomplete: 1, onload: 1, onload: 1, onlosecapture: 1, onmessage: 1, onmousedown: 1, onmouseenter: 1, onmouseleave: 1, onmousemove: 1, onmouseout: 1, onmouseover: 1, onmouseup: 1, onmousewheel: 1, onmove: 1, onmoveend: 1, onmovestart: 1, onoffline: 1, ononline: 1, online: 1, onpaste: 1, onprogress: 1, onpropertychange: 1, onreadystatechange: 1, onreset: 1, onresize: 1, onresizeend: 1, onresizestart: 1, onrowenter: 1, onrowexit: 1, onrowsdelete: 1, onrowsinserted: 1, onscroll: 1, onselect: 1, onselectionchange: 1, onselectstart: 1, onstart: 1, onstop: 1, onstorage: 1, onstoragecommit: 1, onsubmit: 1, ontimeout: 1, onunload: 1}
	IEFixes.eventConversion = { DOMMouseScroll: 'mousewheel' }
	
	function preventDefault ()
	{
		var old = this.returnValue
		this.returnValue = false
		return old
	}
	
	function stopPropagation ()
	{
		var old = this.cancelBubble
		this.cancelBubble = true
		return old
	}
	
	// yet another addEventListener(...) fix
	if (!self.addEventListener && self.attachEvent)
		self.addEventListener = document.addEventListener = Element.prototype.addEventListener = function (type, func, dir)
		{
			// window.status++
			type = IEFixes.eventConversion[type] || type
			
			this._uniqueID = this._uniqueID || this.uniqueID
			var key = '__IEEventWrapper:' + type + ':' + dir + ':' + this._uniqueID
			
			if (func[key])
				this.detachEvent('on' + type, func[key])
			else
			{
				if (this == self)
					func[key] = function (e)
					{
						e.target = e.srcElement
						e.preventDefault  = preventDefault
						e.stopPropagation = stopPropagation
						e.detail = - e.wheelDelta / 30
						func.call(self, e)
					}
				else if (this == document)
					func[key] = function (e)
					{
						e.target = e.srcElement
						e.preventDefault  = preventDefault
						e.stopPropagation = stopPropagation
						e.detail = - e.wheelDelta / 30
						func.call(document, e)
					}
				else
				{
					var uid = this._uniqueID
					func[key] = function (e)
					{
						e.target = e.srcElement
						e.preventDefault  = preventDefault
						e.stopPropagation = stopPropagation
						e.detail = - e.wheelDelta / 30
						func.call(document.all[uid], e)
					}
				}
			}
			
			if (type == 'change' && this.tagName == 'FORM')
			{
				if (!this.onchange)
					this.onchange = function (e)
					{
						for (var i = 0; i < this.onchange.stack.length; i++)
							this.onchange.stack[i].call(this, e || window.event)
					}
				
				if (!this.onchange.stack)
					this.onchange.stack = []
				
				this.onchange.stack.push(func[key])
			}
			else
				this.attachEvent('on' + type, func[key])
		}
	
	// quick fix for removeEventListener(...)
	if (!self.removeEventListener && self.detachEvent)
	{
		Element.prototype.removeEventListener = function (type, func, dir)
		{
			if (IEFixes.eventConversion[type])
				type = IEFixes.eventConversion[type]
			
			this._uniqueID = this._uniqueID || this.uniqueID
			var key = '__IEEventWrapper:' + type + ':' + dir + ':' + this._uniqueID
			//alert(key)
			if (func[key])
				this.detachEvent('on' + type, func[key])
		}
		
		self.removeEventListener = document.removeEventListener = Element.prototype.removeEventListener
	}
	
	// sorry, i had to fix this onload call order bug
	{
		this['on-load-listeners'] = []
		
		self.addEventListenerReal = self.addEventListener
		self.addEventListener = function (type, func, dir)
		{
			if (type == 'load')
			{
				this.removeEventListener(type, func, dir)
				this['on-load-listeners'].push(func)
			}
			else
				this.addEventListenerReal(type, func, dir)
			
			return func
		}
		
		self.removeEventListenerReal = self.removeEventListener
		self.removeEventListener = function (type, func, dir)
		{
			if (type == 'load')
			{
				var newarr = []
				for (var i = 0; i < this['on-load-listeners'].length; i++)
					if (this['on-load-listeners'][i] != func)
						newarr.push(this['on-load-listeners'][i])
			}
			else
				this.removeEventListenerReal(type, func, dir)
			
			return func
		}
		
		// we have already done the wrapper job
		self.addEventListenerReal
		(
			'load',
			function (e)
			{
				for (var i = 0; i < this['on-load-listeners'].length; i++)
					this['on-load-listeners'][i](e)
			},
			true
		)
	}
	
	// another dirty fix: now for getAttributeNS(...)
	if (!document.getAttributeNS)
		Element.prototype.getAttributeNS = function (ns, attr) { return this.getAttribute(XMLNS[ns] + ':' + attr) }
	
	document.realIECreateElement = document.createElement
	document.createElement = function (type)
	{
		var e = document.realIECreateElement(type)
		IEFixes_fixIE(e)
		return e
	}
	
	self.$E = function (type, props)
	{
		if (props)
		{
			var html = []
			for (var i in props)
				html.push(i + '="' + encodeURI(props[i]) + '"')
			
			return document.createElement('<' + type + ' ' + html.join(' ') + '>')
		}
		
		return document.createElement(type)
	}
	
	if (!document.defaultView)
		document.defaultView = window
	
	if (!document.defaultView.getComputedStyle)
		document.defaultView.getComputedStyle = function (node)
		{
			return node.currentStyle
		}
	
	if (!document.createEvent)
	{
		function initEvent (type, bubbles, cancelable)
		{
			this.type = type
			this.bubbles = bubbles
			this.cancelable = cancelable
		}
		document.createEvent = function ()
		{
			var ne = document.createEventObject()
			ne.initEvent = initEvent
			return ne
		}
	}
	
	if (!document.dispatchEvent)
	{
		document.dispatchEvent = Element.prototype.dispatchEvent = function (e)
		{
			if (e.type == 'change')
				return this.onchange && this.onchange(e)
			else
				return this.fireEvent(e.type, e)
		}
	}
	
	self.addEventListener('load', IEFixes_fixThemAll)
	
	IEFixes.CSSBindings =
	[
	'input,textarea,select{scrollbar-base-color:expression((runtimeStyle.scrollbarBaseColor="transparent"),IEFixes_input(this))}',
	'img{scrollbar-highlight-color:expression((runtimeStyle.scrollbarHighlightColor="transparent"),(title||(title="")))}',
	'form{scrollbar-face-color:expression((runtimeStyle.scrollbarFaceColor="transparent"),IEFixes_formProto(this))}'
	//'*{scrollbar-face-color:expression((runtimeStyle.scrollbarFaceColor="transparent"),IEFixes_fixIE(this))}'
	]
	
	if (/MSIE 6/.test(navigator.userAgent))
		IEFixes.CSSBindings.push('label{scrollbar-base-color:expression((runtimeStyle.scrollbarBaseColor="transparent"),IEFixes_label(this))}')
	
	document.write('<style>' + IEFixes.CSSBindings.join('\n') + '</style>')
	
	
	
	// for oldstyle popups
	if (self.dialogArguments && self.dialogArguments.external)
		self.extern = self.dialogArguments.external
	else if (self.external)
		self.extern = self.external
}

if (!IEFixes.applied)
{
	IEFixes()
	IEFixes.applied = true
}