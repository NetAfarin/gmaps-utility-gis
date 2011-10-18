/** built on 2011-10-17 */ 
dojo._xdResourceLoaded(function(){ return {
depends: [["provide", "agsjs.layers.GoogleMapsLayer"]],
defineResource: function(dojo) {
window.google=window.google||{};dojo.provide("agsjs.layers.GoogleMapsLayer");
dojo.declare("agsjs.layers.GoogleMapsLayer",esri.layers.Layer,{constructor:function(a){a=a||{};this.tileInfo=new esri.layers.TileInfo({rows:256,cols:256,dpi:96,origin:{x:-2.0037508342787E7,y:2.0037508342787E7},spatialReference:{wkid:102100},lods:[{level:0,resolution:156543.033928,scale:5.91657527591555E8},{level:1,resolution:78271.5169639999,scale:2.95828763795777E8},{level:2,resolution:39135.7584820001,scale:1.47914381897889E8},{level:3,resolution:19567.8792409999,scale:7.3957190948944E7},{level:4,
resolution:9783.93962049996,scale:3.6978595474472E7},{level:5,resolution:4891.96981024998,scale:1.8489297737236E7},{level:6,resolution:2445.98490512499,scale:9244648.868618},{level:7,resolution:1222.99245256249,scale:4622324.434309},{level:8,resolution:611.49622628138,scale:2311162.217155},{level:9,resolution:305.748113140558,scale:1155581.108577},{level:10,resolution:152.874056570411,scale:577790.554289},{level:11,resolution:76.4370282850732,scale:288895.277144},{level:12,resolution:38.2185141425366,
scale:144447.638572},{level:13,resolution:19.1092570712683,scale:72223.819286},{level:14,resolution:9.55462853563415,scale:36111.909643},{level:15,resolution:4.77731426794937,scale:18055.954822},{level:16,resolution:2.38865713397468,scale:9027.977411},{level:17,resolution:1.19432856685505,scale:4513.988705},{level:18,resolution:0.597164283559817,scale:2256.994353},{level:19,resolution:0.298582141647617,scale:1128.497176}]});this._overlayLayerNames=[{key:"traffic",minZoom:9},{key:"bicycling",minZoom:10}];
this._featureTypeNames=[{key:"poi",name:"point of interest"},{key:"road.highway",name:"highway"},{key:"road.arterial",name:"arterial road"},{key:"road.local",name:"local road"},{key:"transit"},{key:"administrative"},{key:"landscape"},{key:"water"}];this.layerInfos=null;this.fullExtent=new esri.geometry.Extent({xmin:-2.003750834E7,ymin:-2.003750834E7,xmax:2.003750834E7,ymax:2.003750834E7,spatialReference:{wkid:102100}});this.initialExtent=new esri.geometry.Extent({xmin:-2.003750834E7,ymin:-2.003750834E7,
xmax:2.003750834E7,ymax:2.003750834E7,spatialReference:{wkid:102100}});this.opacity=a.opacity||1;this._mapOptions=a.mapOptions||{};this._apiOptions=dojo.mixin({sensor:false},a.apiOptions||{});this._gmap=null;this._glayers={};this.loaded=true},getGoogleMapInstance:function(){return this._gmap},_setMap:function(a,b){this._map=a;var c=dojo.create("div",{},b);if(this._mapOptions.id)c.id=this.id;var d={position:"absolute",top:"0px",left:"0px",width:(a.width||b.offsetWidth)+"px",height:(a.height||b.offsetHeight)+
"px"};dojo.style(c,d);this._div=c;this._layersDiv=b;this._visibilityChangeHandle=dojo.connect(this,"onVisibilityChange",this,this._visibilityChangeHandler);this._opacityChangeHandle=dojo.connect(this,"onOpacityChange",this,this._onOpacityChangeHandler);(this.visible=this._mapOptions.visible===undefined?true:this._mapOptions.visible)&&this._initGMap();var e=dojo.create("div",{},a.id);e.id="gmaps_controls_"+c.id;dojo.style(e,dojo.mixin(d,{width:"0px",height:"0px",top:"5px",left:"5px"}));this._controlDiv=
e;return c},_unsetMap:function(){dojo.destroy(this._div);this._gmap=this._div=this._map=null;dojo.disconnect(this._extentChangeHandle);dojo.disconnect(this._panHandle);dojo.disconnect(this._resizeHandle);dojo.disconnect(this._visibilityChangeHandle);dojo.disconnect(this._opacityChangeHandle);google.maps.event.removeListener(this._gmapTypeChangeHandle);google.maps.event.removeListener(this._svVisibleHandle)},_initGMap:function(){if(window.google&&google.maps){console.log(google.maps.ControlPosition.TOP_LEFT);
var a=this._map.extent,b=this._mapOptions.center||this._esriPointToLatLng(a.getCenter()),c=this._map.getLevel();b=dojo.mixin({center:b,zoom:c>-1?c:1,panControl:false,mapTypeControl:false,zoomControl:false},this._mapOptions);b.mapTypeId=b.mapTypeId?this._getGMapTypeId(b.mapTypeId):google.maps.MapTypeId.ROADMAP;b=new google.maps.Map(this._div,b);c<0&&dojo.connect(this._map,"onLoad",dojo.hitch(this,function(){this._setExtent(a)}));this._gmap=b;this._extentChangeHandle=dojo.connect(this._map,"onExtentChange",
this,this._extentChangeHandler);this._panHandle=dojo.connect(this._map,"onPan",this,this._panHandler);this._resizeHandle=dojo.connect(this._map,"onResize",this,this._resizeHandler);if(this._mapOptions.streetViewControl!==false)this._svHandle=dojo.connect(this._map,"onMouseMove",dojo.hitch(this,this._moveStreetViewControl));this._gmapTypeChangeHandle=google.maps.event.addListener(this._gmap,"maptypeid_changed",dojo.hitch(this,this._mapTypeChangeHandler));google.maps.panoramio&&this._overlayLayerNames.push({key:"panoramio"});
this.layerInfos=this._createLayerInfos();this.onLoad(this)}else if(!agsjs.onGMapsApiLoad){agsjs.onGMapsApiLoad=function(){};dojo.connect(agsjs,"onGMapsApiLoad",this,this._initGMap);c=document.createElement("script");c.type="text/javascript";b=window.location.protocol+"//maps.google.com/maps/api/js?callback=agsjs.onGMapsApiLoad";this._apiOptions=dojo.mixin({sensor:false},this._apiOptions);for(var d in this._apiOptions)if(this._apiOptions.hasOwnProperty(d))b+="&"+d+"="+this._apiOptions[d];c.src=b;document.getElementsByTagName("head").length>
0?document.getElementsByTagName("head")[0].appendChild(c):document.body.appendChild(c)}},setMapTypeId:function(a){if(this._gmap)this._gmap.setMapTypeId(this._getGMapTypeId(a));else this._mapOptions.mapTypeId=a;this._mapTypeChangeHandler()},setOpacity:function(a){if(this._div){a=Math.min(Math.max(a,0),1);var b=this._div.style;if(typeof b.opacity!=="undefined")b.opacity=a;else if(typeof b.filters!=="undefined")b.filters.alpha.opacity=Math.floor(100*a);else if(typeof b.filter!=="undefined")b.filter=
"alpha(opacity:"+Math.floor(a*100)+")"}this.opacity=a},setVisibleLayers:function(a){var b,c,d;b=0;for(c=this._overlayLayerNames.length;b<c;b++){var e=this._overlayLayerNames[b];d=this._glayers[e.key];if(a.indexOf(""+b)!=-1){if(d==null)switch(e.key){case "bicycling":d=new google.maps.BicyclingLayer;break;case "traffic":d=new google.maps.TrafficLayer;break;case "panoramio":d=new google.maps.panoramio.PanoramioLayer;break}if(d){d.setMap(this._gmap);this._glayers[e.key]=d}}else d&&d.setMap(null)}e=[];
b=0;for(c=this._featureTypeNames.length;b<c;b++){var f={};d=this._featureTypeNames[b];var g=a.indexOf(""+(b+this._overlayLayerNames.length))!=-1;if(!g){f.featureType=d.key;f.elementType="all";f.stylers=[{visibility:g?"on":"off"}];e.push(f)}}this._gmap.setOptions({styles:e})},onMapTypeChange:function(){},_getGMapTypeId:function(a){if(google&&google.maps)switch(a){case agsjs.layers.GoogleMapsLayer.MAPTYPE_ROADMAP:return google.maps.MapTypeId.ROADMAP;case agsjs.layers.GoogleMapsLayer.MAPTYPE_HYBRID:return google.maps.MapTypeId.HYBRID;
case agsjs.layers.GoogleMapsLayer.MAPTYPE_SATELLITE:return google.maps.MapTypeId.SATELLITE;case agsjs.layers.GoogleMapsLayer.MAPTYPE_TERRAIN:return google.maps.MapTypeId.TERRAIN}return a},_opacityChangeHandler:function(a){this.setOpacity(a)},_visibilityChangeHandler:function(a){if(a){esri.show(this._div);esri.show(this._controlDiv);this.visible=true;if(this._gmap){google.maps.event.trigger(this._gmap,"resize");this._panHandle=this._panHandle||dojo.connect(this._map,"onPan",this,this._panHandler);
this._extentChangeHandle=this._extentChangeHandle||dojo.connect(this._map,"onExtentChange",this,this._extentChangeHandler);this._setExtent(this._map.extent)}else this._initGMap()}else if(this._div){esri.hide(this._div);esri.hide(this._controlDiv);this.visible=false;this._streetView&&this._streetView.setVisible(false);if(this._panHandle){dojo.disconnect(this._panHandle);this._panHandle=null}if(this._extentChangeHandle){dojo.disconnect(this._extentChangeHandle);this._extentChangeHandle=null}}},_resizeHandler:function(){dojo.style(this._div,
{width:this._map.width+"px",height:this._map.height+"px"});google.maps.event.trigger(this._gmap,"resize")},_extentChangeHandler:function(a,b,c){c?this._setExtent(a):this._gmap.setCenter(this._esriPointToLatLng(a.getCenter()))},_panHandler:function(a){this._gmap.setCenter(this._esriPointToLatLng(a.getCenter()))},_mapTypeChangeHandler:function(){this._checkZoomLevel();this.onMapTypeChange(this._gmap.getMapTypeId())},_checkZoomLevel:function(){var a=this._gmap.getMapTypeId(),b=this._gmap.mapTypes,c=
null;for(var d in b)if(b.hasOwnProperty(d)&&d==a){c=b[d];break}if(c!=null){a=c.minZoom;c=c.maxZoom;b=this._map.getLevel();c!==undefined&&b>c&&this._map.setLevel(c);a!=undefined&&b<a&&this._map.setLevel(a)}},_setExtent:function(a){var b=this._map.getLevel();if(b>=0){a=this._esriPointToLatLng(a.getCenter());this._gmap.setZoom(b);this._gmap.setCenter(a);this._checkZoomLevel()}else this._gmap.fitBounds(this._esriExtentToLatLngBounds(a))},_moveStreetViewControl:function(){if(this._svHandle)if(this._streetView=
this._gmap.getStreetView()){var a=dojo.query('.gmnoprint img[src*="cb_scout_sprite"]',this._div);if(a.length>0){dojo.forEach(a,function(b){dojo.place(b.parentNode.parentNode,this._controlDiv)},this);dojo.disconnect(this._svHandle);this._svHandle=null;this._svVisibleHandle=google.maps.event.addListener(this._streetView,"visible_changed",dojo.hitch(this,this._streetViewVisibilityChangeHandler))}}},_streetViewVisibilityChangeHandler:function(){if(this._streetView){var a=this._streetView.getVisible();
if(a){this._isZoomSliderDefault=this._map.isZoomSlider;this._map.hideZoomSlider();this._map.disableMapNavigation()}else{this._isZoomSliderDefault&&this._map.showZoomSlider();this._map.enableMapNavigation()}this.onStreetViewVisibilityChange(a)}},onStreetViewVisibilityChange:function(){},_esriPointToLatLng:function(a){a=esri.geometry.webMercatorToGeographic(a);return new google.maps.LatLng(a.y,a.x)},_esriExtentToLatLngBounds:function(a){a=esri.geometry.webMercatorToGeographic(a);return new google.maps.LatLngBounds(new google.maps.LatLng(a.ymin,
a.xmin,true),new google.maps.LatLng(a.ymax,a.xmax,true))},_formatName:function(a){var b=[];dojo.forEach(a.split("."),function(c){b.push((c.substr(0,1).toUpperCase()+c.substring(1)).replace("_"," "))});return b.join(" ")},_createLayerInfos:function(){var a,b=this._featureTypeNames,c=this._overlayLayerNames,d=[];dojo.forEach(c,function(h,l){a={defaultVisibility:false,id:l,name:h.name||h.key,parentLayerId:-1};if(h.minZoom)a.minScale=this.tileInfo.lods[h.minZoom].scale*1.5;if(h.maxZoom)a.maxScale=this.tileInfo.lods[h.maxZoom].scale*
0.75;d.push(a)},this);for(var e,f,g=0,m=b.length;g<m;g++){var i=b[g],j=g+c.length;a={defaultVisibility:true,name:i.name||i.key,id:j,parentLayerId:-1};if(e==null)e=a;else{var k=name.lastIndexOf(".");if(k!=-1){if(name.substring(0,k)!=e.name)e=f;a.parentLayerId=e.id;e.subLayerIds=e.subLayerIds||[];e.subLayerIds.push(j)}else e=a}f=a;if(i.minZoom)a.minScale=this.tileInfo.lods[i.minZoom].scale*1.5;if(i.maxZoom)a.maxScale=this.tileInfo.lods[i.maxZoom].scale*0.75;d.push(a)}console.log(dojo.toJson(d,true));
return d}});dojo.mixin(agsjs.layers.GoogleMapsLayer,{MAP_TYPE_SATELLITE:"satellite",MAP_TYPE_HYBRID:"hybrid",MAP_TYPE_ROADMAP:"roadmap",MAP_TYPE_TERRAIN:"terrain"});
}};});