/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
define(["aloha","aloha/jquery","aloha/plugin","aloha/floatingmenu","format/format-plugin","util/dom","i18n!cite/nls/i18n","i18n!aloha/nls/i18n"],function(b,c,d,e,f,g,h,i){function p(a,b){return a.replace(/\{([a-z0-9\-\_]+)\}/ig,function(a,c,d,e){var f=b[c]||a;return typeof f=="function"?f():f})}function q(a){return typeof a=="string"?p(a,o):a}function r(){var a=[],b=l;return k.each(arguments,function(){a.push("."+(this==""?b:b+"-"+this))}),k.trim(a.join(" "))}function s(){var a=[],b=l;return k.each(arguments,function(){a.push(this==""?b:b+"-"+this)}),k.trim(a.join(" "))}function t(a){var a=a.replace("#","").split("");a.length==3&&(a[5]=a[4]=a[2],a[3]=a[2]=a[1],a[1]=a[0]);var b=[];for(var c=0;c<3;++c)b[c]=parseInt("0x"+a[c*2]+a[c*2+1],16);return b}b.require(["css!cite/css/cite.css"]);var j=window.GENTICS,k=c,l="aloha-cite",m=+(new Date),n=!1,o={quote:s("quote"),blockquote:s("blockquote"),"panel-label":s("panel-label"),"panel-field":s("panel-field"),"panel-btns":s("panel-btns"),"link-field":s("link-field"),"note-field":s("note-field"),references:s("references")};return d.create("cite",{citations:[],referenceContainer:null,settings:null,init:function(){var a=this;if(b.settings&&b.settings.plugins&&b.settings.plugins.cite){var c=k(b.settings.plugins.cite.referenceContainer);c.length>0&&(this.referenceContainer=c),typeof b.settings.plugins.cite!="undefinded"&&(a.settings=b.settings.plugins.cite),typeof a.settings.sidebar=="undefinded"&&(a.settings.sidebar={}),typeof a.settings.sidebar.open=="undefinded"&&(a.settings.sidebar.open=!0)}this.buttons=[],this.buttons[0]=new b.ui.Button({name:"quote",text:"Quote",tooltip:h.t("cite.button.add.quote"),iconClass:s("button","inline-button"),size:"small",toggle:!0,onclick:function(){a.addInlineQuote()}}),e.addButton("Aloha.continuoustext",this.buttons[0],i.t("floatingmenu.tab.format"),1),f.multiSplitButton.items.push({name:"blockquote",text:"Blockquote",tooltip:h.t("cite.button.add.blockquote"),iconClass:s("button","block-button"),click:function(){a.addBlockQuote()}}),this.sidebar=null;var d=this;b.ready(function(c){d.sidebar=b.Sidebar.right.show(),d.sidebar.addPanel({id:s("sidebar-panel"),title:"Citation",content:"",expanded:!0,activeOn:".aloha-cite-wrapper",onInit:function(){var a=this,b=this.setContent(q('<div class="{panel-label}">Link:</div>								<div class="{panel-field} {link-field}" style="margin: 5px;"><input type="text" /></div>'+(d.referenceContainer?'<div class="{panel-label}">Note:</div>									   <div class="{panel-field} {note-field}" style="margin: 5px;"><textarea></textarea></div>':""))).content;b.find("input, textarea").bind("keypress change",function(){var b=a.content;d.addCiteDetails(b.attr("data-cite-id"),b.find(r("link-field input")).val(),b.find(r("note-field textarea")).val())})},onActivate:function(b){var c=b.attr("data-cite-id"),d=a.getIndexOfCitation(c),e=this.content;d==-1&&(d=a.citations.push({uid:c,link:null,notes:null})-1),e.attr("data-cite-id",c),e.find(r("link-field input")).val(b.attr("cite")),e.find(r("note-field textarea")).val(a.citations[d].note)}})}),b.bind("aloha-selection-changed",function(b,c){f.multiSplitButton.showItem("blockquote");var d=k("button"+r("button"));k.each(a.buttons,function(b,e){var f=!1,g,h=c.markupEffectiveAtStart,i=h.length;while(i--){g=h[i].tagName.toLowerCase();if("q"==g||"blockquote"==g){f=!0;break}}d.filter(r("block-button")).removeClass(s("pressed")),a.buttons[0].setPressed(!1);if(f)return g=="q"?a.buttons[0].setPressed(!0):d.filter(r("block-button")).addClass(s("pressed")),!1})})},getIndexOfCitation:function(a){var b=this.citations,c=b.length,d=0,e,f;while(d<c){e=d+c>>1;if((f=b[e].uid)==a)return e;f>a?c=e:f<a&&(d=e+1)}return-1},addBlockQuote:function(){var a=this,d=[s("wrapper"),s(++m)].join(" "),e=k(p('<blockquote class="{classes}" data-cite-id="{uid}"></blockquote>',{uid:m,classes:d}));b.activeEditable&&c(b.activeEditable.obj[0]).click(),b.Selection.changeMarkupOnSelection(e),this.referenceContainer&&this.addCiteToReferences(m),this.sidebar&&a.settings.sidebar.open===!0&&this.sidebar.open()},addInlineQuote:function(){var a=[s("wrapper"),s(++m)].join(" "),d=k(p('<q class="{classes}" data-cite-id="{uid}"></q>',{uid:m,classes:a})),e=b.Selection.rangeObject,f,h=this;return b.activeEditable&&c(b.activeEditable.obj[0]).click(),f=e.findMarkup(function(){return this.nodeName&&d.get(0)&&typeof this.nodeName=="string"&&typeof d.get(0).nodeName=="string"?this.nodeName.toLowerCase()==d.get(0).nodeName.toLowerCase():!1},b.activeEditable.obj),f?e.isCollapsed()?g.removeFromDOM(f,e,!0):g.removeMarkup(e,d,b.activeEditable.obj):(e.isCollapsed()&&g.extendToWord(e),g.addMarkup(e,d)),e.select(),this.referenceContainer&&this.addCiteToReferences(m),this.sidebar&&h.settings.sidebar.open===!0&&this.sidebar.open(),!1},addCiteToReferences:function(a){var b=this.getIndexOfCitation(a);if(b==-1)return;var c=k(".aloha-editable-active "+r(a)),d="cite-note-"+a,e="cite-ref-"+a;c.append(p('<sup id="{ref}" contenteditable="false"><a href="#{note}">[{count}]</a></sup>',{ref:e,note:d,count:b+1})),this.referenceContainer.find("ol.references").length==0&&this.referenceContainer.append("<h2>References</h2>").append('<ol class="references"></ol>'),this.referenceContainer.find("ol.references").append(p('<li id="{note}"><a href="#{ref}">^</a> &nbsp; <span></span></li>',{ref:e,note:d}))},addCiteDetails:function(a,b,c){this.citations[this.getIndexOfCitation(a)]={uid:a,link:b,note:c};if(b){var d=k(r(a)).attr("cite",b),e=Math.round,f=t("#fdff9a"),g=t("#fdff9a");f.push(1),g.push(0);var h=[g[0]-f[0],g[1]-f[1],g[2]-f[2],g[3]-f[3]];d.css({__tick:0,"background-color":"rgba("+f.join(",")+")","box-shadow":"0 0 20px rgba("+f.join(",")+")"}),n||(n=!0,d.animate({__tick:1},{duration:500,easing:"linear",step:function(a,b){var c=[e(f[0]+h[0]*a),e(f[1]+h[1]*a),e(f[2]+h[2]*a),f[3]+h[3]*a];k(this).css({"background-color":"rgba("+c.join(",")+")","box-shadow":"0 0 "+20*(1-a)+"px rgba("+f.join(",")+")"})},complete:function(){n=!1}}))}this.referenceContainer&&k("li#cite-note-"+a+" span").html(p(b?'<a class="external" target="_blank" href="{url}">{url}</a>':"",{url:b})+(c?". "+c:""))},toString:function(){return"aloha-citiation-plugin"}})});