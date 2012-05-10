/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
define(["aloha","aloha/jquery","aloha/floatingmenu","aloha/observable","aloha/registry"],function(a,b,c,d,e){var f=window.GENTICS,g=new(Class.extend(d,{defaults:{"aloha-block-type":"DefaultBlock"},blockTypes:null,blocks:null,_highlightedBlocks:null,_activeBlock:null,_constructor:function(){c.createScope("Aloha.Block"),this.blockTypes=new e,this.blocks=new e,this._highlightedBlocks={}},registerEventHandlers:function(){var c=this;this._registerEventHandlersForDeactivatingAlohaBlock(),this._registerEventHandlersForDeterminingCurrentlyActiveBlock(),this._registerEventHandlersForBlockDeletion(),this._registerEventHandlersForCutCopyPaste(),a.bind("aloha-selection-changed",function(a,d,e){if(d&&b(d.getCommonAncestorContainer()).parents(".aloha-block").length>0)return;c._deactivateHighlightedBlocks()})},_registerEventHandlersForDeactivatingAlohaBlock:function(){var a=this;b(document).bind("click",function(c){if(a._highlightedBlocks=={})return;if(b(c.target).closest(".aloha-sidebar-bar, .aloha-block-do-not-deactivate, .aloha-floatingmenu, .aloha-block").length>0)return;a._deactivateHighlightedBlocks()})},_registerEventHandlersForDeterminingCurrentlyActiveBlock:function(){var a=this;this.bind("block-selection-change",function(b){b.length>0?a._activeBlock=b[0]:a._activeBlock=null})},_registerEventHandlersForBlockDeletion:function(){var c=this;a.bind("aloha-command-will-execute",function(d,e){var f=e.commandId,g=a.getSelection().getRangeCount()===0||a.getSelection().getRangeCount()===1&&a.getSelection().getRangeAt(0).endContainer===a.getSelection().getRangeAt(0).startContainer&&a.getSelection().getRangeAt(0).endContainer===b("body")[0]||a.getSelection().getRangeCount()===1&&a.getSelection().getRangeAt(0).endContainer===a.getSelection().getRangeAt(0).startContainer&&a.getSelection().getRangeAt(0).startOffset+1===a.getSelection().getRangeAt(0).endOffset;if(c._activeBlock&&(f==="delete"||f==="forwarddelete")&&g)e.preventDefault=!0,c._activeBlock.destroy();else if(!c._activeBlock&&(f==="delete"||f==="forwarddelete")&&a.getSelection().getRangeCount()===1&&a.getSelection().getRangeAt(0).collapsed===!1){var h;h=function(a){var c;for(var d=0,e=a.length;d<e;d++){c=a[d];if(c.domobj.nodeType===1){var f=b(c.domobj);c.selection==="full"&&f.is(".aloha-block")?f.remove():h(c.children)}}},h(a.Selection.getSelectionTree())}}),b(window.document).keydown(function(a){if(typeof a.srcElement!="undefined"&&typeof a.srcElement.form!="undefined")return!0;if(c._activeBlock&&(a.which===46||a.which===8)&&c._activeBlock._isInsideNestedEditable===!1){if((Ext.isIE8||Ext.isIE7)&&c._activeBlock.$element.parents(".aloha-editable,.aloha-block").first().hasClass("aloha-editable"))return c._activeBlock.destroy(),a.preventDefault(),!1;if(c._activeBlock.shouldDestroy())return c._activeBlock.destroy(),a.preventDefault(),!1}})},_registerEventHandlersForCutCopyPaste:function(){var a=this,c=!1,d=!1,e=null;b(window.document).keydown(function(b){a._activeBlock&&(b.ctrlKey||b.metaKey)&&b.which===67&&(c=!0,a._activeBlock.$element.attr("data-aloha-block-copy-only-block","true"),f.Utils.Dom.selectDomNode(a._activeBlock.$element[0])),a._activeBlock&&(b.ctrlKey||b.metaKey)&&b.which===88&&(d=!0,a._activeBlock.$element.attr("data-aloha-block-copy-only-block","true"),f.Utils.Dom.selectDomNode(a._activeBlock.$element[0]))}),b(window.document).keyup(function(b){!d&&c&&(b.which===67||b.which===18||b.which===91)&&(c=!1,a._activeBlock.$element.removeAttr("data-aloha-block-copy-only-block"),e&&(e=null)),d&&(b.which===67||b.which===18||b.which===88)&&(d=!1)})},initializeBlockLevelDragDrop:function(){var c=this;b.each(a.editables,function(a,b){c.createBlockLevelSortableForEditableOrBlockCollection(b.obj)}),a.bind("aloha-editable-created",function(a,b){c.createBlockLevelSortableForEditableOrBlockCollection(b.obj)})},createBlockLevelSortableForEditableOrBlockCollection:function(a){a.hasClass("aloha-block-blocklevel-sortable")||(a.addClass("aloha-block-blocklevel-sortable").sortable({revert:100,handle:".aloha-block-draghandle-blocklevel",connectWith:".aloha-block-blocklevel-sortable"}),a.get(0).ondragstart=function(a,b){if(!b||!b.helper||!b.helper.is(".aloha-block"))return!1})},registerBlockType:function(a,b){c.createScope("Aloha.Block."+a,"Aloha.Block"),this.blockTypes.register(a,b)},_blockify:function(c,d){var e,f,g;g=b(c);var h=g[0].tagName.toLowerCase();if(h!=="span"&&h!=="div"){a.Log.error("block/blockmanager","Blocks can only be created from <div> or <span> element. You passed "+h+".");return}e=this.getConfig(g,d);if(!this.blockTypes.has(e["aloha-block-type"])){a.Log.error("block/blockmanager","Block Type "+e["aloha-block-type"]+" not found!");return}f=new(this.blockTypes.get(e["aloha-block-type"]))(g),f.$element.addClass("aloha-block-"+e["aloha-block-type"]),b.each(e,function(a,b){f._setAttribute(a,b)}),this.blocks.register(f.getId(),f)},getConfig:function(a,c){return b.extend({},this.defaults,c,a.data())},getBlock:function(a){var c,d;return typeof a=="object"?(d=b(a),d.hasClass("aloha-block-inner")&&(d=d.parent()),c=d.attr("id")):c=a,this.blocks.get(c)},_unregisterBlock:function(a){var b;typeof a=="object"?b=a.getId():b=a,this.blocks.unregister(a)},_deactivateHighlightedBlocks:function(){b.each(b.extend({},this._highlightedBlocks),function(a){var b=g.getBlock(a);b&&b.deactivate()})},_getHighlightedBlocks:function(){var a={};return b.each(this.blocks.getEntries(),function(b,c){c.isActive()&&(a[b]=c)}),a},_setHighlighted:function(a){this._highlightedBlocks[a.id]=!0},_setUnhighlighted:function(a){delete this._highlightedBlocks[a.id]}}));return a.Block=a.Block||{},a.Block.BlockManager=g,g});