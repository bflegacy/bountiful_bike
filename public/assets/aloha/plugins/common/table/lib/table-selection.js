define(["aloha","aloha/jquery","table/table-plugin-utils","table/table-cell","i18n!table/nls/i18n"],function(a,b,c,d,e){function g(a){return{top:a.top[0],right:a.right[0]+1,bottom:a.bottom[0]+1,left:a.left[0]}}function h(a,b,d){var e=!0;if(-1!==c.indexOfAnyBut(b.top,b.top[0])||-1!==c.indexOfAnyBut(b.right,b.right[0])||-1!==c.indexOfAnyBut(b.bottom,b.bottom[0])||-1!==c.indexOfAnyBut(b.left,b.left[0]))e=!1;else{var f=g(b);c.walkGridInsideRect(a,f,function(a){if(!d(a))return e=!1,!1})}return e}var f=function(a){this.table=a};return f.prototype.selectionType=undefined,f.prototype.selectedCells=new Array,f.prototype.selectedColumnIdxs=new Array,f.prototype.selectedRowIdxs=new Array,f.prototype.cellSelectionMode=!1,f.prototype.baseCellPosition=null,f.prototype.lastSelectionRange=null,f.prototype.selectColumns=function(a){this.unselectCells();var d=this.table.getRows();d.shift();var e=c.makeGrid(d);for(var f=0;f<a.length;f++){if(-1!==b.inArray(a[f],this.selectedColumnIdxs))continue;this.selectedColumnIdxs.push(a[f]);for(var g=0;g<e.length;g++){var h=e[g][a[f]];c.containsDomCell(h)&&(b(h.cell).addClass(this.table.get("classCellSelected")),this.selectedCells.push(h.cell))}}this.selectionType="column"},f.prototype.selectRows=function(a){this.unselectCells();var c=this.table.getRows();a.sort(function(a,b){return a-b});for(var d=0;d<a.length;d++)if(c[a[d]]){for(var e=0;e<this.selectedRowIdxs.length;e++)if(a[d]==this.selectedRowIdxs[e])return;this.selectedRowIdxs.push(a[d]);for(var f=1;f<c[a[d]].cells.length;f++)this.selectedCells.push(c[a[d]].cells[f]),b(c[a[d]].cells[f]).addClass(this.table.get("classCellSelected"))}this.selectionType="row"},f.prototype.selectAll=function(){var a=b.map(this.table.getRows(),function(a,b){return b});a.shift(),this.selectRows(a)},f.prototype.notifyCellsSelected=function(){a.trigger("aloha-table-selection-changed")},f.prototype._notifyCellsUnselected=function(){a.trigger("aloha-table-selection-changed")},f.prototype.isHeader=function(){if(this.selectedCells.length==0)return!1;for(var a=0;a<this.selectedCells.length;a++)if(!this.selectedCells[a]||this.selectedCells[a].nodeName.toLowerCase()!="th")return!1;return!0},f.prototype.unselectCells=function(){var a;if(this.cellSelectionMode)return;if(this.selectedCells.length>0){a=this.table.getRows();for(var c=0;c<a.length;c++)for(var d=1;d<a[c].cells.length;d++)b(a[c].cells[d]).removeClass(this.table.get("classCellSelected"));this.selectedCells=new Array,this.selectedColumnIdxs=new Array,this.selectedRowIdxs=new Array,this.selectionType="cell",this._notifyCellsUnselected()}},f.prototype.selectionIndex=function(a){for(var b=0;b<this.selectedCells.length;b++)if(this.selectedCells[b]===a)return b;return-1},f.prototype.mergeCells=function(){var f=this.selectedCells;if(0===f.length)return;var i=function(a){return-1!=b.inArray(a.cell,f)},j=c.makeGrid(this.table.getRows()),k=c.makeContour(j,i);if(!h(j,k,i)){a.showMessage(new a.Message({title:e.t("Table"),text:e.t("table.mergeCells.notRectangular"),type:a.Message.Type.ALERT}));return}var l=g(k),m=b(j[l.top][l.left].cell),n=b(d.getContainer(m.get(0)));c.walkGridInsideRect(j,l,function(a,c,e){if(c-a.spannedX===l.left&&e-a.spannedY===l.top)return;var f=a.cell,g=b(d.getContainer(f)).contents();for(var h=0;h<g.length;h++)if("string"!=typeof g[h]||""!==b.trim(g[h])){n.append(" "),n.append(g);break}b(f).remove()}),m.attr({rowspan:l.bottom-l.top,colspan:l.right-l.left}),this.selectedCells=[m.get(0)],this.cellSelectionMode=!1,this.baseCellPosition=null,this.lastSelectionRange=null,this.selectionType="cell",a.trigger("aloha-table-selection-changed")},f.prototype.splitCells=function(){var d=this,e=this.selectedCells;e.length>0&&(b(e).each(function(){c.splitCell(this,function(){return d.table.newActiveCell().obj})}),this.cellSelectionMode=!1,this.baseCellPosition=null,this.lastSelectionRange=null,this.selectionType="cell",a.trigger("aloha-table-selection-changed"))},f.prototype.cellsAreMergeable=function(){var a=this.selectedCells;if(a.length<2)return!1;var d=function(c){return-1!=b.inArray(c.cell,a)},e=c.makeGrid(this.table.getRows()),f=c.makeContour(e,d);return h(e,f,d)?!0:!1},f.prototype.cellsAreSplitable=function(){var a=0;return this.selectedCells.length>0?(b(this.selectedCells).each(function(){var b=this,d=c.colspan(b),e=c.rowspan(b);(d>1||e>1)&&a++}),a>0?!0:!1):!1},f});