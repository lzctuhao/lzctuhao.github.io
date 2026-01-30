/**
 * 获取浏览器指纹 ID - UMD 通用模块定义格式
 * 
 * 功能特性：
 * 1. 支持多种模块系统：CommonJS、AMD、全局变量、ES6 模块
 * 2. 自动预加载指纹，提升性能
 * 3. 提供带缓存的获取方法，避免重复计算
 * 4. 完善的错误处理机制
 * 
 * 使用方式示例：
 * 
 * 方式一：传统全局变量（兼容现有代码）
 * ```html
 * <script src="/js/modules/MInfo/getFingerprint.js"><\/script>
 * <script>
 *   (async function() {
 *     const visitorId = await MInfo.getFingerprint();
 *     console.log('指纹ID:', visitorId);
 *   })();
 * </script>
 * ```
 * 
 * 方式二：ES6 模块导入（推荐新项目使用）
 * ```html
 * <script type="module">
 *   import getFingerprint from '/js/modules/MInfo/getFingerprint.js';
 *   const visitorId = await getFingerprint();
 *   console.log('ES6模块方式指纹ID:', visitorId);
 * </script>
 * ```
 * 
 * 方式三：动态导入（按需加载）
 * ```html
 * <script type="module">
 *   const { getFingerprint } = await import('/js/modules/MInfo/getFingerprint.js');
 *   const visitorId = await getFingerprint();
 *   console.log('动态导入指纹ID:', visitorId);
 * </script>
 * ```
 * 
 * 方式四：Node.js 环境（CommonJS）
 * ```javascript
 * const { getFingerprint } = require('./getFingerprint.js');
 * // 或使用默认导出
 * const getFingerprint = require('./getFingerprint.js').default;
 * ```
 * 
 * @fileoverview 浏览器指纹识别工具库
 * @version 1.0.0
 * @license MIT
 */
(function(t,e){"use strict";if(typeof define==="function"&&define.amd){define([],e)}else if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else{t.MInfo=t.MInfo||{};const n=e();Object.assign(t.MInfo,n)}})(typeof window!=="undefined"?window:this,(function(){"use strict";async function t(){try{const t=await import("/libs/others/FingerprintJSv5.0.1.js");const e=await t.load();const n=await e.get();const o=n.visitorId;console.log("指纹获取成功:",o);return o}catch(t){console.error("获取指纹时发生错误:",t);throw t}}const e=async function(){try{return await t()}catch(t){console.error("指纹预加载失败:",t);return null}}();e.then((e=>{t.cachedResult=e})).catch((e=>{t.cachedResult=null;console.error("指纹缓存设置失败:",e)}));t.withCache=async function(){if(t.cachedResult!==undefined){return t.cachedResult}return await t()};t.withCallback=function(t){e.then(t).catch((e=>{console.error("获取指纹回调错误:",e);t(null)}))};t.getDetailedResult=async function(){try{const t=await import("/libs/others/FingerprintJSv5.0.1.js");const e=await t.load();return await e.get()}catch(t){console.error("获取详细指纹结果失败:",t);throw t}};return{getFingerprint:t,fingerprintPromise:e,default:t,version:"1.0.0"}}));