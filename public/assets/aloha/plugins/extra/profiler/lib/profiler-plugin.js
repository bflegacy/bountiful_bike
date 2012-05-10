/*!
 * Aloha Editor
 * Author & Copyright (c) 2011 Gentics Software GmbH
 * aloha-sales@gentics.com
 * Licensed unter the terms of http://www.aloha-editor.com/license.html
 *
 * Aloha Profiler
 * --------------
 * Provides a useful interface to profile some of Aloha components and their
 * methods.
 *
 * Potentially process intensive methods:
 *		Aloha.Profiler.profileAlohaComponent('Markup.preProcessKeyStrokes')
 *		Aloha.Profiler.profileAlohaComponent('Selection._updateSelection')
 */
window.define(["aloha/core","aloha/plugin","aloha/editable","aloha/selection","aloha/markup","aloha/contenthandlermanager","aloha/floatingmenu","aloha/console","css!profiler/css/profiler"],function(Aloha,Plugin,Editable,Selection,Markup,ContentHandlerManager,FloatingMenu,console){function resolvePath(a,b){if(typeof a!="string")return a;if(!b||typeof b!="object")b=window;var c=a.split("."),d=0,e=c.length;for(;d<e;++d){b=b[c[d]];if(typeof b=="undefined")return console.error("Aloha.Profiler",'Property "'+c[d]+'" does not exist'+(d?" in object "+c.slice(0,d).join("."):"")),null}return b}function parseObjectPath(a,b){if(typeof a!="string")return null;var c=a.split("."),d=c.slice(0,Math.max(1,c.length-1)).join("."),e;b=resolvePath(d,b);if(!b)return null;if(c.length>1){var f=c[c.length-1];typeof b[f]=="undefined"?console.error("Aloha.Profiler",'Property "'+f+'" does not exist in object '+d):e=f}return{obj:b[e],path:a,parentObj:b,propName:e}}function initSidebarPanel(sidebar){sidebar.addPanel({id:"aloha-devtool-profiler-panel",title:"Aloha Profiler",expanded:!0,activeOn:!0,content:'<div id="aloha-devtool-profiler-container"><input id="aloha-devtool-profiler-input" value="Aloha.Profiler.profileAlohaComponent(\'Markup.preProcessKeyStrokes\')" /><ul id="aloha-devtool-profiler-console"></ul></div>',onInit:function(){this.content.find("input#aloha-devtool-profiler-input").keydown(function(event){if(event.keyCode===13){var input=jQuery(this),value=input.val();value&&(eval(value),PanelConsole.log(value),input.val(""))}})}}),sidebar.show().open()}var jQuery=Aloha.jQuery,profiledFunctions=[],argsStr=/function[^\(]*\(([^\)]+)/g.exec(arguments.callee.toString()),argNames=argsStr?argsStr[1].replace(/^\s+|\s+$/g,"").split(/\,\s*/):[],args=Array.prototype.slice.call(arguments),panel,PanelConsole={log:function(){jQuery("#aloha-devtool-profiler-console").prepend("<li>"+Array.prototype.slice.call(arguments).join(" ")+"</li>")}};return Aloha.Profiler=Plugin.create("profiler",{loadedDependencies:Array.prototype.slice.call(arguments),alohaComponents:{},panel:null,init:function(){var a=argNames.length;while(--a>=0)this.alohaComponents[argNames[a]]=args[a];var b=this;Aloha.ready(function(){Aloha.Sidebar&&Aloha.Sidebar.right&&(b.panel=initSidebarPanel(Aloha.Sidebar.right))})},log:function(){PanelConsole.log.apply(PanelConsole,arguments)},profileAlohaComponent:function(a,b){var c=parseObjectPath(a,this.alohaComponents);return this.profile(c.parentObj,b||c.propName)},profile:function(a,b,c){var d,e,f=-1,g;typeof a=="string"&&(e=parseObjectPath(a),a=e.parentObj,d=e.path+(b?"."+b:""),e.propName&&(typeof e.obj=="function"?b=e.propName:e.obj==="object"&&(a=e.obj)));if(!a||!b||typeof a[b]!="function")return;for(g=0;g<profiledFunctions.length;++g)if(profiledFunctions[g]===a){f=g;if(profiledFunctions[g][b])return}var h=a[b],i=this;window.console&&window.console.log&&(f===-1&&(f=profiledFunctions.push(a)-1),profiledFunctions[f][b]=h,a[b]=function(){typeof c=="function"&&c(h,arguments);var e=+(new Date),f=h.apply(a,arguments);return i.log((d||b)+": "+(new Date-e)+"ms"),f})},toString:function(){return"Aloha.Profiler"}}),Aloha.Profiler});