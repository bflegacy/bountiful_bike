/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/
// TODO: SHIFT + ENTER => submit comment  |
(function(a,b){var c=a.alohaQuery||a.jQuery,d=c,e=a.GENTICS,f=a.Aloha;d.extend(d.easing,{easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c}});var g=e.Utils.Dom,h="aloha-comments",i=+(new Date),j=d('<div class="'+h+'-addbox">'+'<div class="'+h+'-content">'+"<h2>Comment:</h2>"+'<input class="'+h+'-user" value="" />'+'<div class="'+h+'-user-err-msg"></div>'+"<textarea></textarea>"+'<div class="'+h+'-text-err-msg"></div>'+'<ul class="'+h+'-colors"></ul>'+'<button class="'+h+"-cancel "+h+'-btn">Cancel</button>'+'<button class="'+h+"-submit "+h+'-btn">Comment</button>'+'<div class="'+h+'-clear"></div>'+"</div>"+'<div class="'+h+'-arrow">'+'<div class="'+h+'-arrow-inner"></div>'+"</div>"+"</div>"),k=d('<div class="'+h+'-viewbox">'+'<div class="'+h+'-content">'+"<h2>Comment:</h2>"+"<textarea></textarea>"+'<ul class="'+h+'-colors"></ul>'+'<button class="'+h+'-submit">Submit</button>'+'<div class="'+h+'-clear"></div>'+"</div>"+'<div class="'+h+'-arrow">'+'<div class="'+h+'-arrow-inner"></div>'+"</div>"+"</div>"),l,m={};f.Comments=new(f.Plugin.extend({user:null,comments:{},colors:{"Golden Yellow":"#fc0","Blood Red":"#c33","Sky Blue":"#9cf","Grass Green":"#9c0"},isModalOpen:!1,isRevealing:!1,bar:null,isBarOpen:!1,_constructor:function(){this._super("comments")},init:function(){var a=this,b=j.find("."+h+"-colors");d("body").append(j).mousedown(function(){a.bodyClicked.apply(a,arguments)}).mouseup(function(){}),d.each(this.colors,function(c,e){b.append(d('<li title="'+c+'" style="background-color:'+e+'"></li>').click(function(){a.setColor(c)}))}),j.find("."+h+"-submit").click(function(){a.submit()}),j.find("."+h+"-cancel").click(function(){a.cancelAdd()}),this.preloadImages(),this.initBtns(),this.createBar()},initBtns:function(){var a=this,b=new f.ui.Button({iconClass:"aloha-button aloha-comments-toolbar-btn aloha-comments-btn-add",onclick:function(){a.isModalOpen||a.addComment.apply(a,arguments)},tooltip:"Add comments to the selected range"}),c=new f.ui.Button({iconClass:"aloha-button aloha-comments-toolbar-btn aloha-comments-btn-reveal",onclick:function(){!a.isModalOpen&&!a.isBarOpen&&a.revealComments.apply(a,arguments)},tooltip:"Show all comments on document"});f.FloatingMenu.addButton("Aloha.continuoustext",b,"Comments",1),f.FloatingMenu.addButton("Aloha.continuoustext",c,"Comments",1)},cancelAdd:function(){this.closeModal(),this.removeHighlight()},createBar:function(){var b=this,c=this.bar=d('<div class="'+h+'-bar">'+'<div class="'+h+'-bar-shadow"></div>'+'<div class="'+h+'-bar-toggle">'+'<div class="'+h+'-bar-toggle-img"></div>'+"</div>"+'<div class="'+h+'-bar-inner">'+"<h2>"+"Comments:"+"</h2>"+"<ul></ul>"+'<div class="'+h+'-bar-bottom">'+"</div>"+"</div>"+"</div>").click(function(){b.barClicked.apply(b,arguments)});d("body").append(c),d(a).resize(function(){b.setBarScrolling()}),this.bar.find("."+h+"-bar-toggle").click(function(){b.isBarOpen?(d(this).removeClass(h+"-bar-toggle-opened"),b.closeBar()):(d(this).addClass(h+"-bar-toggle-opened"),b.showBar())}),this.setBarScrolling()},barClicked:function(a){var b=d(a.target),c=b;!b[0].tagName!="LI"&&(c=c.parents("li")),c.length>0&&this.insertReplyTools(c.first())},getGravatar:function(a,b){var c=function(a){function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=a&2147483648,f=b&2147483648,c=a&1073741824,d=b&1073741824,g=(a&1073741823)+(b&1073741823),c&d?g^2147483648^e^f:c|d?g&1073741824?g^3221225472^e^f:g^1073741824^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){var b,c=a.length,d=c+8,e=(d-d%64)/64,f=(e+1)*16,g=Array(f-1),h=0,i=0;while(i<c)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var b="",c="",d,e;for(e=0;e<=3;e++)d=a>>>e*8&255,c="0"+d.toString(16),b+=c.substr(c.length-2,2);return b}function n(a){a=a.replace(/\r\n/g,"\n");var b="";for(var c=0;c<a.length;c++){var d=a.charCodeAt(c);d<128?b+=String.fromCharCode(d):d>127&&d<2048?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(d&63|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(d&63|128))}return b}var o=Array(),p,q,r,s,t,u,v,w,x,y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;a=n(a),o=l(a),u=1732584193,v=4023233417,w=2562383102,x=271733878;for(p=0;p<o.length;p+=16)q=u,r=v,s=w,t=x,u=h(u,v,w,x,o[p+0],y,3614090360),x=h(x,u,v,w,o[p+1],z,3905402710),w=h(w,x,u,v,o[p+2],A,606105819),v=h(v,w,x,u,o[p+3],B,3250441966),u=h(u,v,w,x,o[p+4],y,4118548399),x=h(x,u,v,w,o[p+5],z,1200080426),w=h(w,x,u,v,o[p+6],A,2821735955),v=h(v,w,x,u,o[p+7],B,4249261313),u=h(u,v,w,x,o[p+8],y,1770035416),x=h(x,u,v,w,o[p+9],z,2336552879),w=h(w,x,u,v,o[p+10],A,4294925233),v=h(v,w,x,u,o[p+11],B,2304563134),u=h(u,v,w,x,o[p+12],y,1804603682),x=h(x,u,v,w,o[p+13],z,4254626195),w=h(w,x,u,v,o[p+14],A,2792965006),v=h(v,w,x,u,o[p+15],B,1236535329),u=i(u,v,w,x,o[p+1],C,4129170786),x=i(x,u,v,w,o[p+6],D,3225465664),w=i(w,x,u,v,o[p+11],E,643717713),v=i(v,w,x,u,o[p+0],F,3921069994),u=i(u,v,w,x,o[p+5],C,3593408605),x=i(x,u,v,w,o[p+10],D,38016083),w=i(w,x,u,v,o[p+15],E,3634488961),v=i(v,w,x,u,o[p+4],F,3889429448),u=i(u,v,w,x,o[p+9],C,568446438),x=i(x,u,v,w,o[p+14],D,3275163606),w=i(w,x,u,v,o[p+3],E,4107603335),v=i(v,w,x,u,o[p+8],F,1163531501),u=i(u,v,w,x,o[p+13],C,2850285829),x=i(x,u,v,w,o[p+2],D,4243563512),w=i(w,x,u,v,o[p+7],E,1735328473),v=i(v,w,x,u,o[p+12],F,2368359562),u=j(u,v,w,x,o[p+5],G,4294588738),x=j(x,u,v,w,o[p+8],H,2272392833),w=j(w,x,u,v,o[p+11],I,1839030562),v=j(v,w,x,u,o[p+14],J,4259657740),u=j(u,v,w,x,o[p+1],G,2763975236),x=j(x,u,v,w,o[p+4],H,1272893353),w=j(w,x,u,v,o[p+7],I,4139469664),v=j(v,w,x,u,o[p+10],J,3200236656),u=j(u,v,w,x,o[p+13],G,681279174),x=j(x,u,v,w,o[p+0],H,3936430074),w=j(w,x,u,v,o[p+3],I,3572445317),v=j(v,w,x,u,o[p+6],J,76029189),u=j(u,v,w,x,o[p+9],G,3654602809),x=j(x,u,v,w,o[p+12],H,3873151461),w=j(w,x,u,v,o[p+15],I,530742520),v=j(v,w,x,u,o[p+2],J,3299628645),u=k(u,v,w,x,o[p+0],K,4096336452),x=k(x,u,v,w,o[p+7],L,1126891415),w=k(w,x,u,v,o[p+14],M,2878612391),v=k(v,w,x,u,o[p+5],N,4237533241),u=k(u,v,w,x,o[p+12],K,1700485571),x=k(x,u,v,w,o[p+3],L,2399980690),w=k(w,x,u,v,o[p+10],M,4293915773),v=k(v,w,x,u,o[p+1],N,2240044497),u=k(u,v,w,x,o[p+8],K,1873313359),x=k(x,u,v,w,o[p+15],L,4264355552),w=k(w,x,u,v,o[p+6],M,2734768916),v=k(v,w,x,u,o[p+13],N,1309151649),u=k(u,v,w,x,o[p+4],K,4149444226),x=k(x,u,v,w,o[p+11],L,3174756917),w=k(w,x,u,v,o[p+2],M,718787259),v=k(v,w,x,u,o[p+9],N,3951481745),u=c(u,q),v=c(v,r),w=c(w,s),x=c(x,t);var O=m(u)+m(v)+m(w)+m(x);return O.toLowerCase()},b=b||80;return"http://www.gravatar.com/avatar/"+c(a)+".jpg?s="+b},addComment:function(){var a=this,b=f.Selection.getRangeObject(),c=h+"-"+ ++i,e=[h+"-wrapper",c],j=d('<div class="'+e.join(" ")+'">');g.addMarkup(b,j);if(d("."+c).length==0)return;g.doCleanup({merge:!0,removeempty:!0},b);var k=l=this.comments[c]={id:c,timestamp:null,email:null,comment:null,mom:null,kids:[],color:this.colors["Golden Yellow"],elements:d("."+c),commonAncestor:d(b.getCommonAncestorContainer())};m[c]=this.comments[c],this.highlight(k),this.openModal(k),d(".aloha-floatingmenu").hide(),k.elements.click(function(){a.commentClicked(k)}).hover(function(){a.hover(k,!0)},function(){a.hover(k,!1)})},revealComments:function(){this.isRevealing?d("."+h+"-active").removeClass(h+"-active").css("background-color",""):d.each(this.comments,function(a,b){b.elements.addClass(h+"-active").css("background-color",b.color)}),this.isRevealing=!this.isRevealing},openModal:function(a){var b=this,c=a.elements.first(),e=c.offset();j.show().css("height","auto").find("input").val(this.user);var f,g=j.find("."+h+"-content"),i=j.find("input."+h+"-user").removeClass(h+"-error"),k=j.find("textarea").removeClass(h+"-error").val(""),l=g.height(),m=30,n=e.top-(j.outerHeight(!0)+m);n<=0?(f=e.top-m,c=a.elements.last(),e=c.last().offset(),n=e.top+c.height()+m,j.addClass(h+"-point-from-bottom")):(j.removeClass(h+"-point-from-bottom"),f=n-m),j.css({left:e.left+c.width()/2-j.outerWidth(!0)/2,top:n,marginTop:l,opacity:0}).animate({marginTop:0,opacity:1},800,"easeOutElastic"),d("body").animate({scrollTop:f},1e3,"easeOutExpo"),this.user==""||!this.user?i.select():(i.val(this.user),k.focus()),g.css("height",0).animate({height:l},800,"easeOutElastic"),this.isModalOpen=!0},closeModal:function(){d(".aloha-floatingmenu").show(),j.fadeOut(250),this.isModalOpen=!1},highlight:function(a){a.elements.css("background-color",a.color).addClass(h+"-active").parents().addClass(h+"-ancestor").siblings(":not(."+h+"-addbox,"+"."+h+"-ancestor,"+"."+h+"-bar,"+".aloha-floatingmenu"+")").addClass(h+"-grayed"),this.highlightElement(a.commonAncestor),d("."+h+"-grayed").animate({opacity:.25},250),d("."+h+"-cleanme").each(function(){g.isEmpty(this)&&d(this).remove()})},highlightElement:function(a){var b=this;return a.contents().each(function(){var a=this.nodeType==3?d(this).wrap('<span class="'+h+'-cleanme">').parent():d(this);a.hasClass(h+"-ancestor")?b.highlightElement(a):a.hasClass(h+"-active")||a.addClass(h+"-grayed")}),a},removeHighlight:function(){d("."+h+"-grayed").removeClass(h+"-grayed").css("opacity",""),d("."+h+"-active").removeClass(h+"-active").css("background-color",""),d("."+h+"-ancestor").removeClass(h+"-ancestor"),typeof l=="object"&&(l.elements.css("background-color",""),l=b)},hover:function(a,b){var c=a.elements;c.hasClass(h+"-active")||(b?c.addClass(h+"-hover").css("background-color",a.color):c.removeClass(h+"-hover").css("background-color",""))},commentClicked:function(a){this.showBar(a)},showBar:function(a){var b=this,c=this.bar.find("ul:first").html("");this.bar.animate({width:300},250,"easeOutExpo"),d("body").animate({marginLeft:300},250,"easeOutExpo"),a?(this.highlight(a),this.printThread(c,a)):d.each(this.comments,function(){b.printThread(c,this)}),this.isBarOpen=!0,this.setBarScrolling()},setBarScrolling:function(){var b=this.bar.find("."+h+"-bar-bottom").position();this.bar.find("."+h+"-bar-inner").css({height:d(a).height(),"overflow-y":b.top>this.bar.height()?"scroll":"auto"}),this.bar.find("."+h+"-bar-shadow").css("height",this.bar.height())},closeBar:function(){this.bar.animate({width:0},250,"easeOutExpo"),d("body").animate({marginLeft:0},250,"easeOutExpo"),this.removeHighlight(),this.isBarOpen=!1},printThread:function(a,b){var c=this,e=d('<li data-aloha-comment="'+b.id+'">'+'<div class="'+h+'-bar-comment">'+'<img src="'+c.getGravatar(b.email,40)+'" alt="" />'+'<div style="float:left;">'+"<span>"+b.email+" says:</span>"+"<div>"+b.comment+"</div>"+"</div>"+'<div class="'+h+'-clear"></div>'+"</div>"+"</li>");a.append(e),d.each(b.kids,function(){var a=d("<ul>");e.append(a),c.printThread(a,this)})},insertReplyTools:function(a){var b=this,c=a.addClass(h+"-bar-comment-active").find(".aloha-comments-bar-comment>."+h+"-bar-reply");if(c.length==0){c=d('<div class="'+h+'-bar-reply">'+'<input value="'+this.user+'" />'+"<textarea>Replying...</textarea>"+"<button>Reply</button>"+"</div>"),a.find(">div").append(c),a.find("button").click(function(){b.submitReply.call(b,c)});var e=c.css("height","auto").height();c.css("height",0).animate({height:e},250,"easeOutExpo"),c.find("input, textarea").css("width",c.width()-12),c.find("input").select(),this.bar.scrollTop(c.offset().top)}},submitReply:function(a){var b=this,c=a.parents("li").first(),e=c.attr("data-aloha-comment"),f=m[e];if(typeof f=="object"){var g=h+"-"+ ++i,j=a.find("input").val().trim(),k=a.find("textarea").val().trim().replace(/[\r\n]/g,"<br />"),l=f.kids.push({id:g,timestamp:(new Date).getTime(),email:j,comment:k,kids:[],mom:f.id,color:f.color,elements:f.elements,commonAncestor:f.elements});m[g]=f.kids[l-1],a.animate({height:0},250,"easeOutExpo",function(){d(this).remove();var a=d("<ul>");c.append(a),b.printThread(a,m[g])}),this.user=j}},setColor:function(a){l.color=this.colors[a],l.elements.css("background-color",l.color),j.find("textarea").focus()},submit:function(){var a=j.find("textarea"),b=j.find("."+h+"-user"),c=b.val().trim(),e=a.val().trim(),f=!1,g=h+"-error";c==""?(b.focus().addClass(g),f=!0):b.removeClass(g),e==""?(a.focus().addClass(g),f=!0):a.removeClass(g),e=e.replace(/[\r\n]/g,"<br />"),f||(d.extend(l,{email:c,comment:e,timestamp:(new Date).getTime()}),this.insertComment(l),this.closeModal(),this.showBar(l),a.val(""),b.val("")),this.user=c},insertComment:function(a){m[a.id]=this.comments[a.id]=a},bodyClicked:function(a){var b=d(a.target);this.isModalOpen&&!b.hasClass(h+"-addbox")&&b.parents("."+h+"-addbox").length==0&&(this.closeModal(),this.removeHighlight()),this.isModalOpen||b.hasClass(h+"-bar")||b.parents("."+h+"-bar").length==0&&this.removeHighlight()},preloadImages:function(){d.each(["hr.png","textbox.png"],function(){(new Image).src="../../plugin/comments/img/"+this})}}))})(window);