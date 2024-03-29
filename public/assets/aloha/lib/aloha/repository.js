/*!
* This file is part of Aloha Editor Project http://aloha-editor.org
* Copyright (c) 2010-2011 Gentics Software GmbH, aloha@gentics.com
* Contributors http://aloha-editor.org/contribution.php 
* Licensed unter the terms of http://www.aloha-editor.org/license.html
*
* Aloha Editor is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.*
*
* Aloha Editor is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
define(["aloha/core","util/class","aloha/repositorymanager"],function(a,b,c){var d=b.extend({_constructor:function(a,b){this.repositoryId=a,this.settings={},this.repositoryName=b?b:a,c.register(this)},init:function(){},query:null,getChildren:null,makeClean:function(a){},markObject:function(a,b){},setTemplate:function(a){a?this.template=a:this.template=null},hasTemplate:function(){return this.template?!0:!1},getTemplate:function(){return this.template},getObjectById:function(a,b){return!0}});return a.AbstractRepository=d,d});