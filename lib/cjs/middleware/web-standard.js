"use strict";var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var web_standard_exports={};__export(web_standard_exports,{default:()=>WhatsAppAPI});module.exports=__toCommonJS(web_standard_exports);var import_globals=require("./globals.js"),import_utils=require("../utils.js");class WhatsAppAPI extends import_globals.WhatsAppAPIMiddleware{async handle_post(req){try{const body=await req.text();return this.post(JSON.parse(body||"{}"),body,req.headers.get("x-hub-signature-256")??"")}catch(e){return(0,import_utils.isInteger)(e)?e:500}}handle_get(req){try{return this.get(Object.fromEntries(new URL(req.url).searchParams))}catch(e){throw(0,import_utils.isInteger)(e)?e:500}}}
//# sourceMappingURL=web-standard.js.map