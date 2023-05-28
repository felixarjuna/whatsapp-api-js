var a=class{_build(){return JSON.stringify(this)}};var c=class{constructor(r,e,t,s){if(t.length>s)throw new Error(`${r} can't have more than ${s} ${e}`)}},y=class{_build(){return this}},l=class extends y{get _many(){return!0}},d=class extends y{get _many(){return!1}};var u=class extends a{constructor(e,t){super();if(e.length>4096)throw new Error("Text body must be less than 4096 characters");this.body=e,t&&(this.preview_url=t)}get _type(){return"text"}};var m=class extends a{constructor(e,t,s,i){super();this.longitude=e,this.latitude=t,s&&(this.name=s),i&&(this.address=i)}get _type(){return"location"}};var h=class extends a{constructor(e,t=""){super();if(t&&!/^\p{Extended_Pictographic}$/u.test(t))throw new Error("Reaction emoji must be a single emoji");this.message_id=e,this.emoji=t}get _type(){return"reaction"}};var S=class extends a{constructor(...e){super();this.component=[];for(let t of e){let s={};for(let i of t){let o=i._type;if(i._many)o in s||Object.defineProperty(s,o,{value:[]}),s[o].push(i._build());else{if(o in s)throw new Error(`Contact already has a ${o} component and _many is set to false`);s[o]=i._build()}}if(!s.name)throw new Error("Contact must have a name component");this.component.push(s)}}get _type(){return"contacts"}_build(){return JSON.stringify(this.component)}},C=class extends l{constructor(e,t,s,i,o,p,w){super();e&&(this.country=e),t&&(this.country_code=t),s&&(this.state=s),i&&(this.city=i),o&&(this.street=o),p&&(this.zip=p),w&&(this.type=w)}get _type(){return"addresses"}},M=class extends d{constructor(e,t,s){super();if(e.length!==4)throw new Error("Year must be 4 digits");if(t.length!==2)throw new Error("Month must be 2 digits");if(s.length!==2)throw new Error("Day must be 2 digits");this.birthday=`${e}-${t}-${s}`}get _type(){return"birthday"}_build(){return this.birthday}},E=class extends l{constructor(e,t){super();e&&(this.email=e),t&&(this.type=t)}get _type(){return"emails"}},R=class extends d{constructor(e,t,s,i,o,p){super();if(this.formatted_name=e,t&&(this.first_name=t),s&&(this.last_name=s),i&&(this.middle_name=i),o&&(this.suffix=o),p&&(this.prefix=p),Object.keys(this).length<2)throw new Error("Name must have at least one of the following: first_name, last_name, middle_name, prefix, suffix")}get _type(){return"name"}},k=class extends d{constructor(e,t,s){super();e&&(this.company=e),t&&(this.department=t),s&&(this.title=s)}get _type(){return"org"}},T=class extends l{constructor(e,t,s){super();e&&(this.phone=e),t&&(this.type=t),s&&(this.wa_id=s)}get _type(){return"phones"}},B=class extends l{constructor(e,t){super();e&&(this.url=e),t&&(this.type=t)}get _type(){return"urls"}};var A=class extends a{constructor(e,t,s,i){super();if(e._type!=="product"&&!t)throw new Error("Interactive must have a body component");if(e._type==="product"&&s)throw new Error("Interactive must not have a header component if action is a single product");if(e._type==="product_list"&&s?.type!=="text")throw new Error("Interactive must have a text header component if action is a product list");if(s&&e._type!=="button"&&s?.type!=="text")throw new Error("Interactive header must be of type text");this.type=e._type,this.action=e,t&&(this.body=t),s&&(this.header=s),i&&(this.footer=i)}get _type(){return"interactive"}},L=class{constructor(r){if(r.length>1024)throw new Error("Body text must be less than 1024 characters");this.text=r}},P=class{constructor(r){if(r.length>60)throw new Error("Footer text must be 60 characters or less");this.text=r}},O=class{constructor(r){if(typeof r=="string"){if(r.length>60)throw new Error("Header text must be 60 characters or less");this.type="text"}else if(this.type=r._type,"caption"in r)throw new Error(`Header ${this.type} must not have a caption`);this[this.type]=r}},I=class extends c{constructor(...e){super("Reply buttons","button",e,3);let t=e.map(i=>i[i.type].id);if(t.length!==new Set(t).size)throw new Error("Reply buttons must have unique ids");let s=e.map(i=>i[i.type].title);if(s.length!==new Set(s).size)throw new Error("Reply buttons must have unique titles");this.buttons=e}get _type(){return"button"}},D=class{constructor(r,e){if(r.length>256)throw new Error("Button id must be 256 characters or less");if(/^ | $/.test(r))throw new Error("Button id cannot have leading or trailing spaces");if(!e.length)throw new Error("Button title cannot be an empty string");if(e.length>20)throw new Error("Button title must be 20 characters or less");this.type="reply",this.reply={title:e,id:r}}},N=class extends c{constructor(e,...t){super("Action","sections",t,10);if(!e.length)throw new Error("Button content cannot be an empty string");if(e.length>20)throw new Error("Button content must be 20 characters or less");if(t.length>1&&!t.every(s=>"title"in s))throw new Error("All sections must have a title if more than 1 section is provided");this.button=e,this.sections=t}get _type(){return"list"}},f=class extends c{constructor(e,t,s,i,o,p=24){super(e,t,s,i);if(o&&o.length>p)throw new Error(`${e} title must be ${p} characters or less`);o&&(this.title=o)}},$=class extends f{constructor(e,...t){super("ListSection","rows",t,10,e);this.rows=t}},V=class{constructor(r,e,t){if(r.length>200)throw new Error("Row id must be 200 characters or less");if(e.length>24)throw new Error("Row title must be 24 characters or less");if(t&&t.length>72)throw new Error("Row description must be 72 characters or less");this.id=r,this.title=e,t&&(this.description=t)}};function ee(n){return n[0]instanceof x}var q=class{get _type(){return this.product_retailer_id?"product":"product_list"}constructor(r,...e){let t=ee(e);if(t&&e.length>1){if(e.length>10)throw new Error("Catalog must have between 1 and 10 product sections");for(let s of e)if(!("title"in s))throw new Error("All sections must have a title if more than 1 section is provided")}this.catalog_id=r,t?this.sections=e:this.product_retailer_id=e[0].product_retailer_id}},x=class extends f{constructor(e,...t){super("ProductSection","products",t,30,e);this.product_items=t}},Q=class{constructor(r){this.product_retailer_id=r}};var g=class extends a{constructor(e,t=!1){super();this[t?"id":"link"]=e}},j=class extends g{get _type(){return"audio"}constructor(r,e=!1){super(r,e)}},H=class extends g{constructor(e,t=!1,s,i){super(e,t);s&&(this.caption=s),i&&(this.filename=i)}get _type(){return"document"}},U=class extends g{constructor(e,t=!1,s){super(e,t);s&&(this.caption=s)}get _type(){return"image"}},z=class extends g{get _type(){return"sticker"}constructor(r,e=!1){super(r,e)}},F=class extends g{constructor(e,t=!1,s){super(e,t);s&&(this.caption=s)}get _type(){return"video"}};var W=class extends a{constructor(e,t,...s){super();if(this.name=e,this.language=typeof t=="string"?new _(t):t,s.length){let i=s.length===1&&s[0]instanceof b;this.components=s.map(o=>o._build(i)).flat()}}get _type(){return"template"}},_=class{constructor(r,e="deterministic"){this.policy=e,this.code=r}},J=class{get _type(){return"currency"}constructor(r,e,t){if(r<=0)throw new Error("Currency must have an amount_1000 greater than 0");this.amount_1000=r,this.code=e,this.fallback_value=t}},G=class{get _type(){return"date_time"}constructor(r){this.fallback_value=r}},Y=class extends c{constructor(e,...t){super("ButtonComponent","parameters",t,3);let s=e==="url"?"text":"payload",i=t.map(o=>new v(o,s));this.type="button",this.sub_type=e,this.parameters=i}_build(){return this.parameters.map((e,t)=>({type:this.type,sub_type:this.sub_type,index:t.toString(),parameters:[e]}))}},v=class{constructor(r,e){this.type=e,this[e]=r}},K=class{constructor(...r){this.type="header",this.parameters=r}_build(){return this}},X=class{constructor(r){if(typeof r=="string"){if(r.length>60)throw new Error("Header text must be 60 characters or less");this.type="text"}else{if(r._type==="location"&&!(r.name&&r.address))throw new Error("Header location must have a name and address");this.type=r._type}Object.defineProperty(this,this.type,{value:r})}},b=class{constructor(...r){this.type="body",this.parameters=r}_build(r){if(this.parameters&&!r){for(let e of this.parameters)if(e.text&&e.text?.length>1024)throw new Error("Body text must be 1024 characters or less")}return this}},Z=class{constructor(r){if(typeof r=="string"){if(r.length>32768)throw new Error("Body text must be 32768 characters or less");this.type="text"}else this.type=r._type;Object.defineProperty(this,this.type,{value:r})}};export{I as ActionButtons,q as ActionCatalog,N as ActionList,C as Address,j as Audio,M as Birthday,L as Body,b as BodyComponent,Z as BodyParameter,D as Button,Y as ButtonComponent,v as ButtonParameter,S as Contacts,J as Currency,G as DateTime,H as Document,E as Email,P as Footer,O as Header,K as HeaderComponent,X as HeaderParameter,U as Image,A as Interactive,_ as Language,$ as ListSection,m as Location,g as Media,R as Name,k as Organization,T as Phone,Q as Product,x as ProductSection,h as Reaction,V as Row,f as Section,z as Sticker,W as Template,u as Text,B as Url,F as Video};
//# sourceMappingURL=index.js.map