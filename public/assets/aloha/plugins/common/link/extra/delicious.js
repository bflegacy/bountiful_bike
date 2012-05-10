/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
/**
 * Create the Repositories object. Namespace for Repositories
 * @hide
 */
GENTICS.Aloha.Repositories||(GENTICS.Aloha.Repositories={}),GENTICS.Aloha.Repositories.delicious=new GENTICS.Aloha.Repository("delicious"),GENTICS.Aloha.Repositories.delicious.settings.username="draftkraft",GENTICS.Aloha.Repositories.delicious.settings.weight=.35,GENTICS.Aloha.Repositories.delicious.init=function(){var a=this;this.settings.weight+.15>1&&(this.settings.weight=.85),this.deliciousURL="http://feeds.delicious.com/v2/json/",this.settings.username?(this.deliciousURL+=this.settings.username+"/",this.repositoryName="deliciuos/"+this.settings.username,this.tags=[],jQuery.ajax({type:"GET",dataType:"jsonp",url:"http://feeds.delicious.com/v2/json/tags/"+a.settings.username,success:function(b){for(var c in b)a.tags.push(c)}})):(this.repositoryName="deliciuos/"+popular,this.deliciousURL+="tag/")},GENTICS.Aloha.Repositories.delicious.query=function(a,b){var c=this;if(a.objectTypeFilter&&jQuery.inArray("website",a.objectTypeFilter)==-1)b.call(this,[]);else{var d=[];if(this.settings.username){var e=a.queryString?a.queryString.split(" "):[];for(var f=0;f<e.length;f++){var g=e[f].trim();if(jQuery.inArray(g,c.tags)==-1){var h=c.tags.filter(function(a,b,c){var d=new RegExp(g,"i");return a.match(d)});h.length>0&&d.push(h[0])}else d.push(g)}}else d=a.queryString.split(" ");var i=a.inFolderId?a.inFolderId.split("+"):[];jQuery.extend(d,i);if(a.queryString&&d.length==0){b.call(c,[]);return}jQuery.ajax({type:"GET",dataType:"jsonp",url:c.deliciousURL+d.join("+"),success:function(a){var d=[];for(var e=0;e<a.length;e++)typeof a[e]!="function"&&d.push(new GENTICS.Aloha.Repository.Document({id:a[e].u,name:a[e].d,repositoryId:c.repositoryId,type:"website",url:a[e].u,weight:c.settings.weight+.14}));b.call(c,d)}})}},GENTICS.Aloha.Repositories.delicious.getChildren=function(a,b){var c=this;if(this.settings.username){var d=[];if(a.inFolderId==this.repositoryId){for(var e=0;e<this.tags.length;e++)typeof this.tags[e]!="function"&&d.push(new GENTICS.Aloha.Repository.Folder({id:this.tags[e],name:this.tags[e],repositoryId:this.repositoryId,type:"tag",url:"http://feeds.delicious.com/v2/rss/tags/"+c.settings.username+"/"+this.tags[e]}));b.call(this,d)}else jQuery.ajax({type:"GET",dataType:"jsonp",url:"http://feeds.delicious.com/v2/json/tags/"+c.settings.username+"/"+a.inFolderId,success:function(d){var e=[];for(var f in d){var g=a.inFolderId?a.inFolderId+"+"+f:f;typeof d[f]!="function"&&e.push(new GENTICS.Aloha.Repository.Folder({id:g,name:f,repositoryId:c.repositoryId,type:"tag",url:"http://feeds.delicious.com/v2/rss/tags/"+c.settings.username+"/"+g,hasMoreItems:!0}))}b.call(c,e)}})}else b.call(this,[])},GENTICS.Aloha.Repositories.delicious.getObjectById=function(a,b){var c=this;jQuery.ajax({type:"GET",dataType:"jsonp",url:"http://feeds.delicious.com/v2/json/urlinfo/"+jQuery.md5(a),success:function(d){var e=[];for(var f=0;f<d.length;f++)typeof d[f]!="function"&&e.push(new GENTICS.Aloha.Repository.Document({id:a,name:d[f].title,repositoryId:c.repositoryId,type:"website",url:a,weight:c.settings.weight+.14}));b.call(c,e)}})};