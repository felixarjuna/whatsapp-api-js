"use strict";var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var vercel_exports={};__export(vercel_exports,{default:()=>WhatsAppAPI});module.exports=__toCommonJS(vercel_exports);var import_node_http=__toESM(require("./node-http.js"),1),import_utils=require("../utils.js");class WhatsAppAPI extends import_node_http.default{handle_post(req){return super.handle_post(req)}handle_get(req){try{return this.get(req.query)}catch(e){throw(0,import_utils.isInteger)(e)?e:500}}}
//# sourceMappingURL=vercel.js.map