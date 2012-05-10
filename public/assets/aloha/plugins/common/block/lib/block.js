/*!
 * Aloha Editor
 * Author & Copyright (c) 2010 Gentics Software GmbH
 * aloha-sales@gentics.com
 * Licensed unter the terms of http://www.aloha-editor.com/license.html
 */
/**
 * Module which contains the base class for Blocks, and a Default/Debug block.
 *
 * @name block.block
 * @namespace block/block
 */
define(["aloha","aloha/jquery","block/blockmanager","aloha/observable","aloha/floatingmenu"],function(a,b,c,d,e){var f=window.GENTICS,g=Class.extend(d,{title:null,id:null,$element:null,_currentlyRendering:!1,_initialized:!1,_isInsideNestedEditable:!1,_constructor:function(a){var c=this;this.$element=a,a.attr("id")?this.id=a.attr("id"):(this.id=f.Utils.guid(),a.attr("id",this.id)),a.contentEditable(!1),a.addClass("aloha-block"),this.isDraggable()&&(a.find("img").attr("draggable","false"),a.find("a").attr("draggable","false")),this._onElementClickHandler=function(a){b(a.target).closest(".aloha-block").get(0)===c.$element.get(0)&&(c._fixScrollPositionBugsInIE(),c.activate(a.target,a))},this._connectThisBlockToDomElement(a),this._initialized=!0},_onElementClickHandler:null,_preventSelectionChangedEventHandler:function(){a.Selection.preventSelectionChanged()},_connectThisBlockToDomElement:function(a){var c=this,d=b(a);this.$element&&(this.$element.unbind("click",this._onElementClickHandler),this.$element.unbind("mousedown",this._preventSelectionChangedEventHandler),this.$element.unbind("focus",this._preventSelectionChangedEventHandler),this.$element.unbind("dblclick",this._preventSelectionChangedEventHandler)),this.$element=d,this.$element.bind("click",this._onElementClickHandler),this.$element.bind("mousedown",this._preventSelectionChangedEventHandler),this.$element.bind("focus",this._preventSelectionChangedEventHandler),this.$element.bind("dblclick",this._preventSelectionChangedEventHandler),this.init(this.$element,function(){window.setTimeout(function(){c._postProcessElementIfNeeded()},5)})},_fixScrollPositionBugsInIE:function(){var a=b(window).scrollTop();window.setTimeout(function(){b(window).scrollTop()!==a&&b(window).scrollTop(a)},10)},init:function(a,b){b()},shouldDestroy:function(){var a=this.$element.parent().closest(".aloha-block,.aloha-editable,.aloha-block-collection");return a.hasClass("aloha-block-collection")&&this.$element[0].tagName.toLowerCase()==="div"?!0:a.hasClass("aloha-editable")},destroy:function(a){if(!this.shouldDestroy()&&a!==!0)return;var b=this,d=new f.Utils.RangeObject;d.startContainer=d.endContainer=this.$element.parent()[0],d.startOffset=d.endOffset=f.Utils.Dom.getIndexInParent(this.$element[0]),c.trigger("block-delete",this),c._unregisterBlock(this),this.unbindAll();var e=this.$element[0].tagName.toLowerCase()==="span";this.$element.fadeOut("fast",function(){b.$element.remove(),c.trigger("block-selection-change",[]),window.setTimeout(function(){e&&d.select()},5)})},getId:function(){return this.id},getSchema:function(){return null},getTitle:function(){return this.title},isDraggable:function(){return this.$element[0].tagName.toLowerCase()==="div"&&this.$element.parents(".aloha-editable,.aloha-block,.aloha-block-collection").first().hasClass("aloha-block-collection")?!0:this.$element.parents(".aloha-editable,.aloha-block").first().hasClass("aloha-editable")},activate:function(d,f){var g=[];b.each(c._getHighlightedBlocks(),function(){this.deactivate()}),this.$element.attr("data-block-skip-scope")!=="true"&&e.setScope("Aloha.Block."+this.attr("aloha-block-type")),this.$element.addClass("aloha-block-active"),this._highlight(),g.push(this),this.$element.parents(".aloha-block").each(function(){var a=c.getBlock(this);a._highlight(),g.push(a)}),b(d).closest(".aloha-editable,.aloha-block,.aloha-table-cell-editable").first().hasClass("aloha-block")?(this._isInsideNestedEditable=!1,a.getSelection().removeAllRanges()):(this._isInsideNestedEditable=!0,f&&a.Selection.updateSelection(f)),c.trigger("block-selection-change",g)},deactivate:function(){var a=this;this._unhighlight(),this.$element.parents(".aloha-block").each(function(){a._unhighlight()}),this.$element.removeClass("aloha-block-active"),c.trigger("block-selection-change",[])},isActive:function(){return this.$element.hasClass("aloha-block-active")},_highlight:function(){this.$element.addClass("aloha-block-highlighted"),c._setHighlighted(this)},_unhighlight:function(){this.$element.removeClass("aloha-block-highlighted"),c._setUnhighlighted(this)},_update:function(){var a=this;if(this._currentlyRendering)return;if(!this._initialized)return;this._currentlyRendering=!0,this.update(this.$element,function(){a._postProcessElementIfNeeded()}),this._currentlyRendering=!1},update:function(a,b){b()},_postProcessElementIfNeeded:function(){this.createEditablesIfNeeded(),this._checkThatNestedBlocksAreStillConsistent(),this._makeNestedBlockCollectionsSortable(),this.renderBlockHandlesIfNeeded(),this.isDraggable()&&this.$element[0].tagName.toLowerCase()==="span"?(this._setupDragDropForInlineElements(),this._disableUglyInternetExplorerDragHandles()):this.isDraggable()&&this.$element[0].tagName.toLowerCase()==="div"&&(this._setupDragDropForBlockElements(),this._disableUglyInternetExplorerDragHandles())},_checkThatNestedBlocksAreStillConsistent:function(){this.$element.find(".aloha-block").each(function(){var a=c.getBlock(this);a&&a.$element[0]!==this&&a._connectThisBlockToDomElement(this)})},_makeNestedBlockCollectionsSortable:function(){var a=this;this.$element.find(".aloha-block-collection").each(function(){var d=b(this);d.closest(".aloha-block").get(0)===a.$element.get(0)&&c.createBlockLevelSortableForEditableOrBlockCollection(d)})},_disableUglyInternetExplorerDragHandles:function(){this.$element.get(0).onresizestart=function(a){return!1},this.$element.get(0).oncontrolselect=function(a){return!1},this.$element.get(0).onmovestart=function(a){return!1},this.$element.get(0).onselectstart=function(a){return!1}},_setupDragDropForInlineElements:function(){var a=this,c=null,d=null,e=function(){if(c){var e=b(c);e.is(".aloha-block-dropInlineElementIntoEmptyBlock")?(e.children().remove(),e.append(d)):e.is(".aloha-block-droppable-right")?(e.html(e.html()+" "),e.after(d)):(e.prev("[data-i]").length>0&&e.prev("[data-i]").html(e.prev("[data-i]").html()+" "),e.html(" "+e.html()),e.before(d)),d.removeClass("ui-draggable").css({left:0,top:0}),a._fixScrollPositionBugsInIE()}b(".aloha-block-dropInlineElementIntoEmptyBlock").removeClass("aloha-block-dropInlineElementIntoEmptyBlock")},f=[];this.$element.draggable({handle:".aloha-block-draghandle",scope:"aloha-block-inlinedragdrop",revert:function(){return c===null},revertDuration:250,stop:function(){Ext.isIE7&&e(),b.each(f,function(){a._dd_traverseDomTreeAndRemoveSpans(this)}),d=null,f=[]},start:function(){f=[],b(".aloha-editable").children("p:empty").html("&nbsp;");var g={tolerance:"pointer",addClasses:!1,scope:"aloha-block-inlinedragdrop",over:function(e,g){f.indexOf(this)===-1&&f.push(this),d=g.draggable;if(b(this).is(":empty")||b(this).children("br.aloha-end-br").length>0||b(this).html()==="&nbsp;"){b(this).addClass("aloha-block-dropInlineElementIntoEmptyBlock"),c=this;return}a._dd_traverseDomTreeAndWrapCharactersWithSpans(this),b("span[data-i]",this).droppable({tolerance:"pointer",addClasses:!1,scope:"aloha-block-inlinedragdrop",over:function(){c&&b(c).removeClass("aloha-block-droppable"),c=this,b(this).addClass("aloha-block-droppable")},out:function(){b(this).removeClass("aloha-block-droppable"),c===this&&(c=null)}}),b.ui.ddmanager.prepareOffsets(g.draggable.data("draggable"),e)},out:function(){b(this).removeClass("aloha-block-dropInlineElementIntoEmptyBlock")},drop:function(){Ext.isIE7||e()}};b(".aloha-editable").children(":not(.aloha-block)").droppable(g),b(".aloha-table-cell-editable").droppable(g)}})},_dd_traverseDomTreeAndWrapCharactersWithSpans:function(a){var b;for(var c=0,d=a.childNodes.length;c<d;c++){b=a.childNodes[c];if(b.nodeType===1){if(!~b.className.indexOf("aloha-block")&&b.attributes["data-i"]===undefined)this._dd_traverseDomTreeAndWrapCharactersWithSpans(b);else if(b.attributes["data-i"])return}else if(b.nodeType===3){var e=this._dd_insertSpans(b);c+=e,d+=e}}},_dd_splitText:function(a){var b=a.split(/(?=\b)/),c=[],d=!1;for(var e=0,f=b.length;e<f;e++)/[^\t\n\r ]/.test(b[e])?d?(c.push(" "+b[e]),d=!1):c.push(b[e]):d=!0;return d&&(c[c.length-1]+=" "),c},_dd_insertSpans:function(a){var b=a.nodeValue;if(!/[^\t\n\r ]/.test(b))return 0;var c=document.createDocumentFragment(),d=this._dd_splitText(b),e=d.length,f,g,h,i,j=0;for(var k=0;k<e;k++){g=d[k];if(g.length===0)continue;h=Math.floor(g.length/2);if(Ext.isIE7||Ext.isIE8)h=0;h>0&&(f=document.createElement("span"),f.appendChild(document.createTextNode(g.substr(0,h))),f.setAttribute("data-i",k),c.appendChild(f),j++),f=document.createElement("span"),i=g.substr(h),f.appendChild(document.createTextNode(i)),f.setAttribute("data-i",k),f.setAttribute("class","aloha-block-droppable-right"),c.appendChild(f),j++}return a.parentNode.replaceChild(c,a),j-1},_dd_traverseDomTreeAndRemoveSpans:function(a){var b=[],c;c=function(a){var d=!1,e,f,g;for(var h=0,i=a.childNodes.length;h<i;h++)g=a.childNodes[h],g.nodeType===1&&(g.attributes["data-i"]!==undefined?(d||(d=!0,e="",f=undefined),d&&(e+=g.firstChild.nodeValue,f&&b.push(f),f=g)):(d&&(d=!1,f.parentNode.replaceChild(document.createTextNode(e),f)),~g.className.indexOf("aloha-block")||c(g)));d&&f.parentNode.replaceChild(document.createTextNode(e),f)},c(a);for(var d=0,e=b.length;d<e;d++)b[d].parentNode.removeChild(b[d])},_setupDragDropForBlockElements:function(){this.$element.find(".aloha-block-draghandle").addClass("aloha-block-draghandle-blocklevel")},createEditablesIfNeeded:function(){this.$element.find(".aloha-editable").aloha()},renderBlockHandlesIfNeeded:function(){this.isDraggable()&&this.$element.children(".aloha-block-draghandle").length===0&&this.$element.prepend('<span class="aloha-block-handle aloha-block-draghandle"></span>')},attr:function(c,d,e){var f=this,g=!1;if(arguments.length>=2){if(c.substr(0,12)==="aloha-block-"){a.Log.error("block/block","It is not allowed to set internal block attributes (starting with aloha-block-) through Block.attr() (You tried to set "+c+")");return}this._getAttribute(c)!==d&&(g=!0),this._setAttribute(c,d)}else{if(typeof c!="object")return typeof c=="string"?this._getAttribute(c):this._getAttributes();b.each(c,function(b,c){if(b.substr(0,12)==="aloha-block-"){a.Log.error("block/block","It is not allowed to set internal block attributes (starting with aloha-block-) through Block.attr() (You tried to set "+b+")");return}f._getAttribute(b)!==c&&(g=!0),f._setAttribute(b,c)})}return g&&!e&&(this._update(),this.trigger("change")),null},_setAttribute:function(a,b){this.$element.attr("data-"+a.toLowerCase(),b)},_getAttribute:function(a){return this.$element.attr("data-"+a.toLowerCase())},_getAttributes:function(){var a={};return b.each(this.$element[0].attributes,function(b,c){c.name.substr(0,5)==="data-"&&(a[c.name.substr(5).toLowerCase()]=c.value)}),a}}),h=g.extend({update:function(a,b){b()}}),i=g.extend({title:"Debugging",init:function(a,b){this.update(a,b)},update:function(a,c){a.css({display:"block"});var d='<table class="debug-block">';b.each(this.attr(),function(a,b){d+="<tr><th>"+a+"</th><td>"+b+"</td></tr>"}),d+="</table>",a.html(d),c()}});return{AbstractBlock:g,DefaultBlock:h,DebugBlock:i}});