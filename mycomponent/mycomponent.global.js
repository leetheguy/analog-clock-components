
(function(namespace,resourcesUrl){"use strict";
(function(Context, resourcesUrl){const t={ipad:function(t){return s(t,/iPad/i)},iphone:function(t){return s(t,/iPhone/i)},ios:function(t){return s(t,/iPad|iPhone|iPod/i)},android:function(t){return s(t,/android|sink/i)},phablet:function(t){const n=t.innerWidth,e=t.innerHeight,o=Math.min(n,e),i=Math.max(n,e);return o>390&&o<520&&i>620&&i<800},tablet:function(t){const n=t.innerWidth,e=t.innerHeight,o=Math.min(n,e),i=Math.max(n,e);return o>460&&o<820&&i>780&&i<1400},cordova:r,capacitor:c,electron:function(t){return s(t,/electron/)},pwa:function(t){return t.matchMedia("(display-mode: standalone)").matches||t.navigator.standalone},mobile:o,mobileweb:function(t){return o(t)&&!i(t)},desktop:function(t){return!o(t)},hybrid:i};function n(t,n){return function(t){return e(t)}(t).includes(n)}function e(n){n.Ionic=n.Ionic||{};let e=n.Ionic.platforms;if(null==e){e=n.Ionic.platforms=function(n){return Object.keys(t).filter(e=>t[e](n))}(n);const o=n.document.documentElement.classList;e.forEach(t=>o.add(`plt-${t}`))}return e}function o(t){return function(t,n){return t.matchMedia("(any-pointer:coarse)").matches}(t)}function i(t){return r(t)||c(t)}function r(t){return!!(t.cordova||t.phonegap||t.PhoneGap)}function c(t){const n=t.Capacitor;return!(!n||!n.isNative)}function s(t,n){return n.test(t.navigator.userAgent)}const a=window,u=a.Ionic=a.Ionic||{};Object.defineProperty(u,"queue",{get:()=>Context.queue}),e(a),Context.isPlatform=n;const d=Object.assign({},function(){try{const t=window.sessionStorage.getItem("ionic-persist-config");return null!==t?JSON.parse(t):{}}catch(t){return{}}}(),{persistConfig:!1},u.config,function(){const t={};return window.location.search.slice(1).split("&").map(t=>t.split("=")).map(([t,n])=>[decodeURIComponent(t),decodeURIComponent(n)]).filter(([t])=>(function(n,e){return"ionic:"===t.substr(0,"ionic:".length)})()).map(([t,n])=>[t.slice("ionic:".length),n]).forEach(([n,e])=>{t[n]=e}),t}()),f=u.config=Context.config=new class{constructor(t){this.m=new Map(Object.entries(t))}get(t,n){const e=this.m.get(t);return void 0!==e?e:n}getBoolean(t,n=!1){const e=this.m.get(t);return void 0===e?n:"string"==typeof e?"true"===e:!!e}getNumber(t,n){const e=parseFloat(this.m.get(t));return isNaN(e)?void 0!==n?n:NaN:e}set(t,n){this.m.set(t,n)}}(d);f.getBoolean("persistConfig")&&function(t){try{window.sessionStorage.setItem("ionic-persist-config",JSON.stringify(t))}catch(t){return}}(d);const m=document.documentElement,l=f.get("mode",m.getAttribute("mode")||(n(a,"ios")?"ios":"md"));u.mode=Context.mode=l,f.set("mode",l),m.setAttribute("mode",l),m.classList.add(l),f.getBoolean("_testing")&&f.set("animated",!1);
})(x,r);
})("mycomponent");