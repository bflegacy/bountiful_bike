(function(a){a.fn.vieSemanticAloha=function(b){var c={beforeEditing:null};a.extend(c,b),this.each(function(){var a=VIE.ContainerManager.getInstanceForContainer(jQuery(this));typeof a.editables=="undefined"&&(a.editables={}),VIE.ContainerManager.findContainerProperties(this,!1).each(function(){var b=jQuery(this);c.beforeEditing!=null&&c.beforeEditing(b);var d=b.attr("property");if(a.get(d)instanceof Array)return!0;a.editables[d]=new GENTICS.Aloha.Editable(b),a.editables[d].vieContainerInstance=a})})}})(jQuery),typeof VIE=="undefined"&&(VIE={}),VIE.AlohaEditable={refreshFromEditables:function(a){var b={};return jQuery.each(a.editables,function(a,c){if(!c.isModified())return!0;jQuery("[typeof][about]",c.obj).each(function(){var a=VIE.ContainerManager.getInstanceForContainer(jQuery(this))}),b[a]=c.getContents()}),jQuery.isEmptyObject(b)?!1:(a.set(b),!0)}};