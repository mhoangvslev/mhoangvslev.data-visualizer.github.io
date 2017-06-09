jquery.waypoints.min.js:7: WARNING - Suspicious code. The result of the 'not' operator is not being used.
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

0 error(s), 1 warning(s)
/*
 Waypoints - 4.0.0
Copyright ?? 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){function a(e){if(!e)throw Error("No options passed to Waypoint constructor");if(!e.element)throw Error("No element option passed to Waypoint constructor");if(!e.handler)throw Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+b;this.options=a.Adapter.extend({},a.defaults,e);this.element=this.options.element;this.adapter=new a.Adapter(this.element);this.callback=e.handler;this.axis=this.options.horizontal?"horizontal":"vertical";this.enabled=this.options.enabled;
this.triggerPoint=null;this.group=a.Group.findOrCreate({name:this.options.group,axis:this.axis});this.context=a.Context.findOrCreateByElement(this.options.context);a.offsetAliases[this.options.offset]&&(this.options.offset=a.offsetAliases[this.options.offset]);this.group.add(this);this.context.add(this);d[this.key]=this;b+=1}var b=0,d={};a.prototype.queueTrigger=function(a){this.group.queueTrigger(this,a)};a.prototype.trigger=function(a){this.enabled&&this.callback&&this.callback.apply(this,a)};a.prototype.destroy=
function(){this.context.remove(this);this.group.remove(this);delete d[this.key]};a.prototype.disable=function(){return this.enabled=!1,this};a.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this};a.prototype.next=function(){return this.group.next(this)};a.prototype.previous=function(){return this.group.previous(this)};a.invokeAll=function(a){var b=[];for(c in d)b.push(d[c]);var c=0;for(var g=b.length;g>c;c++)b[c][a]()};a.destroyAll=function(){a.invokeAll("destroy")};a.disableAll=
function(){a.invokeAll("disable")};a.enableAll=function(){a.invokeAll("enable")};a.refreshAll=function(){a.Context.refreshAll()};a.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight};a.viewportWidth=function(){return document.documentElement.clientWidth};a.adapters=[];a.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0};a.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},
"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}};window.Waypoint=a}();
(function(){function a(g){window.setTimeout(g,1E3/60)}function b(g){this.element=g;this.Adapter=f.Adapter;this.adapter=new this.Adapter(g);this.key="waypoint-context-"+d;this.didResize=this.didScroll=!1;this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()};this.waypoints={vertical:{},horizontal:{}};g.waypointContextKey=this.key;e[g.waypointContextKey]=this;d+=1;this.createThrottledScrollHandler();this.createThrottledResizeHandler()}var d=0,e={},f=window.Waypoint,c=window.onload;
b.prototype.add=function(g){this.waypoints[g.options.horizontal?"horizontal":"vertical"][g.key]=g;this.refresh()};b.prototype.checkEmpty=function(){var g=this.Adapter.isEmptyObject(this.waypoints.horizontal),a=this.Adapter.isEmptyObject(this.waypoints.vertical);g&&a&&(this.adapter.off(".waypoints"),delete e[this.key])};b.prototype.createThrottledResizeHandler=function(){function g(){a.handleResize();a.didResize=!1}var a=this;this.adapter.on("resize.waypoints",function(){a.didResize||(a.didResize=
!0,f.requestAnimationFrame(g))})};b.prototype.createThrottledScrollHandler=function(){function g(){a.handleScroll();a.didScroll=!1}var a=this;this.adapter.on("scroll.waypoints",function(){a.didScroll&&!f.isTouch||(a.didScroll=!0,f.requestAnimationFrame(g))})};b.prototype.handleResize=function(){f.Context.refreshAll()};b.prototype.handleScroll=function(){var g={},a={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),
oldScroll:this.oldScroll.y,forward:"down",backward:"up"}},c;for(c in a){var b=a[c],d=b.newScroll>b.oldScroll?b.forward:b.backward,f;for(f in this.waypoints[c]){var e=this.waypoints[c][f],l=b.oldScroll<e.triggerPoint,m=b.newScroll>=e.triggerPoint,n=!l&&!m;(l&&m||n)&&(e.queueTrigger(d),g[e.group.id]=e.group)}}for(var q in g)g[q].flushTriggers();this.oldScroll={x:a.horizontal.newScroll,y:a.vertical.newScroll}};b.prototype.innerHeight=function(){return this.element==this.element.window?f.viewportHeight():
this.adapter.innerHeight()};b.prototype.remove=function(a){delete this.waypoints[a.axis][a.key];this.checkEmpty()};b.prototype.innerWidth=function(){return this.element==this.element.window?f.viewportWidth():this.adapter.innerWidth()};b.prototype.destroy=function(){var a=[];for(b in this.waypoints)for(var c in this.waypoints[b])a.push(this.waypoints[b][c]);var b=0;for(c=a.length;c>b;b++)a[b].destroy()};b.prototype.refresh=function(){var a,c=(a=this.element==this.element.window)?void 0:this.adapter.offset(),
b={};this.handleScroll();a={horizontal:{contextOffset:a?0:c.left,contextScroll:a?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:a?0:c.top,contextScroll:a?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var d in a){var c=a[d],e;for(e in this.waypoints[d]){var h=this.waypoints[d][e];var k=h.options.offset;var l=
h.triggerPoint;var m=0;var n=null==l;h.element!==h.element.window&&(m=h.adapter.offset()[c.offsetProp]);"function"==typeof k?k=k.apply(h):"string"==typeof k&&(k=parseFloat(k),-1<h.options.offset.indexOf("%")&&(k=Math.ceil(c.contextDimension*k/100)));h.triggerPoint=m+(c.contextScroll-c.contextOffset)-k;l=l<c.oldScroll;m=h.triggerPoint>=c.oldScroll;k=l&&m;l=!l&&!m;!n&&k?(h.queueTrigger(c.backward),b[h.group.id]=h.group):!n&&l?(h.queueTrigger(c.forward),b[h.group.id]=h.group):n&&c.oldScroll>=h.triggerPoint&&
(h.queueTrigger(c.forward),b[h.group.id]=h.group)}}return f.requestAnimationFrame(function(){for(var a in b)b[a].flushTriggers()}),this};b.findOrCreateByElement=function(a){return b.findByElement(a)||new b(a)};b.refreshAll=function(){for(var a in e)e[a].refresh()};b.findByElement=function(a){return e[a.waypointContextKey]};window.onload=function(){c&&c();b.refreshAll()};f.requestAnimationFrame=function(c){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||
a).call(window,c)};f.Context=b})();
(function(){function a(a,b){return a.triggerPoint-b.triggerPoint}function b(a,b){return b.triggerPoint-a.triggerPoint}function d(a){this.name=a.name;this.axis=a.axis;this.id=this.name+"-"+this.axis;this.waypoints=[];this.clearTriggerQueues();e[this.axis][this.name]=this}var e={vertical:{},horizontal:{}},f=window.Waypoint;d.prototype.add=function(a){this.waypoints.push(a)};d.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}};d.prototype.flushTriggers=function(){for(var c in this.triggerQueues){var d=
this.triggerQueues[c];d.sort("up"===c||"left"===c?b:a);for(var e=0,f=d.length;f>e;e+=1){var p=d[e];(p.options.continuous||e===d.length-1)&&p.trigger([c])}}this.clearTriggerQueues()};d.prototype.next=function(c){this.waypoints.sort(a);c=f.Adapter.inArray(c,this.waypoints);return c===this.waypoints.length-1?null:this.waypoints[c+1]};d.prototype.previous=function(c){this.waypoints.sort(a);return(c=f.Adapter.inArray(c,this.waypoints))?this.waypoints[c-1]:null};d.prototype.queueTrigger=function(a,b){this.triggerQueues[b].push(a)};
d.prototype.remove=function(a){a=f.Adapter.inArray(a,this.waypoints);-1<a&&this.waypoints.splice(a,1)};d.prototype.first=function(){return this.waypoints[0]};d.prototype.last=function(){return this.waypoints[this.waypoints.length-1]};d.findOrCreate=function(a){return e[a.axis][a.name]||new d(a)};f.Group=d})();
(function(){function a(a){this.$element=b(a)}var b=window.jQuery,d=window.Waypoint;b.each("innerHeight innerWidth off offset on outerHeight outerWidth scrollLeft scrollTop".split(" "),function(b,d){a.prototype[d]=function(){var a=Array.prototype.slice.call(arguments);return this.$element[d].apply(this.$element,a)}});b.each(["extend","inArray","isEmptyObject"],function(d,f){a[f]=b[f]});d.adapters.push({name:"jquery",Adapter:a});d.Adapter=a})();
(function(){function a(a){return function(d,f){var c=[],e=d;return a.isFunction(d)&&(e=a.extend({},f),e.handler=d),this.each(function(){var d=a.extend({},e,{element:this});"string"==typeof d.context&&(d.context=a(this).closest(d.context)[0]);c.push(new b(d))}),c}}var b=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=a(window.jQuery));window.Zepto&&(window.Zepto.fn.waypoint=a(window.Zepto))})();
