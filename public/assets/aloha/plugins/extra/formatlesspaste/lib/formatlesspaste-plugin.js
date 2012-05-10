/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
define(["aloha/core","aloha/plugin","aloha/jquery","aloha/floatingmenu","formatlesspaste/formatlesshandler","aloha/contenthandlermanager","i18n!formatlesspaste/nls/i18n","i18n!aloha/nls/i18n","css!formatlesspaste/css/formatless.css"],function(a,b,c,d,e,f,g,h){return b.create("formatlesspaste",{formatlessPasteOption:!1,strippedElements:["a","em","strong","small","s","cite","q","dfn","abbr","time","code","var","samp","kbd","sub","sup","i","b","u","mark","ruby","rt","rp","bdi","bdo","ins","del"],init:function(){var a=this;typeof this.settings.formatlessPasteOption!="undefined"&&(this.formatlessPasteOption=this.settings.formatlessPasteOption),typeof this.settings.strippedElements!="undefined"&&(this.strippedElements=this.settings.strippedElements),this.formatlessPasteOption&&this.registerFormatlessPasteHandler()},registerFormatlessPasteHandler:function(){f.register("formatless",e),e.strippedElements=this.strippedElements,this.formatlessPasteButton=new a.ui.Button({iconClass:"aloha-button aloha-button-formatless-paste",size:"small",onclick:function(){e.enabled=!e.enabled},tooltip:g.t("button.formatlessPaste.tooltip"),toggle:!0}),d.addButton("Aloha.continuoustext",this.formatlessPasteButton,h.t("floatingmenu.tab.format"),1)}})});