define(["aloha/jquery"],function(a){return CreateLayer=function(a){this.TablePlugin=a},CreateLayer.prototype.parameters={elemId:"aloha-table-createLayer",className:"aloha-table-createdialog",numX:10,numY:10,layer:undefined,target:undefined},CreateLayer.prototype.config=new Object,CreateLayer.prototype.visible=!1,CreateLayer.prototype.show=function(){var a=this.get("layer");a==null?this.create():(this.setPosition(a),a.find("td").removeClass("hover"),a.show()),this.visible=!0},CreateLayer.prototype.create=function(){var b=this,c=a("<div></div>");c.id=this.get("elemId"),c.addClass(this.get("className"));var d=a("<table></table>");d.css("width",(this.get("numX")+6)*15);var e,f;for(var g=0;g<this.get("numY");g++){e=a("<tr></tr>");for(var h=0;h<this.get("numX");h++)f=a("<td> </td>"),g==0&&h==0&&f.addClass("hover"),f.bind("mouseover",{rowId:g,colId:h},function(a){b.handleMouseOver(a,d)}),f.bind("click",{rowId:g,colId:h},function(a){var c=a.data.rowId+1,d=a.data.colId+1;b.TablePlugin.createTable(d,c),b.hide()}),e.append(f);d.append(e)}c.append(d),this.set("layer",c),this.setPosition(),c.bind("click",function(a){a.stopPropagation()}).mousedown(function(a){a.stopPropagation()}),a("body").append(c).bind("click",function(a){a.target!=b.get("target")&&b.visible&&b.hide()})},CreateLayer.prototype.handleMouseOver=function(b,c){var d=b.data.rowId,e=b.data.colId,f=c.find("tr");for(var g=0;g<=f.length;g++){var h=a(f[g]).find("td");for(var i=0;i<=h.length;i++)g<=d&&i<=e?a(h[i]).addClass("hover"):a(h[i]).removeClass("hover")}},CreateLayer.prototype.setPosition=function(){var b=a(this.get("target")),c=b.offset();this.get("layer").css("left",c.left+"px"),this.get("layer").css("top",c.top+b.height()+"px")},CreateLayer.prototype.hide=function(){this.get("layer").hide(),this.visible=!1},CreateLayer.prototype.get=function(a){return this.config[a]?this.config[a]:this.parameters[a]?this.parameters[a]:undefined},CreateLayer.prototype.set=function(a,b){this.config[a]?this.config[a]=b:this.parameters[a]=b},CreateLayer});