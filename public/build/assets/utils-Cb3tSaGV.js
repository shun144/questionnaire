import{b as Gt}from"./app-BQAl0iGL.js";/*! @license DOMPurify 3.2.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.0/LICENSE */const{entries:pt,setPrototypeOf:at,isFrozen:Wt,getPrototypeOf:Bt,getOwnPropertyDescriptor:Yt}=Object;let{freeze:A,seal:L,create:dt}=Object,{apply:Me,construct:Ce}=typeof Reflect<"u"&&Reflect;A||(A=function(n){return n});L||(L=function(n){return n});Me||(Me=function(n,l,s){return n.apply(l,s)});Ce||(Ce=function(n,l){return new n(...l)});const se=R(Array.prototype.forEach),rt=R(Array.prototype.pop),V=R(Array.prototype.push),ce=R(String.prototype.toLowerCase),ye=R(String.prototype.toString),st=R(String.prototype.match),$=R(String.prototype.replace),Xt=R(String.prototype.indexOf),jt=R(String.prototype.trim),O=R(Object.prototype.hasOwnProperty),h=R(RegExp.prototype.test),q=Vt(TypeError);function R(a){return function(n){for(var l=arguments.length,s=new Array(l>1?l-1:0),T=1;T<l;T++)s[T-1]=arguments[T];return Me(a,n,s)}}function Vt(a){return function(){for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return Ce(a,l)}}function r(a,n){let l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ce;at&&at(a,null);let s=n.length;for(;s--;){let T=n[s];if(typeof T=="string"){const b=l(T);b!==T&&(Wt(n)||(n[s]=b),T=b)}a[T]=!0}return a}function $t(a){for(let n=0;n<a.length;n++)O(a,n)||(a[n]=null);return a}function w(a){const n=dt(null);for(const[l,s]of pt(a))O(a,l)&&(Array.isArray(s)?n[l]=$t(s):s&&typeof s=="object"&&s.constructor===Object?n[l]=w(s):n[l]=s);return n}function K(a,n){for(;a!==null;){const s=Yt(a,n);if(s){if(s.get)return R(s.get);if(typeof s.value=="function")return R(s.value)}a=Bt(a)}function l(){return null}return l}const lt=A(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ne=A(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),De=A(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),qt=A(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),be=A(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Kt=A(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ct=A(["#text"]),ft=A(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ie=A(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ut=A(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),le=A(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Zt=L(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Jt=L(/<%[\w\W]*|[\w\W]*%>/gm),Qt=L(/\${[\w\W]*}/gm),en=L(/^data-[\-\w.\u00B7-\uFFFF]/),tn=L(/^aria-[\-\w]+$/),Tt=L(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),nn=L(/^(?:\w+script|data):/i),on=L(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_t=L(/^html$/i),an=L(/^[a-z][.\w]*(-[.\w]+)+$/i);var mt=Object.freeze({__proto__:null,ARIA_ATTR:tn,ATTR_WHITESPACE:on,CUSTOM_ELEMENT:an,DATA_ATTR:en,DOCTYPE_NAME:_t,ERB_EXPR:Jt,IS_ALLOWED_URI:Tt,IS_SCRIPT_OR_DATA:nn,MUSTACHE_EXPR:Zt,TMPLIT_EXPR:Qt});const Z={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},rn=function(){return typeof window>"u"?null:window},sn=function(n,l){if(typeof n!="object"||typeof n.createPolicy!="function")return null;let s=null;const T="data-tt-policy-suffix";l&&l.hasAttribute(T)&&(s=l.getAttribute(T));const b="dompurify"+(s?"#"+s:"");try{return n.createPolicy(b,{createHTML(x){return x},createScriptURL(x){return x}})}catch{return console.warn("TrustedTypes policy "+b+" could not be created."),null}};function Et(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:rn();const n=i=>Et(i);if(n.version="3.2.0",n.removed=[],!a||!a.document||a.document.nodeType!==Z.document)return n.isSupported=!1,n;let{document:l}=a;const s=l,T=s.currentScript,{DocumentFragment:b,HTMLTemplateElement:x,Node:fe,Element:we,NodeFilter:z,NamedNodeMap:gt=a.NamedNodeMap||a.MozNamedAttrMap,HTMLFormElement:ht,DOMParser:At,trustedTypes:J}=a,G=we.prototype,St=K(G,"cloneNode"),Rt=K(G,"remove"),Lt=K(G,"nextSibling"),Ot=K(G,"childNodes"),Q=K(G,"parentNode");if(typeof x=="function"){const i=l.createElement("template");i.content&&i.content.ownerDocument&&(l=i.content.ownerDocument)}let E,W="";const{implementation:ue,createNodeIterator:yt,createDocumentFragment:Nt,getElementsByTagName:Dt}=l,{importNode:bt}=s;let y={};n.isSupported=typeof pt=="function"&&typeof Q=="function"&&ue&&ue.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:me,ERB_EXPR:pe,TMPLIT_EXPR:de,DATA_ATTR:It,ARIA_ATTR:Mt,IS_SCRIPT_OR_DATA:Ct,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:wt}=mt;let{IS_ALLOWED_URI:Pe}=mt,u=null;const ve=r({},[...lt,...Ne,...De,...be,...ct]);let m=null;const ke=r({},[...ft,...Ie,...ut,...le]);let f=Object.seal(dt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),B=null,Te=null,Ue=!0,_e=!0,Fe=!1,He=!0,P=!1,Ee=!0,C=!1,ge=!1,he=!1,v=!1,ee=!1,te=!1,ze=!0,Ge=!1;const xt="user-content-";let Ae=!0,Y=!1,k={},U=null;const We=r({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Be=null;const Ye=r({},["audio","video","img","source","image","track"]);let Se=null;const Xe=r({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ne="http://www.w3.org/1998/Math/MathML",oe="http://www.w3.org/2000/svg",I="http://www.w3.org/1999/xhtml";let F=I,Re=!1,Le=null;const Pt=r({},[ne,oe,I],ye);let ie=r({},["mi","mo","mn","ms","mtext"]),ae=r({},["annotation-xml"]);const vt=r({},["title","style","font","a","script"]);let X=null;const kt=["application/xhtml+xml","text/html"],Ut="text/html";let p=null,H=null;const Ft=l.createElement("form"),je=function(e){return e instanceof RegExp||e instanceof Function},Oe=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(H&&H===e)){if((!e||typeof e!="object")&&(e={}),e=w(e),X=kt.indexOf(e.PARSER_MEDIA_TYPE)===-1?Ut:e.PARSER_MEDIA_TYPE,p=X==="application/xhtml+xml"?ye:ce,u=O(e,"ALLOWED_TAGS")?r({},e.ALLOWED_TAGS,p):ve,m=O(e,"ALLOWED_ATTR")?r({},e.ALLOWED_ATTR,p):ke,Le=O(e,"ALLOWED_NAMESPACES")?r({},e.ALLOWED_NAMESPACES,ye):Pt,Se=O(e,"ADD_URI_SAFE_ATTR")?r(w(Xe),e.ADD_URI_SAFE_ATTR,p):Xe,Be=O(e,"ADD_DATA_URI_TAGS")?r(w(Ye),e.ADD_DATA_URI_TAGS,p):Ye,U=O(e,"FORBID_CONTENTS")?r({},e.FORBID_CONTENTS,p):We,B=O(e,"FORBID_TAGS")?r({},e.FORBID_TAGS,p):{},Te=O(e,"FORBID_ATTR")?r({},e.FORBID_ATTR,p):{},k=O(e,"USE_PROFILES")?e.USE_PROFILES:!1,Ue=e.ALLOW_ARIA_ATTR!==!1,_e=e.ALLOW_DATA_ATTR!==!1,Fe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,He=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,P=e.SAFE_FOR_TEMPLATES||!1,Ee=e.SAFE_FOR_XML!==!1,C=e.WHOLE_DOCUMENT||!1,v=e.RETURN_DOM||!1,ee=e.RETURN_DOM_FRAGMENT||!1,te=e.RETURN_TRUSTED_TYPE||!1,he=e.FORCE_BODY||!1,ze=e.SANITIZE_DOM!==!1,Ge=e.SANITIZE_NAMED_PROPS||!1,Ae=e.KEEP_CONTENT!==!1,Y=e.IN_PLACE||!1,Pe=e.ALLOWED_URI_REGEXP||Tt,F=e.NAMESPACE||I,ie=e.MATHML_TEXT_INTEGRATION_POINTS||ie,ae=e.HTML_INTEGRATION_POINTS||ae,f=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&je(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(f.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&je(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(f.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(f.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),P&&(_e=!1),ee&&(v=!0),k&&(u=r({},ct),m=[],k.html===!0&&(r(u,lt),r(m,ft)),k.svg===!0&&(r(u,Ne),r(m,Ie),r(m,le)),k.svgFilters===!0&&(r(u,De),r(m,Ie),r(m,le)),k.mathMl===!0&&(r(u,be),r(m,ut),r(m,le))),e.ADD_TAGS&&(u===ve&&(u=w(u)),r(u,e.ADD_TAGS,p)),e.ADD_ATTR&&(m===ke&&(m=w(m)),r(m,e.ADD_ATTR,p)),e.ADD_URI_SAFE_ATTR&&r(Se,e.ADD_URI_SAFE_ATTR,p),e.FORBID_CONTENTS&&(U===We&&(U=w(U)),r(U,e.FORBID_CONTENTS,p)),Ae&&(u["#text"]=!0),C&&r(u,["html","head","body"]),u.table&&(r(u,["tbody"]),delete B.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw q('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw q('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=e.TRUSTED_TYPES_POLICY,W=E.createHTML("")}else E===void 0&&(E=sn(J,T)),E!==null&&typeof W=="string"&&(W=E.createHTML(""));A&&A(e),H=e}},Ve=r({},[...Ne,...De,...qt]),$e=r({},[...be,...Kt]),Ht=function(e){let t=Q(e);(!t||!t.tagName)&&(t={namespaceURI:F,tagName:"template"});const o=ce(e.tagName),c=ce(t.tagName);return Le[e.namespaceURI]?e.namespaceURI===oe?t.namespaceURI===I?o==="svg":t.namespaceURI===ne?o==="svg"&&(c==="annotation-xml"||ie[c]):!!Ve[o]:e.namespaceURI===ne?t.namespaceURI===I?o==="math":t.namespaceURI===oe?o==="math"&&ae[c]:!!$e[o]:e.namespaceURI===I?t.namespaceURI===oe&&!ae[c]||t.namespaceURI===ne&&!ie[c]?!1:!$e[o]&&(vt[o]||!Ve[o]):!!(X==="application/xhtml+xml"&&Le[e.namespaceURI]):!1},N=function(e){V(n.removed,{element:e});try{Q(e).removeChild(e)}catch{Rt(e)}},re=function(e,t){try{V(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{V(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!m[e])if(v||ee)try{N(t)}catch{}else try{t.setAttribute(e,"")}catch{}},qe=function(e){let t=null,o=null;if(he)e="<remove></remove>"+e;else{const d=st(e,/^[\r\n\t ]+/);o=d&&d[0]}X==="application/xhtml+xml"&&F===I&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const c=E?E.createHTML(e):e;if(F===I)try{t=new At().parseFromString(c,X)}catch{}if(!t||!t.documentElement){t=ue.createDocument(F,"template",null);try{t.documentElement.innerHTML=Re?W:c}catch{}}const _=t.body||t.documentElement;return e&&o&&_.insertBefore(l.createTextNode(o),_.childNodes[0]||null),F===I?Dt.call(t,C?"html":"body")[0]:C?t.documentElement:_},Ke=function(e){return yt.call(e.ownerDocument||e,e,z.SHOW_ELEMENT|z.SHOW_COMMENT|z.SHOW_TEXT|z.SHOW_PROCESSING_INSTRUCTION|z.SHOW_CDATA_SECTION,null)},Ze=function(e){return e instanceof ht&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof gt)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},Je=function(e){return typeof fe=="function"&&e instanceof fe};function M(i,e,t){y[i]&&se(y[i],o=>{o.call(n,e,t,H)})}const Qe=function(e){let t=null;if(M("beforeSanitizeElements",e,null),Ze(e))return N(e),!0;const o=p(e.nodeName);if(M("uponSanitizeElement",e,{tagName:o,allowedTags:u}),e.hasChildNodes()&&!Je(e.firstElementChild)&&h(/<[/\w]/g,e.innerHTML)&&h(/<[/\w]/g,e.textContent)||e.nodeType===Z.progressingInstruction||Ee&&e.nodeType===Z.comment&&h(/<[/\w]/g,e.data))return N(e),!0;if(!u[o]||B[o]){if(!B[o]&&tt(o)&&(f.tagNameCheck instanceof RegExp&&h(f.tagNameCheck,o)||f.tagNameCheck instanceof Function&&f.tagNameCheck(o)))return!1;if(Ae&&!U[o]){const c=Q(e)||e.parentNode,_=Ot(e)||e.childNodes;if(_&&c){const d=_.length;for(let S=d-1;S>=0;--S){const D=St(_[S],!0);D.__removalCount=(e.__removalCount||0)+1,c.insertBefore(D,Lt(e))}}}return N(e),!0}return e instanceof we&&!Ht(e)||(o==="noscript"||o==="noembed"||o==="noframes")&&h(/<\/no(script|embed|frames)/i,e.innerHTML)?(N(e),!0):(P&&e.nodeType===Z.text&&(t=e.textContent,se([me,pe,de],c=>{t=$(t,c," ")}),e.textContent!==t&&(V(n.removed,{element:e.cloneNode()}),e.textContent=t)),M("afterSanitizeElements",e,null),!1)},et=function(e,t,o){if(ze&&(t==="id"||t==="name")&&(o in l||o in Ft))return!1;if(!(_e&&!Te[t]&&h(It,t))){if(!(Ue&&h(Mt,t))){if(!m[t]||Te[t]){if(!(tt(e)&&(f.tagNameCheck instanceof RegExp&&h(f.tagNameCheck,e)||f.tagNameCheck instanceof Function&&f.tagNameCheck(e))&&(f.attributeNameCheck instanceof RegExp&&h(f.attributeNameCheck,t)||f.attributeNameCheck instanceof Function&&f.attributeNameCheck(t))||t==="is"&&f.allowCustomizedBuiltInElements&&(f.tagNameCheck instanceof RegExp&&h(f.tagNameCheck,o)||f.tagNameCheck instanceof Function&&f.tagNameCheck(o))))return!1}else if(!Se[t]){if(!h(Pe,$(o,xe,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&Xt(o,"data:")===0&&Be[e])){if(!(Fe&&!h(Ct,$(o,xe,"")))){if(o)return!1}}}}}}return!0},tt=function(e){return e!=="annotation-xml"&&st(e,wt)},nt=function(e){M("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const o={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:m,forceKeepAttr:void 0};let c=t.length;for(;c--;){const _=t[c],{name:d,namespaceURI:S,value:D}=_,j=p(d);let g=d==="value"?D:jt(D);if(o.attrName=j,o.attrValue=g,o.keepAttr=!0,o.forceKeepAttr=void 0,M("uponSanitizeAttribute",e,o),g=o.attrValue,Ge&&(j==="id"||j==="name")&&(re(d,e),g=xt+g),Ee&&h(/((--!?|])>)|<\/(style|title)/i,g)){re(d,e);continue}if(o.forceKeepAttr||(re(d,e),!o.keepAttr))continue;if(!He&&h(/\/>/i,g)){re(d,e);continue}P&&se([me,pe,de],it=>{g=$(g,it," ")});const ot=p(e.nodeName);if(et(ot,j,g)){if(E&&typeof J=="object"&&typeof J.getAttributeType=="function"&&!S)switch(J.getAttributeType(ot,j)){case"TrustedHTML":{g=E.createHTML(g);break}case"TrustedScriptURL":{g=E.createScriptURL(g);break}}try{S?e.setAttributeNS(S,d,g):e.setAttribute(d,g),Ze(e)?N(e):rt(n.removed)}catch{}}}M("afterSanitizeAttributes",e,null)},zt=function i(e){let t=null;const o=Ke(e);for(M("beforeSanitizeShadowDOM",e,null);t=o.nextNode();)M("uponSanitizeShadowNode",t,null),!Qe(t)&&(t.content instanceof b&&i(t.content),nt(t));M("afterSanitizeShadowDOM",e,null)};return n.sanitize=function(i){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,o=null,c=null,_=null;if(Re=!i,Re&&(i="<!-->"),typeof i!="string"&&!Je(i))if(typeof i.toString=="function"){if(i=i.toString(),typeof i!="string")throw q("dirty is not a string, aborting")}else throw q("toString is not a function");if(!n.isSupported)return i;if(ge||Oe(e),n.removed=[],typeof i=="string"&&(Y=!1),Y){if(i.nodeName){const D=p(i.nodeName);if(!u[D]||B[D])throw q("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof fe)t=qe("<!---->"),o=t.ownerDocument.importNode(i,!0),o.nodeType===Z.element&&o.nodeName==="BODY"||o.nodeName==="HTML"?t=o:t.appendChild(o);else{if(!v&&!P&&!C&&i.indexOf("<")===-1)return E&&te?E.createHTML(i):i;if(t=qe(i),!t)return v?null:te?W:""}t&&he&&N(t.firstChild);const d=Ke(Y?i:t);for(;c=d.nextNode();)Qe(c)||(c.content instanceof b&&zt(c.content),nt(c));if(Y)return i;if(v){if(ee)for(_=Nt.call(t.ownerDocument);t.firstChild;)_.appendChild(t.firstChild);else _=t;return(m.shadowroot||m.shadowrootmode)&&(_=bt.call(s,_,!0)),_}let S=C?t.outerHTML:t.innerHTML;return C&&u["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&h(_t,t.ownerDocument.doctype.name)&&(S="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+S),P&&se([me,pe,de],D=>{S=$(S,D," ")}),E&&te?E.createHTML(S):S},n.setConfig=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Oe(i),ge=!0},n.clearConfig=function(){H=null,ge=!1},n.isValidAttribute=function(i,e,t){H||Oe({});const o=p(i),c=p(e);return et(o,c,t)},n.addHook=function(i,e){typeof e=="function"&&(y[i]=y[i]||[],V(y[i],e))},n.removeHook=function(i){if(y[i])return rt(y[i])},n.removeHooks=function(i){y[i]&&(y[i]=[])},n.removeAllHooks=function(){y={}},n}var ln=Et();const fn=async(a,n)=>{(async()=>await Gt.post(a,{result:n}))()},un=a=>{const n=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,l=a.replace(n,'<a href="$2" target="_blank" rel="noopener noreferrer" style="text-decoration-line:underline; text-decoration-color:cyan;">$1</a>');return{__html:ln.sanitize(l,{ALLOWED_TAGS:["a"],ALLOWED_ATTR:["href","target","rel","style"]})}};export{fn as c,un as s};