(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/ksp-cropper/components/ksp-cropper/ksp-cropper"],{"4cf8":function(t,e,i){"use strict";var a=i("b59d"),h=i.n(a);h.a},"74fe":function(t,e,i){"use strict";i.r(e);var a=i("8f38"),h=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=h.a},"85f2":function(t,e,i){"use strict";i.r(e);var a=i("b9ae"),h=i("74fe");for(var r in h)"default"!==r&&function(t){i.d(e,t,(function(){return h[t]}))}(r);i("4cf8");var n,s=i("f0c5"),o=i("aab8"),f=Object(s["a"])(h["default"],a["b"],a["c"],!1,null,"71206e99",null,!1,a["a"],n);"function"===typeof o["a"]&&Object(o["a"])(f),e["default"]=f.exports},"8f38":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=h(i("a34a"));function h(t){return t&&t.__esModule?t:{default:t}}function r(t,e,i,a,h,r,n){try{var s=t[r](n),o=s.value}catch(f){return void i(f)}s.done?e(o):Promise.resolve(o).then(a,h)}function n(t){return function(){var e=this,i=arguments;return new Promise((function(a,h){var n=t.apply(e,i);function s(t){r(n,a,h,s,o,"next",t)}function o(t){r(n,a,h,s,o,"throw",t)}s(void 0)}))}}var s={props:{mode:{type:String,default:"free"},url:{type:String,default:""},width:{type:Number,default:200},height:{type:Number,default:200},maxWidth:{type:Number,default:1024},maxHeight:{type:Number,default:1024}},data:function(){return{canvasId:Math.random().toString(36).slice(-6),real:{width:100,height:100},target:{width:100,height:100},body:{width:100,height:100},frame:{left:50,top:50,width:200,height:300},image:{left:20,top:20,width:300,height:400},rotate:0,transit:!1,modeValue:""}},methods:{imageLoad:function(e){var i=this;this.real.width=e.detail.width,this.real.height=e.detail.height,this.target={};var a=t.createSelectorQuery().in(this);a.select(".body").boundingClientRect((function(t){i.body.width=t.width,i.body.height=t.height,i.init()})).exec()},init:function(){this.modeValue=this.mode,this.rotate=0;var t=this.width/this.height,e=.7*this.body.width,i=.7*this.body.height;e/i>t?e=i*t:i=e/t;var a=(this.body.width-e)/2,h=(this.body.height-i)/2;this.frame={left:a,top:h,width:e,height:i},t=this.real.width/this.real.height,e=this.frame.width,i=this.frame.height,e/i>t?i=e/t:e=i*t,a=(this.frame.width-e)/2+this.frame.left,h=(this.frame.height-i)/2+this.frame.top,this.image={left:a,top:h,width:e,height:i}},updateData:function(t){var e=this;return n(a.default.mark((function i(){return a.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return e.frame=t.frame,e.image=t.image,i.next=4,e.$nextTick();case 4:e.trimImage();case 5:case"end":return i.stop()}}),i)})))()},trimImage:function(){var t=this,e=this.frame.width/this.frame.height,i=.7*this.body.width,a=.7*this.body.height;i/a>e?i=a*e:a=i/e;var h=(this.body.width-i)/2,r=(this.body.height-a)/2,n=i/this.frame.width,s=this.frame.left-this.image.left,o=this.frame.top-this.image.top;this.frame={left:h,top:r,width:i,height:a},i=this.image.width*n,a=this.image.height*n,h=this.frame.left-s*n,r=this.frame.top-o*n,this.image={left:h,top:r,width:i,height:a},1!=n&&(this.transit=!0,setTimeout((function(){t.transit=!1}),300))},rotateAngle:function(){var t=this;this.rotate-=90;var e=this.image.height,i=this.image.width,a=this.image.left,h=this.image.top,r=e/i;e<this.frame.width&&(e=this.frame.width,i=e/r),i<this.frame.height&&(i=this.frame.height,e=i*r),a>this.frame.left&&(a=this.frame.left),h>this.frame.top&&(h=this.frame.top),a+e<this.frame.left+this.frame.width&&(a=this.frame.left+this.frame.width-e),h+i<this.frame.top+this.frame.height&&(h=this.frame.top+this.frame.height-i),this.image={left:a,top:h,width:e,height:i},this.transit=!0,setTimeout((function(){t.transit=!1}),300)},onok:function(){this.cropWx()},oncancle:function(){this.$emit("cancel")},cropWx:function(){var e=this;return n(a.default.mark((function i(){var h,r,n,s;return a.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return h=e.computeMatrix(),e.target={width:h.tw,height:h.th},i.next=4,new Promise((function(i){t.createSelectorQuery().in(e).select(".canvas").fields({node:!0}).exec((function(t){var e=t[0].node;i(e)}))}));case 4:return r=i.sent,r.width=h.tw,r.height=h.th,t.showLoading({title:"处理中"}),i.next=10,new Promise((function(t){setTimeout(t,200)}));case 10:return n=r.getContext("2d"),s=r.createImage(),i.next=14,new Promise((function(t,i){s.onload=t,s.onerror=i,s.src=e.url}));case 14:n.save(),n.rotate(e.rotate*Math.PI/180),n.drawImage(s,h.sx,h.sy,h.sw,h.sh,h.dx,h.dy,h.dw,h.dh),n.restore(),wx.canvasToTempFilePath({canvas:r,destWidth:h.tw,destHeight:h.th,success:function(t){var i=t.tempFilePath;e.$emit("ok",{path:i})},complete:function(){t.hideLoading()}});case 19:case"end":return i.stop()}}),i)})))()},cropAppH5:function(){var e=this;return n(a.default.mark((function i(){var h,r;return a.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return h=e.computeMatrix(),e.target={width:h.tw,height:h.th},t.showLoading({title:"处理中"}),i.next=5,new Promise((function(t){setTimeout(t,200)}));case 5:return r=t.createCanvasContext(e.canvasId,e),r.save(),r.rotate(e.rotate*Math.PI/180),r.drawImage(e.url,h.sx,h.sy,h.sw,h.sh,h.dx,h.dy,h.dw,h.dh),r.restore(),i.next=12,new Promise((function(t){r.draw(!1,t)}));case 12:t.canvasToTempFilePath({canvasId:e.canvasId,destWidth:h.tw,destHeight:h.th,success:function(t){t.tempFilePath},complete:function(){t.hideLoading()}},e);case 13:case"end":return i.stop()}}),i)})))()},computeMatrix:function(){var t=this.width,e=this.height,i=this.image.width/this.real.width;this.rotate%180!=0&&(i=this.image.height/this.real.width),"fixed"!=this.mode&&(t=this.frame.width/i,e=this.frame.height/i);var a=t/e;t>this.maxWidth&&(t=this.maxWidth,e=t/a),e>this.maxHeight&&(e=this.maxHeight,t=e*a);var h=(this.frame.left-this.image.left)/i,r=(this.frame.top-this.image.top)/i,n=this.frame.width/i,s=this.frame.height/i,o=h+n/2,f=r+s/2;if(this.rotate%180!=0){var d=n;n=s,s=d}var c=this.rotate%360;if(c<0&&(c+=360),270==c){var u=this.real.width-f,m=o;o=u,f=m}if(180==c){u=this.real.width-o,m=this.real.height-f;o=u,f=m}if(90==c){u=f,m=this.real.height-o;o=u,f=m}h=o-n/2,r=f-s/2;var l={x:0,y:0,w:t,h:e};return l=this.parseRect(l,-this.rotate),{tw:t,th:e,sx:h,sy:r,sw:n,sh:s,dx:l.x,dy:l.y,dw:l.w,dh:l.h}},parsePoint:function(t,e){var i={};return i.x=t.x*Math.cos(e*Math.PI/180)-t.y*Math.sin(e*Math.PI/180),i.y=t.y*Math.cos(e*Math.PI/180)+t.x*Math.sin(e*Math.PI/180),i},parseRect:function(t,e){var i=t.x,a=t.y,h=t.x+t.w,r=t.y+t.h,n=this.parsePoint({x:i,y:a},e),s=this.parsePoint({x:h,y:r},e),o={};return o.x=Math.min(n.x,s.x),o.y=Math.min(n.y,s.y),o.w=Math.abs(s.x-n.x),o.h=Math.abs(s.y-n.y),o},parseBlob:function(t){for(var e=t.split(","),i=e[0].match(/:(.*?);/)[1],a=atob(e[1]),h=a.length,r=new Uint8Array(h),n=0;n<h;n++)r[n]=a.charCodeAt(n);var s=URL||webkitURL;return s.createObjectURL(new Blob([r],{type:i}))}}};e.default=s}).call(this,i("543d")["default"])},aab8:function(t,e,i){"use strict";var a=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[]),t.options.wxsCallMethods.push("updateData")};e["a"]=a},b59d:function(t,e,i){},b9ae:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return h})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var h=function(){var t=this,e=t.$createElement;t._self._c},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/ksp-cropper/components/ksp-cropper/ksp-cropper-create-component',
    {
        'uni_modules/ksp-cropper/components/ksp-cropper/ksp-cropper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("85f2"))
        })
    },
    [['uni_modules/ksp-cropper/components/ksp-cropper/ksp-cropper-create-component']]
]);
