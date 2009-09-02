(function(){var M=Math,e=M.cos,f=M.sin,g=M.sqrt,h=M.PI,i=M.pow,j=M.abs,k=M.asin,l={directJump:function(t,b,c,d){},linearTween:function(t,b,c,d){return c*t/d+b},easeInQuad:function(t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOutQuad:function(t,b,c,d){return((t/=d/2)<1)?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b},easeInCubic:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(t,b,c,d){return((t/=d/2)<1)?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b},easeInQuart:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(t,b,c,d){return((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b},easeInQuint:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(t,b,c,d){return((t/=d/2)<1)?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b},easeInSine:function(t,b,c,d){return-c*e(t/d*(h/2))+c+b},easeOutSine:function(t,b,c,d){return c*f(t/d*(h/2))+b},easeInOutSine:function(t,b,c,d){return-c/2*(e(h*t/d)-1)+b},easeInExpo:function(t,b,c,d){return(t==0)?b:c*i(2,10*(t/d-1))+b},easeOutExpo:function(t,b,c,d){return(t==d)?b+c:c*(-i(2,-10*t/d)+1)+b},easeInCirc:function(t,b,c,d){return-c*(g(1-(t/=d)*t)-1)+b},easeOutCirc:function(t,b,c,d){return c*g(1-(t=t/d-1)*t)+b},easeInOutCirc:function(t,b,c,d){return((t/=d/2)<1)?-c/2*(g(1-t*t)-1)+b:c/2*(g(1-(t-=2)*t)+1)+b},easeInBounce:function(t,b,c,d){return c-l.easeOutBounce(d-t,0,c,d)+b},easeInOutExpo:function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*i(2,10*(t-1))+b;return c/2*(-i(2,-10*--t)+2)+b},easeInElastic:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<j(c)){var s=p/4;a=c}else s=p/(2*h)*k(c/a);return-(a*i(2,10*(t-=1))*f((t*d-s)*(2*h)/p))+b},easeOutElastic:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<j(c)){var s=p/4;a=c}else s=p/(2*h)*k(c/a);return a*i(2,-10*t)*f((t*d-s)*(2*h)/p)+c+b},easeInOutElastic:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<j(c)){a=c;var s=p/4}else s=p/(2*h)*k(c/a);if(t<1)return-.5*(a*i(2,10*(t-=1))*f((t*d-s)*(2*h)/p))+b;else return a*i(2,-10*(t-=1))*f((t*d-s)*(2*h)/p)*.5+c+b},easeInBack:function(t,b,c,d,s){if(s==null)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(t,b,c,d,s){if(s==null)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(t,b,c,d,s){if(s==null)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;else return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},easeOutBounce:function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b},easeInOutBounce:function(t,b,c,d){if(t<d/2)return l.easeInBounce(t*2,0,c,d)*.5+b;else return l.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b}};return l})();