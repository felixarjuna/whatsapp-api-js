import{ClientMessage,ClientLimitedMessageComponent,Section}from"../types.js";import{isProductSections}from"./globals.js";class Interactive extends ClientMessage{action;body;header;footer;type;get _type(){return"interactive"}constructor(action,body,header,footer){if(super(),action._type!=="product"&&!body)throw new Error("Interactive must have a body component");if(action._type==="product"&&header)throw new Error("Interactive must not have a header component if action is a single product");if(action._type==="product_list"&&header?.type!=="text")throw new Error("Interactive must have a text header component if action is a product list");if(header&&action._type!=="button"&&header?.type!=="text")throw new Error("Interactive header must be of type text");this.type=action._type,this.action=action,body&&(this.body=body),header&&(this.header=header),footer&&(this.footer=footer)}}class Body{text;constructor(text){if(text.length>1024)throw new Error("Body text must be less than 1024 characters");this.text=text}}class Footer{text;constructor(text){if(text.length>60)throw new Error("Footer text must be 60 characters or less");this.text=text}}class Header{type;text;image;document;video;constructor(object){if(typeof object=="string"){if(object.length>60)throw new Error("Header text must be 60 characters or less");this.type="text"}else if(this.type=object._type,object.caption)throw new Error(`Header ${this.type} must not have a caption`);this[this.type]=object}}class ActionButtons extends ClientLimitedMessageComponent{buttons;get _type(){return"button"}constructor(...button){super("Reply buttons","button",button,3);const ids=button.map(b=>b[b.type].id);if(ids.length!==new Set(ids).size)throw new Error("Reply buttons must have unique ids");const titles=button.map(b=>b[b.type].title);if(titles.length!==new Set(titles).size)throw new Error("Reply buttons must have unique titles");this.buttons=button}}class Button{type;reply;constructor(id,title){if(id.length>256)throw new Error("Button id must be 256 characters or less");if(/^ | $/.test(id))throw new Error("Button id cannot have leading or trailing spaces");if(!title.length)throw new Error("Button title cannot be an empty string");if(title.length>20)throw new Error("Button title must be 20 characters or less");this.type="reply",this.reply={title,id}}}class ActionList extends ClientLimitedMessageComponent{button;sections;get _type(){return"list"}constructor(button,...sections){if(super("Action","sections",sections,10),!button.length)throw new Error("Button content cannot be an empty string");if(button.length>20)throw new Error("Button content must be 20 characters or less");if(sections.length>1&&!sections.every(obj=>!!obj.title))throw new Error("All sections must have a title if more than 1 section is provided");this.button=button,this.sections=sections}}class ListSection extends Section{rows;constructor(title,...rows){super("ListSection","rows",rows,10,title),this.rows=rows}}class Row{id;title;description;constructor(id,title,description){if(id.length>200)throw new Error("Row id must be 200 characters or less");if(title.length>24)throw new Error("Row title must be 24 characters or less");if(description&&description.length>72)throw new Error("Row description must be 72 characters or less");this.id=id,this.title=title,description&&(this.description=description)}}class ActionCatalog{name;parameters;get _type(){return"catalog_message"}constructor(thumbnail){this.name="catalog_message",thumbnail&&(this.parameters={thumbnail_product_retailer_id:thumbnail.product_retailer_id})}}class ActionProduct{catalog_id;product_retailer_id;sections;get _type(){return this.product_retailer_id?"product":"product_list"}constructor(catalog_id,...products){const is_sections=isProductSections(products);if(is_sections&&products.length>1){if(products.length>10)throw new Error("Catalog must have between 1 and 10 product sections");for(const obj of products)if(!obj.title)throw new Error("All sections must have a title if more than 1 section is provided")}this.catalog_id=catalog_id,is_sections?this.sections=products:this.product_retailer_id=products[0].product_retailer_id}}class ActionCTA{name="cta_url";parameters;get _type(){return"cta_url"}constructor(display_text,url){this.parameters={display_text,url}}}class ActionFlow{name="flow";parameters;get _type(){return"flow"}constructor(parameters){if(!parameters.flow_cta.length||parameters.flow_cta.length>20)throw new Error("Flow CTA must be between 1 and 20 characters");if(/\p{Extended_Pictographic}/u.test(parameters.flow_cta))throw new Error("Flow CTA must not contain emoji");this.parameters=parameters}}class ActionNavigateFlow extends ActionFlow{constructor(flow_token,flow_id,flow_cta,screen,data,mode="published",flow_message_version="3"){if(super({mode,flow_message_version,flow_token,flow_id,flow_cta,flow_action:"navigate",flow_action_payload:{screen,data}}),data&&!Object.keys(data))throw new Error("Flow data must be a non-empty object if provided")}}class ActionDataExchangeFlow extends ActionFlow{constructor(flow_token,flow_id,flow_cta,mode="published",flow_message_version="3"){super({mode,flow_message_version,flow_token,flow_id,flow_cta,flow_action:"data_exchange"})}}export{ActionButtons,ActionCTA,ActionCatalog,ActionDataExchangeFlow,ActionFlow,ActionList,ActionNavigateFlow,ActionProduct,Body,Button,Footer,Header,Interactive,ListSection,Row};
//# sourceMappingURL=interactive.js.map