"use strict";var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var template_exports={};__export(template_exports,{BodyComponent:()=>BodyComponent,BodyParameter:()=>BodyParameter,ButtonComponent:()=>ButtonComponent,CarouselCard:()=>CarouselCard,CarouselComponent:()=>CarouselComponent,CatalogComponent:()=>CatalogComponent,CopyComponent:()=>CopyComponent,Currency:()=>Currency,DateTime:()=>DateTime,HeaderComponent:()=>HeaderComponent,HeaderParameter:()=>HeaderParameter,LTOComponent:()=>LTOComponent,Language:()=>Language,MPMComponent:()=>MPMComponent,PayloadComponent:()=>PayloadComponent,SkipButtonComponent:()=>SkipButtonComponent,Template:()=>Template,URLComponent:()=>URLComponent});module.exports=__toCommonJS(template_exports);var import_types=require("../types.js");class Template extends import_types.ClientMessage{name;language;components;get _type(){return"template"}constructor(name,language,...components){if(super(),this.name=name,this.language=typeof language=="string"?new Language(language):language,components.length){const pointers={theres_only_body:components.length===1&&components[0]instanceof BodyComponent,button_counter:0};this.components=components.map(cmpt=>cmpt._build(pointers)).filter(e=>!!e)}}static OTP(name,language,code){return new Template(name,language,new BodyComponent(new BodyParameter(code)),new URLComponent(code))}}class Language{code;policy;constructor(code,policy="deterministic"){this.policy=policy,this.code=code}}class Currency{amount_1000;code;fallback_value;get _type(){return"currency"}constructor(amount_1000,code,fallback_value){if(amount_1000<=0)throw new Error("Currency must have an amount_1000 greater than 0");this.amount_1000=amount_1000,this.code=code,this.fallback_value=fallback_value}}class DateTime{fallback_value;get _type(){return"date_time"}constructor(fallback_value){this.fallback_value=fallback_value}}class ButtonComponent{type="button";sub_type;parameters;index=NaN;constructor(sub_type,parameter){this.sub_type=sub_type,this.parameters=[parameter]}_build(pointers){return this.index=pointers.button_counter++,this}}class URLComponent extends ButtonComponent{constructor(parameter){super("url",new URLComponent.Button(parameter))}static Button=class{type="text";text;constructor(text){if(!text.length)throw new Error("Button parameter can't be an empty string");this.text=text}}}class PayloadComponent extends ButtonComponent{constructor(parameter){super("quick_reply",new PayloadComponent.Button(parameter))}static Button=class{type="payload";payload;constructor(payload){if(!payload.length)throw new Error("Button parameter can't be an empty string");this.payload=payload}}}class CatalogComponent extends ButtonComponent{constructor(thumbnail){super("catalog",new CatalogComponent.Action(thumbnail))}static Action=class{type="action";action;constructor(thumbnail){this.action={thumbnail_product_retailer_id:thumbnail.product_retailer_id}}}}class MPMComponent extends ButtonComponent{constructor(thumbnail,...sections){super("mpm",new MPMComponent.Action(thumbnail,sections))}static Action=class extends import_types.ClientLimitedMessageComponent{type="action";action;constructor(thumbnail,sections){if(super("MPMComponent","sections",sections,10),sections.length>1&&!sections.every(s=>!!s.title))throw new Error("All sections must have a title if more than 1 section is provided");this.action={thumbnail_product_retailer_id:thumbnail.product_retailer_id,sections}}}}class CopyComponent extends ButtonComponent{constructor(parameter){super("copy_code",new CopyComponent.Action(parameter))}static Action=class{type="coupon_code";coupon_code;constructor(coupon_code){if(!coupon_code.length)throw new Error("Action coupon_code can't be an empty string");this.coupon_code=coupon_code}}}class SkipButtonComponent extends ButtonComponent{constructor(){super()}_build(pointers){return pointers.button_counter++,null}}class HeaderComponent{type;parameters;constructor(...parameters){this.type="header",this.parameters=parameters}_build(){return this}}class HeaderParameter{type;text;currency;date_time;image;document;video;location;constructor(parameter){if(typeof parameter=="string"){if(parameter.length>60)throw new Error("Header text must be 60 characters or less");this.type="text"}else{if(parameter._type==="location"&&!(parameter.name&&parameter.address))throw new Error("Header location must have a name and address");this.type=parameter._type}Object.defineProperty(this,this.type,{value:parameter,enumerable:!0})}}class BodyComponent{type;parameters;constructor(...parameters){this.type="body",this.parameters=parameters}_build({theres_only_body}){if(!theres_only_body){for(const param of this.parameters)if(param.text&&param.text?.length>1024)throw new Error("Body text must be 1024 characters or less")}return this}}class BodyParameter{type;text;currency;date_time;constructor(parameter){if(typeof parameter=="string"){if(parameter.length>32768)throw new Error("Body text must be 32768 characters or less");this.type="text"}else this.type=parameter._type;Object.defineProperty(this,this.type,{value:parameter,enumerable:!0})}}class CarouselComponent extends import_types.ClientLimitedMessageComponent{type="carousel";cards;constructor(...cards){super("CarouselComponent","CarouselCard",cards,10);const pointers={counter:0};this.cards=cards.map(cmpt=>cmpt._build(pointers))}_build(){return this}}class CarouselCard{card_index=NaN;components;constructor(header,...components){const tmp=new Template("","",new HeaderComponent(new HeaderParameter(header)),...components);this.components=tmp.components}_build(ptr){return this.card_index=ptr.counter++,this}}class LTOComponent{type="limited_time_offer";parameters;constructor(expiration){if(expiration<0)throw new Error("Expiration time must be a positive Unix timestamp");this.parameters=[{type:"limited_time_offer",limited_time_offer:{expiration_time_ms:expiration}}]}_build(){return this}}0&&(module.exports={BodyComponent,BodyParameter,ButtonComponent,CarouselCard,CarouselComponent,CatalogComponent,CopyComponent,Currency,DateTime,HeaderComponent,HeaderParameter,LTOComponent,Language,MPMComponent,PayloadComponent,SkipButtonComponent,Template,URLComponent});
//# sourceMappingURL=template.js.map