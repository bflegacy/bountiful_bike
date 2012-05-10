/*!
* This file is part of Aloha Editor Project http://aloha-editor.org
* Copyright (c) 2010-2011 Gentics Software GmbH, aloha@gentics.com
* Contributors http://aloha-editor.org/contribution.php 
* Licensed unter the terms of http://www.aloha-editor.org/license.html
*/
/*
* Aloha Editor is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.*
*
* Aloha Editor is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @todo: - Make the sidebars resizable using drag handles
 *		  - Make overlayPage setting settable from external config
 */
define(["aloha/core","aloha/jquery","aloha/selection"],function(a,b,c,d){function j(a,b){return a.replace(/\{([a-z0-9\-\_]+)\}/ig,function(a,c,d,e){var f=b[c]||a;return typeof f=="function"?f():f})}function k(a){return typeof a=="string"?j(a,i):a}function l(){var a=[],c=g;return b.each(arguments,function(){a.push("."+(this==""?c:c+"-"+this))}),b.trim(a.join(" "))}function m(){var a=[],c=g;return b.each(arguments,function(){a.push(this==""?c:c+"-"+this)}),b.trim(a.join(" "))}var e=b,f=void 0,g="aloha-sidebar",h=+(new Date),i={bar:m("bar"),handle:m("handle"),inner:m("inner"),panels:m("panels"),"config-btn":m("config-btn"),"handle-icon":m("handle-icon"),"panel-content":m("panel-content"),"panel-content-inner":m("panel-content-inner"),"panel-content-inner-text":m("panel-content-inner-text"),"panel-title":m("panel-title"),"panel-title-arrow":m("panel-title-arrow"),"panel-title-text":m("panel-title-text")};b.easing.easeOutExpo||b.extend(b.easing,{easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeOutElastic:function(a,b,c,d,e){var f=Math,g=1.70158,h=0,i=d;if(!b)return c;if((b/=e)==1)return c+d;h||(h=e*.3);if(i<f.abs(d)){i=d;var g=h/4}else var g=h/(2*f.PI)*f.asin(d/i);return i*f.pow(2,-10*b)*f.sin((b*e-g)*2*f.PI/h)+d+c}});var n=function(d){var e=this;this.id=m(++h),this.panels={},this.container=b(k('<div class="{bar}"><div class="{handle}"><span class="{handle-icon}"></span></div><div class="{inner}"><ul class="{panels}"></ul></div></div>')),this.width=300,this.opened=!1,this.isOpen=!1,this.settings={rotateIcons:!b.browser.msie,overlayPage:!0},b(function(){(typeof a.settings.sidebar=="undefined"||!a.settings.sidebar.disabled)&&e.init(d)})};b.extend(n.prototype,{init:function(a){var c=this,d;typeof a=="object"&&(d=a.panels,delete a.panels),b.extend(this,a),typeof d=="object"&&b.each(d,function(){c.addPanel(this,!0)});var e=this.container;this.position=="right"&&e.addClass(m("right")),e.hide().appendTo(b("body")).click(function(){c.barClicked.apply(c,arguments)}).find(l("panels")).width(this.width),e.width(this.width),this.width=e.width(),b(window).resize(function(){c.updateHeight()}),this.updateHeight(),this.roundCorners(),this.initToggler(),this.container.css(this.position=="right"?"marginRight":"marginLeft",-this.width),this.opened&&this.open(0),this.toggleHandleIcon(this.isOpen),this.subscribeToEvents(),b(window).resize(function(){c.correctHeight()}),this.correctHeight()},show:function(){return this.container.css("display","block"),this},hide:function(){return this.container.css("display","none"),this},checkActivePanels:function(a){var c=[];if(typeof a!="undefined"&&typeof a.markupEffectiveAtStart!="undefined"){var d=a.markupEffectiveAtStart.length;for(var e=0;e<d;++e)c.push(b(a.markupEffectiveAtStart[e]))}var f=this;b.each(this.panels,function(){f.showActivePanel(this,c)}),this.correctHeight()},subscribeToEvents:function(){var b=this,c=this.container;a.bind("aloha-selection-changed",function(a,c){b.checkActivePanels(c)}),c.mousedown(function(b){b.originalEvent.stopSelectionUpdate=!0,a.eventHandled=!0}),c.mouseup(function(b){b.originalEvent.stopSelectionUpdate=!0,a.eventHandled=!1}),a.bind("aloha-editable-deactivated",function(a,c){b.checkActivePanels()})},correctHeight:function(){var a=this.container.find(l("inner")).height()-30,c=[];b.each(this.panels,function(){this.isActive&&c.push(this)});if(c.length==0)return;var d=a-(c[0].title.outerHeight()+10)*c.length,e,f,g,h,i,j=0,k=Math;while(c.length>0&&d>0){d+=j,j=0,i=[];for(var m=c.length-1;m>=0;--m)e=c[m],g=e.content.find(l("panel-content-inner")),f=k.min(g.height("auto").height(),k.floor(d/(m+1))),g.height(f),d-=f,h=g.find(l("panel-content-inner-text")),h.height()>f?(i.push(e),j+=f,g.css({"overflow-x":"hidden","overflow-y":"scroll"})):g.css("overflow-y","hidden"),e.expanded&&e.expand();c=i}},showActivePanel:function(a,c){c.push(null);var d=c.length,e=0,f=a.content.parent("li"),g=a.activeOn,h=b();for(var i=0;i<d;++i)g(c[i])&&(++e,c[i]&&b.merge(h,c[i]));e?a.activate(h):a.deactivate(),this.roundCorners()},initToggler:function(){var c=this,d=this.container,e=d.find(l("handle-icon")),f=m("toggled"),g,h=this.position=="right";this.opened&&this.rotateHandleArrow(h?0:180,0),b(function(){typeof a.settings.sidebar!="undefined"&&a.settings.sidebar.handle&&a.settings.sidebar.handle.top&&(b(d.find(l("handle"))).get(0).style.top=a.settings.sidebar.handle.top)}),d.find(l("handle")).click(function(){g&&clearInterval(g),e.stop().css("marginLeft",4),c.isOpen?(b(this).removeClass(f),c.close(),c.isOpen=!1):(b(this).addClass(f),c.open(),c.isOpen=!0)}).hover(function(){var a=c.isOpen?-1:1;g&&clearInterval(g),e.stop(),b(this).stop().animate(h?{marginLeft:"-="+a*5}:{marginRight:"-="+a*5},200),g=setInterval(function(){a*=-1,e.animate(h?{left:"-="+a*4}:{right:"-="+a*4},300)},300)},function(){g&&clearInterval(g),e.stop().css(h?"left":"right",5),b(this).stop().animate(h?{marginLeft:0}:{marginRight:0},600,"easeOutElastic")})},roundCorners:function(){var a=this.container,b=a.find(l("panels>li:not(","deactivated)")),c=m("panel-top"),d=m("panel-bottom");a.find(l("panel-top,","panel-bottom")).removeClass(c).removeClass(d),b.first().find(l("panel-title")).addClass(c),b.last().find(l("panel-content")).addClass(d)},updateHeight:function(){var a=b(window).height();this.container.height(a).find(l("inner")).height(a)},barClicked:function(a){this.handleBarclick(b(a.target))},handleBarclick:function(a){a.hasClass(m("panel-title"))?this.togglePanel(a):a.hasClass(m("panel-content"))||a.hasClass(m("handle"))||a.hasClass(m("bar"))||this.handleBarclick(a.parent())},getPanelById:function(a){return this.panels[a]},getPanelByElement:function(a){var b=a[0].tagName=="LI"?a:a.parent("li");return this.getPanelById(b[0].id)},togglePanel:function(a){this.getPanelByElement(a).toggle()},rotateHandleIcon:function(a,b){var c=this.container.find(l("handle-icon"));c.animate({angle:a},{duration:typeof b=="number"||typeof b=="string"?b:500,easing:"easeOutExpo",step:function(a,b){c.css({"-o-transform":"rotate("+a+"deg)","-webkit-transform":"rotate("+a+"deg)","-moz-transform":"rotate("+a+"deg)","-ms-transform":"rotate("+a+"deg)"})}})},toggleHandleIcon:function(a){var b=this.position=="right"^a;if(this.settings.rotateIcons)this.rotateHandleIcon(b?180:0,0);else{var c=this.container.find(l("handle-icon"));b?c.addClass(m("handle-icon-left")):c.removeClass(m("handle-icon-left"))}},open:function(a,c){if(this.isOpen)return this;var d=this.position=="right",e=d?{marginRight:0}:{marginLeft:0};return this.toggleHandleIcon(!0),this.container.animate(e,typeof a=="number"||typeof a=="string"?a:500,"easeOutExpo"),this.settings.overlayPage||b("body").animate(d?{marginRight:"+="+this.width}:{marginLeft:"+="+this.width},500,"easeOutExpo"),this.isOpen=!0,b("body").trigger(m("opened"),this),this},close:function(a,c){if(!this.isOpen)return this;var d=this.position=="right",e=d?{marginRight:-this.width}:{marginLeft:-this.width};return this.toggleHandleIcon(!1),this.container.animate(e,typeof a=="number"||typeof a=="string"?a:500,"easeOutExpo"),this.settings.overlayPage||b("body").animate(d?{marginRight:"-="+this.width}:{marginLeft:"-="+this.width},500,"easeOutExpo"),this.isOpen=!1,this},activatePanel:function(a,b){return typeof a=="string"&&(a=this.getPanelById(a)),a&&a.activate(b),this.roundCorners(),this},expandPanel:function(a,b){return typeof a=="string"&&(a=this.getPanelById(a)),a&&a.expand(b),this},collapsePanel:function(a,b){return typeof a=="string"&&(a=this.getPanelById(a)),a&&a.collapse(b),this},addPanel:function(a,b){return a instanceof o||(a.width||(a.width=this.width),a.sidebar=this,a=new o(a)),this.panels[a.id]=a,this.container.find(l("panels")).append(a.element),b!==!0&&this.roundCorners(),this.checkActivePanels(c.getRangeObject()),a}});var o=function(c){this.id=null,this.folds={},this.button=null,this.title=b(k('						 			<div class="{panel-title}">							 				<span class="{panel-title-arrow}"></span>		 				<span class="{panel-title-text}">Untitled</span> 			</div>												 		')),this.content=b(k('								<div class="{panel-content}">									<div class="{panel-content-inner}">								<div class="{panel-content-inner-text}">					</div>													</div>													</div>													')),this.element=null,this.expanded=!1,this.effectiveElement=null,this.isActive=!0,this.init(c)};b.extend(o.prototype,{init:function(a){this.setTitle(a.title).setContent(a.content),delete a.title,delete a.content,b.extend(this,a),this.id||(this.id=m(++h));var c=this.element=b('<li id="'+this.id+'">').append(this.title,this.content);this.expanded&&this.content.height("auto"),this.toggleTitleIcon(this.expanded),this.coerceActiveOn(),this.title.attr("unselectable","on").css("-moz-user-select","none").each(function(){this.onselectstart=function(){return!1}}),typeof this.onInit=="function"&&this.onInit.apply(this)},toggleTitleIcon:function(a){if(this.sidebar.settings.rotateIcons)this.rotateTitleIcon(a?90:0);else{var b=this.title.find(l("panel-title-arrow"));a?b.addClass(m("panel-title-arrow-down")):b.removeClass(m("panel-title-arrow-down"))}},coerceActiveOn:function(){if(typeof this.activeOn!="function"){var a=this.activeOn;this.activeOn=function(){var b=typeof a,c;return b=="boolean"?c=function(){return a}:b=="undefined"?c=function(){return!0}:b=="string"?c=function(b){return b?b.is(a):!1}:c=function(){return!1},c}()}},activate:function(a){this.isActive=!0,this.content.parent("li").show().removeClass(m("deactivated")),this.effectiveElement=a,typeof this.onActivate=="function"&&this.onActivate.call(this,a)},deactivate:function(){this.isActive=!1,this.content.parent("li").hide().addClass(m("deactivated")),this.effectiveElement=null},toggle:function(){this.expanded?this.collapse():this.expand()},expand:function(a){var b=this,c=this.content,d=c.height(),e=c.height("auto").height();return c.height(d).stop().animate({height:e},500,"easeOutExpo",function(){typeof a=="function"&&a.call(b)}),this.element.removeClass("collapsed"),this.toggleTitleIcon(!0),this.expanded=!0,this},collapse:function(a,b){var c=this;return this.element.addClass("collapsed"),this.content.stop().animate({height:5},250,"easeOutExpo",function(){typeof b=="function"&&b.call(c)}),this.toggleTitleIcon(!1),this.expanded=!1,this},setTitle:function(a){return this.title.find(l("panel-title-text")).html(a),this},setContent:function(a){if(!a||a=="")a="&nbsp;";return this.content.find(l("panel-content-inner-text")).html(a),this},rotateTitleIcon:function(a,b){var c=this.title.find(l("panel-title-arrow"));c.animate({angle:a},{duration:typeof b=="number"?b:500,easing:"easeOutExpo",step:function(a,b){c.css({"-o-transform":"rotate("+a+"deg)","-webkit-transform":"rotate("+a+"deg)","-moz-transform":"rotate("+a+"deg)","-ms-transform":"rotate("+a+"deg)"})}})},renderEffectiveParents:function(a,c){var d=a.first(),e=[],f=[],g=this.activeOn,h,i;while(d.length>0&&!d.is(".aloha-editable")){if(g(d)){f.push("<span>"+d[0].tagName.toLowerCase()+"</span>"),h=f.length,i=[];while(h--)i.push(f[h]);e.push(j('<div class="aloha-sidebar-panel-parent"><div class="aloha-sidebar-panel-parent-path">{path}</div><div class="aloha-sidebar-panel-parent-content aloha-sidebar-opened">{content}</div></div>',{path:i.join(""),content:typeof c=="function"?c(d):"----"}))}d=d.parent()}this.setContent(e.join("")),b(".aloha-sidebar-panel-parent-path").click(function(){var a=b(this).parent().find(".aloha-sidebar-panel-parent-content");a.hasClass("aloha-sidebar-opened")?a.hide().removeClass("aloha-sidebar-opened"):a.show().addClass("aloha-sidebar-opened")}),this.content.height("auto").find(".aloha-sidebar-panel-content-inner").height("auto")}});var p=new n({position:"left",width:250}),q=new n({position:"right",width:250});return a.Sidebar={left:p,right:q},a.Sidebar});