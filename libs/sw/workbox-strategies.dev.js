this.workbox=this.workbox||{};this.workbox.strategies=function(e,t,s,r,o,n,a,i){"use strict";try{self["workbox:strategies:5.1.2"]&&_()}catch(e){}const c={strategyStart:(e,t)=>`Using ${e} to respond to '${n.getFriendlyURL(t.url)}'`,printFinalResponse:e=>{if(e){a.logger.groupCollapsed(`View the final response here.`);a.logger.log(e||"[No response returned]");a.logger.groupEnd()}}};class h{constructor(e={}){this._cacheName=s.cacheNames.getRuntimeName(e.cacheName);this._plugins=e.plugins||[];this._fetchOptions=e.fetchOptions;this._matchOptions=e.matchOptions}async handle({event:e,request:s}){const o=[];if(typeof s==="string"){s=new Request(s)}{t.assert.isInstance(s,Request,{moduleName:"workbox-strategies",className:"CacheFirst",funcName:"makeRequest",paramName:"request"})}let n=await r.cacheWrapper.match({cacheName:this._cacheName,request:s,event:e,matchOptions:this._matchOptions,plugins:this._plugins});let h;if(!n){{o.push(`No response found in the '${this._cacheName}' cache. `+`Will respond with a network request.`)}try{n=await this._getFromNetwork(s,e)}catch(e){h=e}{if(n){o.push(`Got response from network.`)}else{o.push(`Unable to get a response from the network.`)}}}else{{o.push(`Found a cached response in the '${this._cacheName}' cache.`)}}{a.logger.groupCollapsed(c.strategyStart("CacheFirst",s));for(const e of o){a.logger.log(e)}c.printFinalResponse(n);a.logger.groupEnd()}if(!n){throw new i.WorkboxError("no-response",{url:s.url,error:h})}return n}async _getFromNetwork(e,t){const s=await o.fetchWrapper.fetch({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins});const i=s.clone();const c=r.cacheWrapper.put({cacheName:this._cacheName,request:e,response:i,event:t,plugins:this._plugins});if(t){try{t.waitUntil(c)}catch(t){{a.logger.warn(`Unable to ensure service worker stays alive when `+`updating cache for '${n.getFriendlyURL(e.url)}'.`)}}}return s}}class l{constructor(e={}){this._cacheName=s.cacheNames.getRuntimeName(e.cacheName);this._plugins=e.plugins||[];this._matchOptions=e.matchOptions}async handle({event:e,request:s}){if(typeof s==="string"){s=new Request(s)}{t.assert.isInstance(s,Request,{moduleName:"workbox-strategies",className:"CacheOnly",funcName:"makeRequest",paramName:"request"})}const o=await r.cacheWrapper.match({cacheName:this._cacheName,request:s,event:e,matchOptions:this._matchOptions,plugins:this._plugins});{a.logger.groupCollapsed(c.strategyStart("CacheOnly",s));if(o){a.logger.log(`Found a cached response in the '${this._cacheName}'`+` cache.`);c.printFinalResponse(o)}else{a.logger.log(`No response found in the '${this._cacheName}' cache.`)}a.logger.groupEnd()}if(!o){throw new i.WorkboxError("no-response",{url:s.url})}return o}}const p={cacheWillUpdate:async({response:e})=>{if(e.status===200||e.status===0){return e}return null}};class u{constructor(e={}){this._cacheName=s.cacheNames.getRuntimeName(e.cacheName);if(e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[p,...e.plugins]}else{this._plugins=[p]}this._networkTimeoutSeconds=e.networkTimeoutSeconds||0;{if(this._networkTimeoutSeconds){t.assert.isType(this._networkTimeoutSeconds,"number",{moduleName:"workbox-strategies",className:"NetworkFirst",funcName:"constructor",paramName:"networkTimeoutSeconds"})}}this._fetchOptions=e.fetchOptions;this._matchOptions=e.matchOptions}async handle({event:e,request:s}){const r=[];if(typeof s==="string"){s=new Request(s)}{t.assert.isInstance(s,Request,{moduleName:"workbox-strategies",className:"NetworkFirst",funcName:"handle",paramName:"makeRequest"})}const o=[];let n;if(this._networkTimeoutSeconds){const{id:t,promise:a}=this._getTimeoutPromise({request:s,event:e,logs:r});n=t;o.push(a)}const h=this._getNetworkPromise({timeoutId:n,request:s,event:e,logs:r});o.push(h);let l=await Promise.race(o);if(!l){l=await h}{a.logger.groupCollapsed(c.strategyStart("NetworkFirst",s));for(const e of r){a.logger.log(e)}c.printFinalResponse(l);a.logger.groupEnd()}if(!l){throw new i.WorkboxError("no-response",{url:s.url})}return l}_getTimeoutPromise({request:e,logs:t,event:s}){let r;const o=new Promise((o=>{const n=async()=>{{t.push(`Timing out the network response at `+`${this._networkTimeoutSeconds} seconds.`)}o(await this._respondFromCache({request:e,event:s}))};r=setTimeout(n,this._networkTimeoutSeconds*1e3)}));return{promise:o,id:r}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:i}){let c;let h;try{h=await o.fetchWrapper.fetch({request:t,event:i,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){c=e}if(e){clearTimeout(e)}{if(h){s.push(`Got response from network.`)}else{s.push(`Unable to get a response from the network. Will respond `+`with a cached response.`)}}if(c||!h){h=await this._respondFromCache({request:t,event:i});{if(h){s.push(`Found a cached response in the '${this._cacheName}'`+` cache.`)}else{s.push(`No response found in the '${this._cacheName}' cache.`)}}}else{const e=h.clone();const s=r.cacheWrapper.put({cacheName:this._cacheName,request:t,response:e,event:i,plugins:this._plugins});if(i){try{i.waitUntil(s)}catch(e){{a.logger.warn(`Unable to ensure service worker stays alive when `+`updating cache for '${n.getFriendlyURL(t.url)}'.`)}}}}return h}_respondFromCache({event:e,request:t}){return r.cacheWrapper.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}class g{constructor(e={}){this._plugins=e.plugins||[];this._fetchOptions=e.fetchOptions}async handle({event:e,request:s}){if(typeof s==="string"){s=new Request(s)}{t.assert.isInstance(s,Request,{moduleName:"workbox-strategies",className:"NetworkOnly",funcName:"handle",paramName:"request"})}let r;let n;try{n=await o.fetchWrapper.fetch({request:s,event:e,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){r=e}{a.logger.groupCollapsed(c.strategyStart("NetworkOnly",s));if(n){a.logger.log(`Got response from network.`)}else{a.logger.log(`Unable to get a response from the network.`)}c.printFinalResponse(n);a.logger.groupEnd()}if(!n){throw new i.WorkboxError("no-response",{url:s.url,error:r})}return n}}class m{constructor(e={}){this._cacheName=s.cacheNames.getRuntimeName(e.cacheName);this._plugins=e.plugins||[];if(e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[p,...e.plugins]}else{this._plugins=[p]}this._fetchOptions=e.fetchOptions;this._matchOptions=e.matchOptions}async handle({event:e,request:s}){const o=[];if(typeof s==="string"){s=new Request(s)}{t.assert.isInstance(s,Request,{moduleName:"workbox-strategies",className:"StaleWhileRevalidate",funcName:"handle",paramName:"request"})}const h=this._getFromNetwork({request:s,event:e});let l=await r.cacheWrapper.match({cacheName:this._cacheName,request:s,event:e,matchOptions:this._matchOptions,plugins:this._plugins});let p;if(l){{o.push(`Found a cached response in the '${this._cacheName}'`+` cache. Will update with the network response in the background.`)}if(e){try{e.waitUntil(h)}catch(p){{a.logger.warn(`Unable to ensure service worker stays alive when `+`updating cache for '${n.getFriendlyURL(s.url)}'.`)}}}}else{{o.push(`No response found in the '${this._cacheName}' cache. `+`Will wait for the network response.`)}try{l=await h}catch(e){p=e}}{a.logger.groupCollapsed(c.strategyStart("StaleWhileRevalidate",s));for(const e of o){a.logger.log(e)}c.printFinalResponse(l);a.logger.groupEnd()}if(!l){throw new i.WorkboxError("no-response",{url:s.url,error:p})}return l}async _getFromNetwork({request:e,event:t}){const s=await o.fetchWrapper.fetch({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins});const i=r.cacheWrapper.put({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t){try{t.waitUntil(i)}catch(t){{a.logger.warn(`Unable to ensure service worker stays alive when `+`updating cache for '${n.getFriendlyURL(e.url)}'.`)}}}return s}}e.CacheFirst=h;e.CacheOnly=l;e.NetworkFirst=u;e.NetworkOnly=g;e.StaleWhileRevalidate=m;return e}({},workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private);