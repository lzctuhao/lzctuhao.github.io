this.workbox=this.workbox||{};this.workbox.expiration=function(e,t,a,s,r,i,n,o,c,m){"use strict";try{self["workbox:expiration:5.1.2"]&&_()}catch(e){}const h="workbox-expiration";const u="cache-entries";const p=e=>{const t=new URL(e,location.href);t.hash="";return t.href};class d{constructor(e){this._cacheName=e;this._db=new i.DBWrapper(h,1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result;const a=t.createObjectStore(u,{keyPath:"id"});a.createIndex("cacheName","cacheName",{unique:false});a.createIndex("timestamp","timestamp",{unique:false});n.deleteDatabase(this._cacheName)}async setTimestamp(e,t){e=p(e);const a={url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(u,a)}async getTimestamp(e){const t=await this._db.get(u,this._getId(e));return t.timestamp}async expireEntries(e,t){const a=await this._db.transaction(u,"readwrite",((a,s)=>{const r=a.objectStore(u);const i=r.index("timestamp").openCursor(null,"prev");const n=[];let o=0;i.onsuccess=()=>{const a=i.result;if(a){const s=a.value;if(s.cacheName===this._cacheName){if(e&&s.timestamp<e||t&&o>=t){n.push(a.value)}else{o++}}a.continue()}else{s(n)}}}));const s=[];for(const e of a){await this._db.delete(u,e.id);s.push(e.url)}return s}_getId(e){return this._cacheName+"|"+p(e)}}class l{constructor(e,a={}){this._isRunning=false;this._rerunRequested=false;{t.assert.isType(e,"string",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"constructor",paramName:"cacheName"});if(!(a.maxEntries||a.maxAgeSeconds)){throw new r.WorkboxError("max-entries-or-age-required",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"constructor"})}if(a.maxEntries){t.assert.isType(a.maxEntries,"number",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"constructor",paramName:"config.maxEntries"})}if(a.maxAgeSeconds){t.assert.isType(a.maxAgeSeconds,"number",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"constructor",paramName:"config.maxAgeSeconds"})}}this._maxEntries=a.maxEntries;this._maxAgeSeconds=a.maxAgeSeconds;this._cacheName=e;this._timestampModel=new d(e)}async expireEntries(){if(this._isRunning){this._rerunRequested=true;return}this._isRunning=true;const e=this._maxAgeSeconds?Date.now()-this._maxAgeSeconds*1e3:0;const t=await this._timestampModel.expireEntries(e,this._maxEntries);const r=await self.caches.open(this._cacheName);for(const e of t){await r.delete(e)}{if(t.length>0){s.logger.groupCollapsed(`Expired ${t.length} `+`${t.length===1?"entry":"entries"} and removed `+`${t.length===1?"it":"them"} from the `+`'${this._cacheName}' cache.`);s.logger.log(`Expired the following ${t.length===1?"URL":"URLs"}:`);t.forEach((e=>s.logger.log(`    ${e}`)));s.logger.groupEnd()}else{s.logger.debug(`Cache expiration ran and found no entries to remove.`)}}this._isRunning=false;if(this._rerunRequested){this._rerunRequested=false;a.dontWaitFor(this.expireEntries())}}async updateTimestamp(e){{t.assert.isType(e,"string",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"updateTimestamp",paramName:"url"})}await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(!this._maxAgeSeconds){{throw new r.WorkboxError(`expired-test-without-max-age`,{methodName:"isURLExpired",paramName:"maxAgeSeconds"})}}else{const t=await this._timestampModel.getTimestamp(e);const a=Date.now()-this._maxAgeSeconds*1e3;return t<a}}async delete(){this._rerunRequested=false;await this._timestampModel.expireEntries(Infinity)}}class x{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:r,cachedResponse:i})=>{if(!i){return null}const n=this._isResponseDateFresh(i);const o=this._getCacheExpiration(r);a.dontWaitFor(o.expireEntries());const m=o.updateTimestamp(t.url);if(e){try{e.waitUntil(m)}catch(t){{if("request"in e){s.logger.warn(`Unable to ensure service worker stays alive when `+`updating cache entry for `+`'${c.getFriendlyURL(e.request.url)}'.`)}}}}return n?i:null};this.cacheDidUpdate=async({cacheName:e,request:a})=>{{t.assert.isType(e,"string",{moduleName:"workbox-expiration",className:"Plugin",funcName:"cacheDidUpdate",paramName:"cacheName"});t.assert.isInstance(a,Request,{moduleName:"workbox-expiration",className:"Plugin",funcName:"cacheDidUpdate",paramName:"request"})}const s=this._getCacheExpiration(e);await s.updateTimestamp(a.url);await s.expireEntries()};{if(!(e.maxEntries||e.maxAgeSeconds)){throw new r.WorkboxError("max-entries-or-age-required",{moduleName:"workbox-expiration",className:"Plugin",funcName:"constructor"})}if(e.maxEntries){t.assert.isType(e.maxEntries,"number",{moduleName:"workbox-expiration",className:"Plugin",funcName:"constructor",paramName:"config.maxEntries"})}if(e.maxAgeSeconds){t.assert.isType(e.maxAgeSeconds,"number",{moduleName:"workbox-expiration",className:"Plugin",funcName:"constructor",paramName:"config.maxAgeSeconds"})}}this._config=e;this._maxAgeSeconds=e.maxAgeSeconds;this._cacheExpirations=new Map;if(e.purgeOnQuotaError){m.registerQuotaErrorCallback((()=>this.deleteCacheAndMetadata()))}}_getCacheExpiration(e){if(e===o.cacheNames.getRuntimeName()){throw new r.WorkboxError("expire-custom-caches-only")}let t=this._cacheExpirations.get(e);if(!t){t=new l(e,this._config);this._cacheExpirations.set(e,t)}return t}_isResponseDateFresh(e){if(!this._maxAgeSeconds){return true}const t=this._getDateHeaderTimestamp(e);if(t===null){return true}const a=Date.now();return t>=a-this._maxAgeSeconds*1e3}_getDateHeaderTimestamp(e){if(!e.headers.has("date")){return null}const t=e.headers.get("date");const a=new Date(t);const s=a.getTime();if(isNaN(s)){return null}return s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations){await self.caches.delete(e);await t.delete()}this._cacheExpirations=new Map}}e.CacheExpiration=l;e.ExpirationPlugin=x;return e}({},workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core);