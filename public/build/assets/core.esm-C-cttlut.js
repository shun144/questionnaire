import{r as s,R as P,c as ae}from"./app-D37GFJK7.js";const Fe=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function ue(e){const t=Object.prototype.toString.call(e);return t==="[object Window]"||t==="[object global]"}function tt(e){return"nodeType"in e}function k(e){var t,n;return e?ue(e)?e:tt(e)&&(t=(n=e.ownerDocument)==null?void 0:n.defaultView)!=null?t:window:window}function nt(e){const{Document:t}=k(e);return e instanceof t}function Ce(e){return ue(e)?!1:e instanceof k(e).HTMLElement}function zt(e){return e instanceof k(e).SVGElement}function de(e){return e?ue(e)?e.document:tt(e)?nt(e)?e:Ce(e)||zt(e)?e.ownerDocument:document:document:document}const _=Fe?s.useLayoutEffect:s.useEffect;function rt(e){const t=s.useRef(e);return _(()=>{t.current=e}),s.useCallback(function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t.current==null?void 0:t.current(...r)},[])}function ln(){const e=s.useRef(null),t=s.useCallback((r,o)=>{e.current=setInterval(r,o)},[]),n=s.useCallback(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[]);return[t,n]}function De(e,t){t===void 0&&(t=[e]);const n=s.useRef(e);return _(()=>{n.current!==e&&(n.current=e)},t),n}function Re(e,t){const n=s.useRef();return s.useMemo(()=>{const r=e(n.current);return n.current=r,r},[...t])}function ke(e){const t=rt(e),n=s.useRef(null),r=s.useCallback(o=>{o!==n.current&&(t==null||t(o,n.current)),n.current=o},[]);return[n,r]}function Je(e){const t=s.useRef();return s.useEffect(()=>{t.current=e},[e]),t.current}let Ke={};function Pe(e,t){return s.useMemo(()=>{if(t)return t;const n=Ke[e]==null?0:Ke[e]+1;return Ke[e]=n,e+"-"+n},[e,t])}function Bt(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.reduce((i,l)=>{const a=Object.entries(l);for(const[c,u]of a){const f=i[c];f!=null&&(i[c]=f+e*u)}return i},{...t})}}const ce=Bt(1),Ie=Bt(-1);function an(e){return"clientX"in e&&"clientY"in e}function Ft(e){if(!e)return!1;const{KeyboardEvent:t}=k(e.target);return t&&e instanceof t}function cn(e){if(!e)return!1;const{TouchEvent:t}=k(e.target);return t&&e instanceof t}function Ge(e){if(cn(e)){if(e.touches&&e.touches.length){const{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){const{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return an(e)?{x:e.clientX,y:e.clientY}:null}const St="a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";function un(e){return e.matches(St)?e:e.querySelector(St)}const dn={display:"none"};function fn(e){let{id:t,value:n}=e;return P.createElement("div",{id:t,style:dn},n)}function hn(e){let{id:t,announcement:n,ariaLiveType:r="assertive"}=e;const o={position:"fixed",width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0 0 0 0)",clipPath:"inset(100%)",whiteSpace:"nowrap"};return P.createElement("div",{id:t,style:o,role:"status","aria-live":r,"aria-atomic":!0},n)}function gn(){const[e,t]=s.useState("");return{announce:s.useCallback(r=>{r!=null&&t(r)},[]),announcement:e}}const Pt=s.createContext(null);function vn(e){const t=s.useContext(Pt);s.useEffect(()=>{if(!t)throw new Error("useDndMonitor must be used within a children of <DndContext>");return t(e)},[e,t])}function pn(){const[e]=s.useState(()=>new Set),t=s.useCallback(r=>(e.add(r),()=>e.delete(r)),[e]);return[s.useCallback(r=>{let{type:o,event:i}=r;e.forEach(l=>{var a;return(a=l[o])==null?void 0:a.call(l,i)})},[e]),t]}const bn={draggable:`
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `},wn={onDragStart(e){let{active:t}=e;return"Picked up draggable item "+t.id+"."},onDragOver(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was moved over droppable area "+n.id+".":"Draggable item "+t.id+" is no longer over a droppable area."},onDragEnd(e){let{active:t,over:n}=e;return n?"Draggable item "+t.id+" was dropped over droppable area "+n.id:"Draggable item "+t.id+" was dropped."},onDragCancel(e){let{active:t}=e;return"Dragging was cancelled. Draggable item "+t.id+" was dropped."}};function yn(e){let{announcements:t=wn,container:n,hiddenTextDescribedById:r,screenReaderInstructions:o=bn}=e;const{announce:i,announcement:l}=gn(),a=Pe("DndLiveRegion"),[c,u]=s.useState(!1);if(s.useEffect(()=>{u(!0)},[]),vn(s.useMemo(()=>({onDragStart(d){let{active:v}=d;i(t.onDragStart({active:v}))},onDragMove(d){let{active:v,over:h}=d;t.onDragMove&&i(t.onDragMove({active:v,over:h}))},onDragOver(d){let{active:v,over:h}=d;i(t.onDragOver({active:v,over:h}))},onDragEnd(d){let{active:v,over:h}=d;i(t.onDragEnd({active:v,over:h}))},onDragCancel(d){let{active:v,over:h}=d;i(t.onDragCancel({active:v,over:h}))}}),[i,t])),!c)return null;const f=P.createElement(P.Fragment,null,P.createElement(fn,{id:r,value:o.draggable}),P.createElement(hn,{id:a,announcement:l}));return n?ae.createPortal(f,n):f}var E;(function(e){e.DragStart="dragStart",e.DragMove="dragMove",e.DragEnd="dragEnd",e.DragCancel="dragCancel",e.DragOver="dragOver",e.RegisterDroppable="registerDroppable",e.SetDroppableDisabled="setDroppableDisabled",e.UnregisterDroppable="unregisterDroppable"})(E||(E={}));function ze(){}const j=Object.freeze({x:0,y:0});function mn(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function Dn(e,t){if(!e||e.length===0)return null;const[n]=e;return n[t]}function xn(e,t){const n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.left+t.width,e.left+e.width),i=Math.min(t.top+t.height,e.top+e.height),l=o-r,a=i-n;if(r<o&&n<i){const c=t.width*t.height,u=e.width*e.height,f=l*a,d=f/(c+u-f);return Number(d.toFixed(4))}return 0}const Cn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e;const o=[];for(const i of r){const{id:l}=i,a=n.get(l);if(a){const c=xn(a,t);c>0&&o.push({id:l,data:{droppableContainer:i,value:c}})}}return o.sort(mn)};function Rn(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function $t(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:j}function Sn(e){return function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return o.reduce((l,a)=>({...l,top:l.top+e*a.y,bottom:l.bottom+e*a.y,left:l.left+e*a.x,right:l.right+e*a.x}),{...n})}}const En=Sn(1);function Mn(e){if(e.startsWith("matrix3d(")){const t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith("matrix(")){const t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function An(e,t,n){const r=Mn(t);if(!r)return e;const{scaleX:o,scaleY:i,x:l,y:a}=r,c=e.left-l-(1-o)*parseFloat(n),u=e.top-a-(1-i)*parseFloat(n.slice(n.indexOf(" ")+1)),f=o?e.width/o:e.width,d=i?e.height/i:e.height;return{width:f,height:d,top:u,right:c+f,bottom:u+d,left:c}}const On={ignoreTransform:!1};function Se(e,t){t===void 0&&(t=On);let n=e.getBoundingClientRect();if(t.ignoreTransform){const{transform:u,transformOrigin:f}=k(e).getComputedStyle(e);u&&(n=An(n,u,f))}const{top:r,left:o,width:i,height:l,bottom:a,right:c}=n;return{top:r,left:o,width:i,height:l,bottom:a,right:c}}function Et(e){return Se(e,{ignoreTransform:!0})}function Nn(e){const t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function Tn(e,t){return t===void 0&&(t=k(e).getComputedStyle(e)),t.position==="fixed"}function Ln(e,t){t===void 0&&(t=k(e).getComputedStyle(e));const n=/(auto|scroll|overlay)/;return["overflow","overflowX","overflowY"].some(o=>{const i=t[o];return typeof i=="string"?n.test(i):!1})}function ot(e,t){const n=[];function r(o){if(t!=null&&n.length>=t||!o)return n;if(nt(o)&&o.scrollingElement!=null&&!n.includes(o.scrollingElement))return n.push(o.scrollingElement),n;if(!Ce(o)||zt(o)||n.includes(o))return n;const i=k(e).getComputedStyle(o);return o!==e&&Ln(o,i)&&n.push(o),Tn(o,i)?n:r(o.parentNode)}return e?r(e):n}function Ut(e){const[t]=ot(e,1);return t??null}function He(e){return!Fe||!e?null:ue(e)?e:tt(e)?nt(e)||e===de(e).scrollingElement?window:Ce(e)?e:null:null}function Wt(e){return ue(e)?e.scrollX:e.scrollLeft}function Xt(e){return ue(e)?e.scrollY:e.scrollTop}function Qe(e){return{x:Wt(e),y:Xt(e)}}var O;(function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"})(O||(O={}));function jt(e){return!Fe||!e?!1:e===document.scrollingElement}function Yt(e){const t={x:0,y:0},n=jt(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height},o=e.scrollTop<=t.y,i=e.scrollLeft<=t.x,l=e.scrollTop>=r.y,a=e.scrollLeft>=r.x;return{isTop:o,isLeft:i,isBottom:l,isRight:a,maxScroll:r,minScroll:t}}const kn={x:.2,y:.2};function In(e,t,n,r,o){let{top:i,left:l,right:a,bottom:c}=n;r===void 0&&(r=10),o===void 0&&(o=kn);const{isTop:u,isBottom:f,isLeft:d,isRight:v}=Yt(e),h={x:0,y:0},R={x:0,y:0},g={height:t.height*o.y,width:t.width*o.x};return!u&&i<=t.top+g.height?(h.y=O.Backward,R.y=r*Math.abs((t.top+g.height-i)/g.height)):!f&&c>=t.bottom-g.height&&(h.y=O.Forward,R.y=r*Math.abs((t.bottom-g.height-c)/g.height)),!v&&a>=t.right-g.width?(h.x=O.Forward,R.x=r*Math.abs((t.right-g.width-a)/g.width)):!d&&l<=t.left+g.width&&(h.x=O.Backward,R.x=r*Math.abs((t.left+g.width-l)/g.width)),{direction:h,speed:R}}function zn(e){if(e===document.scrollingElement){const{innerWidth:i,innerHeight:l}=window;return{top:0,left:0,right:i,bottom:l,width:i,height:l}}const{top:t,left:n,right:r,bottom:o}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:o,width:e.clientWidth,height:e.clientHeight}}function Kt(e){return e.reduce((t,n)=>ce(t,Qe(n)),j)}function Bn(e){return e.reduce((t,n)=>t+Wt(n),0)}function Fn(e){return e.reduce((t,n)=>t+Xt(n),0)}function Pn(e,t){if(t===void 0&&(t=Se),!e)return;const{top:n,left:r,bottom:o,right:i}=t(e);Ut(e)&&(o<=0||i<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:"center",inline:"center"})}const $n=[["x",["left","right"],Bn],["y",["top","bottom"],Fn]];class it{constructor(t,n){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;const r=ot(n),o=Kt(r);this.rect={...t},this.width=t.width,this.height=t.height;for(const[i,l,a]of $n)for(const c of l)Object.defineProperty(this,c,{get:()=>{const u=a(r),f=o[i]-u;return this.rect[c]+f},enumerable:!0});Object.defineProperty(this,"rect",{enumerable:!1})}}class we{constructor(t){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(n=>{var r;return(r=this.target)==null?void 0:r.removeEventListener(...n)})},this.target=t}add(t,n,r){var o;(o=this.target)==null||o.addEventListener(t,n,r),this.listeners.push([t,n,r])}}function Un(e){const{EventTarget:t}=k(e);return e instanceof t?e:de(e)}function Ve(e,t){const n=Math.abs(e.x),r=Math.abs(e.y);return typeof t=="number"?Math.sqrt(n**2+r**2)>t:"x"in t&&"y"in t?n>t.x&&r>t.y:"x"in t?n>t.x:"y"in t?r>t.y:!1}var F;(function(e){e.Click="click",e.DragStart="dragstart",e.Keydown="keydown",e.ContextMenu="contextmenu",e.Resize="resize",e.SelectionChange="selectionchange",e.VisibilityChange="visibilitychange"})(F||(F={}));function Mt(e){e.preventDefault()}function Wn(e){e.stopPropagation()}var D;(function(e){e.Space="Space",e.Down="ArrowDown",e.Right="ArrowRight",e.Left="ArrowLeft",e.Up="ArrowUp",e.Esc="Escape",e.Enter="Enter"})(D||(D={}));const Ht={start:[D.Space,D.Enter],cancel:[D.Esc],end:[D.Space,D.Enter]},Xn=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case D.Right:return{...n,x:n.x+25};case D.Left:return{...n,x:n.x-25};case D.Down:return{...n,y:n.y+25};case D.Up:return{...n,y:n.y-25}}};class Vt{constructor(t){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=t;const{event:{target:n}}=t;this.props=t,this.listeners=new we(de(n)),this.windowListeners=new we(k(n)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(F.Resize,this.handleCancel),this.windowListeners.add(F.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(F.Keydown,this.handleKeyDown))}handleStart(){const{activeNode:t,onStart:n}=this.props,r=t.node.current;r&&Pn(r),n(j)}handleKeyDown(t){if(Ft(t)){const{active:n,context:r,options:o}=this.props,{keyboardCodes:i=Ht,coordinateGetter:l=Xn,scrollBehavior:a="smooth"}=o,{code:c}=t;if(i.end.includes(c)){this.handleEnd(t);return}if(i.cancel.includes(c)){this.handleCancel(t);return}const{collisionRect:u}=r.current,f=u?{x:u.left,y:u.top}:j;this.referenceCoordinates||(this.referenceCoordinates=f);const d=l(t,{active:n,context:r.current,currentCoordinates:f});if(d){const v=Ie(d,f),h={x:0,y:0},{scrollableAncestors:R}=r.current;for(const g of R){const p=t.code,{isTop:m,isRight:x,isLeft:w,isBottom:T,maxScroll:C,minScroll:S}=Yt(g),b=zn(g),y={x:Math.min(p===D.Right?b.right-b.width/2:b.right,Math.max(p===D.Right?b.left:b.left+b.width/2,d.x)),y:Math.min(p===D.Down?b.bottom-b.height/2:b.bottom,Math.max(p===D.Down?b.top:b.top+b.height/2,d.y))},M=p===D.Right&&!x||p===D.Left&&!w,L=p===D.Down&&!T||p===D.Up&&!m;if(M&&y.x!==d.x){const A=g.scrollLeft+v.x,K=p===D.Right&&A<=C.x||p===D.Left&&A>=S.x;if(K&&!v.y){g.scrollTo({left:A,behavior:a});return}K?h.x=g.scrollLeft-A:h.x=p===D.Right?g.scrollLeft-C.x:g.scrollLeft-S.x,h.x&&g.scrollBy({left:-h.x,behavior:a});break}else if(L&&y.y!==d.y){const A=g.scrollTop+v.y,K=p===D.Down&&A<=C.y||p===D.Up&&A>=S.y;if(K&&!v.x){g.scrollTo({top:A,behavior:a});return}K?h.y=g.scrollTop-A:h.y=p===D.Down?g.scrollTop-C.y:g.scrollTop-S.y,h.y&&g.scrollBy({top:-h.y,behavior:a});break}}this.handleMove(t,ce(Ie(d,this.referenceCoordinates),h))}}}handleMove(t,n){const{onMove:r}=this.props;t.preventDefault(),r(n)}handleEnd(t){const{onEnd:n}=this.props;t.preventDefault(),this.detach(),n()}handleCancel(t){const{onCancel:n}=this.props;t.preventDefault(),this.detach(),n()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}}Vt.activators=[{eventName:"onKeyDown",handler:(e,t,n)=>{let{keyboardCodes:r=Ht,onActivation:o}=t,{active:i}=n;const{code:l}=e.nativeEvent;if(r.start.includes(l)){const a=i.activatorNode.current;return a&&e.target!==a?!1:(e.preventDefault(),o==null||o({event:e.nativeEvent}),!0)}return!1}}];function At(e){return!!(e&&"distance"in e)}function Ot(e){return!!(e&&"delay"in e)}class st{constructor(t,n,r){var o;r===void 0&&(r=Un(t.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=t,this.events=n;const{event:i}=t,{target:l}=i;this.props=t,this.events=n,this.document=de(l),this.documentListeners=new we(this.document),this.listeners=new we(r),this.windowListeners=new we(k(l)),this.initialCoordinates=(o=Ge(i))!=null?o:j,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){const{events:t,props:{options:{activationConstraint:n,bypassActivationConstraint:r}}}=this;if(this.listeners.add(t.move.name,this.handleMove,{passive:!1}),this.listeners.add(t.end.name,this.handleEnd),this.windowListeners.add(F.Resize,this.handleCancel),this.windowListeners.add(F.DragStart,Mt),this.windowListeners.add(F.VisibilityChange,this.handleCancel),this.windowListeners.add(F.ContextMenu,Mt),this.documentListeners.add(F.Keydown,this.handleKeydown),n){if(r!=null&&r({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(Ot(n)){this.timeoutId=setTimeout(this.handleStart,n.delay);return}if(At(n))return}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handleStart(){const{initialCoordinates:t}=this,{onStart:n}=this.props;t&&(this.activated=!0,this.documentListeners.add(F.Click,Wn,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(F.SelectionChange,this.removeTextSelection),n(t))}handleMove(t){var n;const{activated:r,initialCoordinates:o,props:i}=this,{onMove:l,options:{activationConstraint:a}}=i;if(!o)return;const c=(n=Ge(t))!=null?n:j,u=Ie(o,c);if(!r&&a){if(At(a)){if(a.tolerance!=null&&Ve(u,a.tolerance))return this.handleCancel();if(Ve(u,a.distance))return this.handleStart()}return Ot(a)&&Ve(u,a.tolerance)?this.handleCancel():void 0}t.cancelable&&t.preventDefault(),l(c)}handleEnd(){const{onEnd:t}=this.props;this.detach(),t()}handleCancel(){const{onCancel:t}=this.props;this.detach(),t()}handleKeydown(t){t.code===D.Esc&&this.handleCancel()}removeTextSelection(){var t;(t=this.document.getSelection())==null||t.removeAllRanges()}}const jn={move:{name:"pointermove"},end:{name:"pointerup"}};class _t extends st{constructor(t){const{event:n}=t,r=de(n.target);super(t,jn,r)}}_t.activators=[{eventName:"onPointerDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r==null||r({event:n}),!0)}}];const Yn={move:{name:"mousemove"},end:{name:"mouseup"}};var Ze;(function(e){e[e.RightClick=2]="RightClick"})(Ze||(Ze={}));class Kn extends st{constructor(t){super(t,Yn,de(t.event.target))}}Kn.activators=[{eventName:"onMouseDown",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===Ze.RightClick?!1:(r==null||r({event:n}),!0)}}];const _e={move:{name:"touchmove"},end:{name:"touchend"}};class Hn extends st{constructor(t){super(t,_e)}static setup(){return window.addEventListener(_e.move.name,t,{capture:!1,passive:!1}),function(){window.removeEventListener(_e.move.name,t)};function t(){}}}Hn.activators=[{eventName:"onTouchStart",handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;const{touches:o}=n;return o.length>1?!1:(r==null||r({event:n}),!0)}}];var ye;(function(e){e[e.Pointer=0]="Pointer",e[e.DraggableRect=1]="DraggableRect"})(ye||(ye={}));var Be;(function(e){e[e.TreeOrder=0]="TreeOrder",e[e.ReversedTreeOrder=1]="ReversedTreeOrder"})(Be||(Be={}));function Vn(e){let{acceleration:t,activator:n=ye.Pointer,canScroll:r,draggingRect:o,enabled:i,interval:l=5,order:a=Be.TreeOrder,pointerCoordinates:c,scrollableAncestors:u,scrollableAncestorRects:f,delta:d,threshold:v}=e;const h=qn({delta:d,disabled:!i}),[R,g]=ln(),p=s.useRef({x:0,y:0}),m=s.useRef({x:0,y:0}),x=s.useMemo(()=>{switch(n){case ye.Pointer:return c?{top:c.y,bottom:c.y,left:c.x,right:c.x}:null;case ye.DraggableRect:return o}},[n,o,c]),w=s.useRef(null),T=s.useCallback(()=>{const S=w.current;if(!S)return;const b=p.current.x*m.current.x,y=p.current.y*m.current.y;S.scrollBy(b,y)},[]),C=s.useMemo(()=>a===Be.TreeOrder?[...u].reverse():u,[a,u]);s.useEffect(()=>{if(!i||!u.length||!x){g();return}for(const S of C){if((r==null?void 0:r(S))===!1)continue;const b=u.indexOf(S),y=f[b];if(!y)continue;const{direction:M,speed:L}=In(S,y,x,t,v);for(const A of["x","y"])h[A][M[A]]||(L[A]=0,M[A]=0);if(L.x>0||L.y>0){g(),w.current=S,R(T,l),p.current=L,m.current=M;return}}p.current={x:0,y:0},m.current={x:0,y:0},g()},[t,T,r,g,i,l,JSON.stringify(x),JSON.stringify(h),R,u,C,f,JSON.stringify(v)])}const _n={x:{[O.Backward]:!1,[O.Forward]:!1},y:{[O.Backward]:!1,[O.Forward]:!1}};function qn(e){let{delta:t,disabled:n}=e;const r=Je(t);return Re(o=>{if(n||!r||!o)return _n;const i={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[O.Backward]:o.x[O.Backward]||i.x===-1,[O.Forward]:o.x[O.Forward]||i.x===1},y:{[O.Backward]:o.y[O.Backward]||i.y===-1,[O.Forward]:o.y[O.Forward]||i.y===1}}},[n,t,r])}function Jn(e,t){const n=t!==null?e.get(t):void 0,r=n?n.node.current:null;return Re(o=>{var i;return t===null?null:(i=r??o)!=null?i:null},[r,t])}function Gn(e,t){return s.useMemo(()=>e.reduce((n,r)=>{const{sensor:o}=r,i=o.activators.map(l=>({eventName:l.eventName,handler:t(l.handler,r)}));return[...n,...i]},[]),[e,t])}var xe;(function(e){e[e.Always=0]="Always",e[e.BeforeDragging=1]="BeforeDragging",e[e.WhileDragging=2]="WhileDragging"})(xe||(xe={}));var et;(function(e){e.Optimized="optimized"})(et||(et={}));const Nt=new Map;function Qn(e,t){let{dragging:n,dependencies:r,config:o}=t;const[i,l]=s.useState(null),{frequency:a,measure:c,strategy:u}=o,f=s.useRef(e),d=p(),v=De(d),h=s.useCallback(function(m){m===void 0&&(m=[]),!v.current&&l(x=>x===null?m:x.concat(m.filter(w=>!x.includes(w))))},[v]),R=s.useRef(null),g=Re(m=>{if(d&&!n)return Nt;if(!m||m===Nt||f.current!==e||i!=null){const x=new Map;for(let w of e){if(!w)continue;if(i&&i.length>0&&!i.includes(w.id)&&w.rect.current){x.set(w.id,w.rect.current);continue}const T=w.node.current,C=T?new it(c(T),T):null;w.rect.current=C,C&&x.set(w.id,C)}return x}return m},[e,i,n,d,c]);return s.useEffect(()=>{f.current=e},[e]),s.useEffect(()=>{d||h()},[n,d]),s.useEffect(()=>{i&&i.length>0&&l(null)},[JSON.stringify(i)]),s.useEffect(()=>{d||typeof a!="number"||R.current!==null||(R.current=setTimeout(()=>{h(),R.current=null},a))},[a,d,h,...r]),{droppableRects:g,measureDroppableContainers:h,measuringScheduled:i!=null};function p(){switch(u){case xe.Always:return!1;case xe.BeforeDragging:return n;default:return!n}}}function qt(e,t){return Re(n=>e?n||(typeof t=="function"?t(e):e):null,[t,e])}function Zn(e,t){return qt(e,t)}function er(e){let{callback:t,disabled:n}=e;const r=rt(t),o=s.useMemo(()=>{if(n||typeof window>"u"||typeof window.MutationObserver>"u")return;const{MutationObserver:i}=window;return new i(r)},[r,n]);return s.useEffect(()=>()=>o==null?void 0:o.disconnect(),[o]),o}function $e(e){let{callback:t,disabled:n}=e;const r=rt(t),o=s.useMemo(()=>{if(n||typeof window>"u"||typeof window.ResizeObserver>"u")return;const{ResizeObserver:i}=window;return new i(r)},[n]);return s.useEffect(()=>()=>o==null?void 0:o.disconnect(),[o]),o}function tr(e){return new it(Se(e),e)}function Tt(e,t,n){t===void 0&&(t=tr);const[r,o]=s.useReducer(a,null),i=er({callback(c){if(e)for(const u of c){const{type:f,target:d}=u;if(f==="childList"&&d instanceof HTMLElement&&d.contains(e)){o();break}}}}),l=$e({callback:o});return _(()=>{o(),e?(l==null||l.observe(e),i==null||i.observe(document.body,{childList:!0,subtree:!0})):(l==null||l.disconnect(),i==null||i.disconnect())},[e]),r;function a(c){if(!e)return null;if(e.isConnected===!1){var u;return(u=c??n)!=null?u:null}const f=t(e);return JSON.stringify(c)===JSON.stringify(f)?c:f}}function nr(e){const t=qt(e);return $t(e,t)}const Lt=[];function rr(e){const t=s.useRef(e),n=Re(r=>e?r&&r!==Lt&&e&&t.current&&e.parentNode===t.current.parentNode?r:ot(e):Lt,[e]);return s.useEffect(()=>{t.current=e},[e]),n}function or(e){const[t,n]=s.useState(null),r=s.useRef(e),o=s.useCallback(i=>{const l=He(i.target);l&&n(a=>a?(a.set(l,Qe(l)),new Map(a)):null)},[]);return s.useEffect(()=>{const i=r.current;if(e!==i){l(i);const a=e.map(c=>{const u=He(c);return u?(u.addEventListener("scroll",o,{passive:!0}),[u,Qe(u)]):null}).filter(c=>c!=null);n(a.length?new Map(a):null),r.current=e}return()=>{l(e),l(i)};function l(a){a.forEach(c=>{const u=He(c);u==null||u.removeEventListener("scroll",o)})}},[o,e]),s.useMemo(()=>e.length?t?Array.from(t.values()).reduce((i,l)=>ce(i,l),j):Kt(e):j,[e,t])}function kt(e,t){t===void 0&&(t=[]);const n=s.useRef(null);return s.useEffect(()=>{n.current=null},t),s.useEffect(()=>{const r=e!==j;r&&!n.current&&(n.current=e),!r&&n.current&&(n.current=null)},[e]),n.current?Ie(e,n.current):j}function ir(e){s.useEffect(()=>{if(!Fe)return;const t=e.map(n=>{let{sensor:r}=n;return r.setup==null?void 0:r.setup()});return()=>{for(const n of t)n==null||n()}},e.map(t=>{let{sensor:n}=t;return n}))}function sr(e,t){return s.useMemo(()=>e.reduce((n,r)=>{let{eventName:o,handler:i}=r;return n[o]=l=>{i(l,t)},n},{}),[e,t])}function Jt(e){return s.useMemo(()=>e?Nn(e):null,[e])}const qe=[];function lr(e,t){t===void 0&&(t=Se);const[n]=e,r=Jt(n?k(n):null),[o,i]=s.useReducer(a,qe),l=$e({callback:i});return e.length>0&&o===qe&&i(),_(()=>{e.length?e.forEach(c=>l==null?void 0:l.observe(c)):(l==null||l.disconnect(),i())},[e]),o;function a(){return e.length?e.map(c=>jt(c)?r:new it(t(c),c)):qe}}function ar(e){if(!e)return null;if(e.children.length>1)return e;const t=e.children[0];return Ce(t)?t:e}function cr(e){let{measure:t}=e;const[n,r]=s.useState(null),o=s.useCallback(u=>{for(const{target:f}of u)if(Ce(f)){r(d=>{const v=t(f);return d?{...d,width:v.width,height:v.height}:v});break}},[t]),i=$e({callback:o}),l=s.useCallback(u=>{const f=ar(u);i==null||i.disconnect(),f&&(i==null||i.observe(f)),r(f?t(f):null)},[t,i]),[a,c]=ke(l);return s.useMemo(()=>({nodeRef:a,rect:n,setRef:c}),[n,a,c])}const ur=[{sensor:_t,options:{}},{sensor:Vt,options:{}}],dr={current:{}},Le={draggable:{measure:Et},droppable:{measure:Et,strategy:xe.WhileDragging,frequency:et.Optimized},dragOverlay:{measure:Se}};class me extends Map{get(t){var n;return t!=null&&(n=super.get(t))!=null?n:void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(t=>{let{disabled:n}=t;return!n})}getNodeFor(t){var n,r;return(n=(r=this.get(t))==null?void 0:r.node.current)!=null?n:void 0}}const fr={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new me,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:ze},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:Le,measureDroppableContainers:ze,windowRect:null,measuringScheduled:!1},hr={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:""},dispatch:ze,draggableNodes:new Map,over:null,measureDroppableContainers:ze},Ue=s.createContext(hr),gr=s.createContext(fr);function vr(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new me}}}function pr(e,t){switch(t.type){case E.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case E.DragMove:return e.draggable.active?{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}}:e;case E.DragEnd:case E.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case E.RegisterDroppable:{const{element:n}=t,{id:r}=n,o=new me(e.droppable.containers);return o.set(r,n),{...e,droppable:{...e.droppable,containers:o}}}case E.SetDroppableDisabled:{const{id:n,key:r,disabled:o}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;const l=new me(e.droppable.containers);return l.set(n,{...i,disabled:o}),{...e,droppable:{...e.droppable,containers:l}}}case E.UnregisterDroppable:{const{id:n,key:r}=t,o=e.droppable.containers.get(n);if(!o||r!==o.key)return e;const i=new me(e.droppable.containers);return i.delete(n),{...e,droppable:{...e.droppable,containers:i}}}default:return e}}function br(e){let{disabled:t}=e;const{active:n,activatorEvent:r,draggableNodes:o}=s.useContext(Ue),i=Je(r),l=Je(n==null?void 0:n.id);return s.useEffect(()=>{if(!t&&!r&&i&&l!=null){if(!Ft(i)||document.activeElement===i.target)return;const a=o.get(l);if(!a)return;const{activatorNode:c,node:u}=a;if(!c.current&&!u.current)return;requestAnimationFrame(()=>{for(const f of[c.current,u.current]){if(!f)continue;const d=un(f);if(d){d.focus();break}}})}},[r,t,o,l,i]),null}function wr(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((o,i)=>i({transform:o,...r}),n):n}function yr(e){return s.useMemo(()=>({draggable:{...Le.draggable,...e==null?void 0:e.draggable},droppable:{...Le.droppable,...e==null?void 0:e.droppable},dragOverlay:{...Le.dragOverlay,...e==null?void 0:e.dragOverlay}}),[e==null?void 0:e.draggable,e==null?void 0:e.droppable,e==null?void 0:e.dragOverlay])}function mr(e){let{activeNode:t,measure:n,initialRect:r,config:o=!0}=e;const i=s.useRef(!1),{x:l,y:a}=typeof o=="boolean"?{x:o,y:o}:o;_(()=>{if(!l&&!a||!t){i.current=!1;return}if(i.current||!r)return;const u=t==null?void 0:t.node.current;if(!u||u.isConnected===!1)return;const f=n(u),d=$t(f,r);if(l||(d.x=0),a||(d.y=0),i.current=!0,Math.abs(d.x)>0||Math.abs(d.y)>0){const v=Ut(u);v&&v.scrollBy({top:d.y,left:d.x})}},[t,l,a,r,n])}const Gt=s.createContext({...j,scaleX:1,scaleY:1});var Z;(function(e){e[e.Uninitialized=0]="Uninitialized",e[e.Initializing=1]="Initializing",e[e.Initialized=2]="Initialized"})(Z||(Z={}));const Er=s.memo(function(t){var n,r,o,i;let{id:l,accessibility:a,autoScroll:c=!0,children:u,sensors:f=ur,collisionDetection:d=Cn,measuring:v,modifiers:h,...R}=t;const g=s.useReducer(pr,void 0,vr),[p,m]=g,[x,w]=pn(),[T,C]=s.useState(Z.Uninitialized),S=T===Z.Initialized,{draggable:{active:b,nodes:y,translate:M},droppable:{containers:L}}=p,A=b?y.get(b):null,K=s.useRef({initial:null,translated:null}),H=s.useMemo(()=>{var N;return b!=null?{id:b,data:(N=A==null?void 0:A.data)!=null?N:dr,rect:K}:null},[b,A]),q=s.useRef(null),[lt,at]=s.useState(null),[V,ct]=s.useState(null),fe=De(R,Object.values(R)),We=Pe("DndDescribedBy",l),ut=s.useMemo(()=>L.getEnabled(),[L]),ee=yr(v),{droppableRects:re,measureDroppableContainers:Ee,measuringScheduled:dt}=Qn(ut,{dragging:S,dependencies:[M.x,M.y],config:ee.droppable}),$=Jn(y,b),ft=s.useMemo(()=>V?Ge(V):null,[V]),ht=sn(),gt=Zn($,ee.draggable.measure);mr({activeNode:b?y.get(b):null,config:ht.layoutShiftCompensation,initialRect:gt,measure:ee.draggable.measure});const U=Tt($,ee.draggable.measure,gt),Xe=Tt($?$.parentElement:null),te=s.useRef({activatorEvent:null,active:null,activeNode:$,collisionRect:null,collisions:null,droppableRects:re,draggableNodes:y,draggingNode:null,draggingNodeRect:null,droppableContainers:L,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),vt=L.getNodeFor((n=te.current.over)==null?void 0:n.id),ne=cr({measure:ee.dragOverlay.measure}),Me=(r=ne.nodeRef.current)!=null?r:$,oe=S?(o=ne.rect)!=null?o:U:null,pt=!!(ne.nodeRef.current&&ne.rect),bt=nr(pt?null:U),je=Jt(Me?k(Me):null),J=rr(S?vt??$:null),Ae=lr(J),Oe=wr(h,{transform:{x:M.x-bt.x,y:M.y-bt.y,scaleX:1,scaleY:1},activatorEvent:V,active:H,activeNodeRect:U,containerNodeRect:Xe,draggingNodeRect:oe,over:te.current.over,overlayNodeRect:ne.rect,scrollableAncestors:J,scrollableAncestorRects:Ae,windowRect:je}),wt=ft?ce(ft,M):null,yt=or(J),Qt=kt(yt),Zt=kt(yt,[U]),ie=ce(Oe,Qt),se=oe?En(oe,Oe):null,he=H&&se?d({active:H,collisionRect:se,droppableRects:re,droppableContainers:ut,pointerCoordinates:wt}):null,mt=Dn(he,"id"),[G,Dt]=s.useState(null),en=pt?Oe:ce(Oe,Zt),tn=Rn(en,(i=G==null?void 0:G.rect)!=null?i:null,U),xt=s.useCallback((N,I)=>{let{sensor:z,options:Q}=I;if(q.current==null)return;const B=y.get(q.current);if(!B)return;const W=N.nativeEvent,Y=new z({active:q.current,activeNode:B,event:W,options:Q,context:te,onStart(X){const ge=q.current;if(ge==null)return;const ve=y.get(ge);if(!ve)return;const{onDragStart:Ne}=fe.current,Te={active:{id:ge,data:ve.data,rect:K}};ae.unstable_batchedUpdates(()=>{Ne==null||Ne(Te),C(Z.Initializing),m({type:E.DragStart,initialCoordinates:X,active:ge}),x({type:"onDragStart",event:Te})})},onMove(X){m({type:E.DragMove,coordinates:X})},onEnd:le(E.DragEnd),onCancel:le(E.DragCancel)});ae.unstable_batchedUpdates(()=>{at(Y),ct(N.nativeEvent)});function le(X){return async function(){const{active:ve,collisions:Ne,over:Te,scrollAdjustedTranslate:Rt}=te.current;let pe=null;if(ve&&Rt){const{cancelDrop:be}=fe.current;pe={activatorEvent:W,active:ve,collisions:Ne,delta:Rt,over:Te},X===E.DragEnd&&typeof be=="function"&&await Promise.resolve(be(pe))&&(X=E.DragCancel)}q.current=null,ae.unstable_batchedUpdates(()=>{m({type:X}),C(Z.Uninitialized),Dt(null),at(null),ct(null);const be=X===E.DragEnd?"onDragEnd":"onDragCancel";if(pe){const Ye=fe.current[be];Ye==null||Ye(pe),x({type:be,event:pe})}})}}},[y]),nn=s.useCallback((N,I)=>(z,Q)=>{const B=z.nativeEvent,W=y.get(Q);if(q.current!==null||!W||B.dndKit||B.defaultPrevented)return;const Y={active:W};N(z,I.options,Y)===!0&&(B.dndKit={capturedBy:I.sensor},q.current=Q,xt(z,I))},[y,xt]),Ct=Gn(f,nn);ir(f),_(()=>{U&&T===Z.Initializing&&C(Z.Initialized)},[U,T]),s.useEffect(()=>{const{onDragMove:N}=fe.current,{active:I,activatorEvent:z,collisions:Q,over:B}=te.current;if(!I||!z)return;const W={active:I,activatorEvent:z,collisions:Q,delta:{x:ie.x,y:ie.y},over:B};ae.unstable_batchedUpdates(()=>{N==null||N(W),x({type:"onDragMove",event:W})})},[ie.x,ie.y]),s.useEffect(()=>{const{active:N,activatorEvent:I,collisions:z,droppableContainers:Q,scrollAdjustedTranslate:B}=te.current;if(!N||q.current==null||!I||!B)return;const{onDragOver:W}=fe.current,Y=Q.get(mt),le=Y&&Y.rect.current?{id:Y.id,rect:Y.rect.current,data:Y.data,disabled:Y.disabled}:null,X={active:N,activatorEvent:I,collisions:z,delta:{x:B.x,y:B.y},over:le};ae.unstable_batchedUpdates(()=>{Dt(le),W==null||W(X),x({type:"onDragOver",event:X})})},[mt]),_(()=>{te.current={activatorEvent:V,active:H,activeNode:$,collisionRect:se,collisions:he,droppableRects:re,draggableNodes:y,draggingNode:Me,draggingNodeRect:oe,droppableContainers:L,over:G,scrollableAncestors:J,scrollAdjustedTranslate:ie},K.current={initial:oe,translated:se}},[H,$,he,se,y,Me,oe,re,L,G,J,ie]),Vn({...ht,delta:M,draggingRect:se,pointerCoordinates:wt,scrollableAncestors:J,scrollableAncestorRects:Ae});const rn=s.useMemo(()=>({active:H,activeNode:$,activeNodeRect:U,activatorEvent:V,collisions:he,containerNodeRect:Xe,dragOverlay:ne,draggableNodes:y,droppableContainers:L,droppableRects:re,over:G,measureDroppableContainers:Ee,scrollableAncestors:J,scrollableAncestorRects:Ae,measuringConfiguration:ee,measuringScheduled:dt,windowRect:je}),[H,$,U,V,he,Xe,ne,y,L,re,G,Ee,J,Ae,ee,dt,je]),on=s.useMemo(()=>({activatorEvent:V,activators:Ct,active:H,activeNodeRect:U,ariaDescribedById:{draggable:We},dispatch:m,draggableNodes:y,over:G,measureDroppableContainers:Ee}),[V,Ct,H,U,m,We,y,G,Ee]);return P.createElement(Pt.Provider,{value:w},P.createElement(Ue.Provider,{value:on},P.createElement(gr.Provider,{value:rn},P.createElement(Gt.Provider,{value:tn},u)),P.createElement(br,{disabled:(a==null?void 0:a.restoreFocus)===!1})),P.createElement(yn,{...a,hiddenTextDescribedById:We}));function sn(){const N=(lt==null?void 0:lt.autoScrollEnabled)===!1,I=typeof c=="object"?c.enabled===!1:c===!1,z=S&&!N&&!I;return typeof c=="object"?{...c,enabled:z}:{enabled:z}}}),Dr=s.createContext(null),It="button",xr="Droppable";function Mr(e){let{id:t,data:n,disabled:r=!1,attributes:o}=e;const i=Pe(xr),{activators:l,activatorEvent:a,active:c,activeNodeRect:u,ariaDescribedById:f,draggableNodes:d,over:v}=s.useContext(Ue),{role:h=It,roleDescription:R="draggable",tabIndex:g=0}=o??{},p=(c==null?void 0:c.id)===t,m=s.useContext(p?Gt:Dr),[x,w]=ke(),[T,C]=ke(),S=sr(l,t),b=De(n);_(()=>(d.set(t,{id:t,key:i,node:x,activatorNode:T,data:b}),()=>{const M=d.get(t);M&&M.key===i&&d.delete(t)}),[d,t]);const y=s.useMemo(()=>({role:h,tabIndex:g,"aria-disabled":r,"aria-pressed":p&&h===It?!0:void 0,"aria-roledescription":R,"aria-describedby":f.draggable}),[r,h,g,p,R,f.draggable]);return{active:c,activatorEvent:a,activeNodeRect:u,attributes:y,isDragging:p,listeners:r?void 0:S,node:x,over:v,setNodeRef:w,setActivatorNodeRef:C,transform:m}}const Cr="Droppable",Rr={timeout:25};function Ar(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:o}=e;const i=Pe(Cr),{active:l,dispatch:a,over:c,measureDroppableContainers:u}=s.useContext(Ue),f=s.useRef({disabled:n}),d=s.useRef(!1),v=s.useRef(null),h=s.useRef(null),{disabled:R,updateMeasurementsFor:g,timeout:p}={...Rr,...o},m=De(g??r),x=s.useCallback(()=>{if(!d.current){d.current=!0;return}h.current!=null&&clearTimeout(h.current),h.current=setTimeout(()=>{u(Array.isArray(m.current)?m.current:[m.current]),h.current=null},p)},[p]),w=$e({callback:x,disabled:R||!l}),T=s.useCallback((y,M)=>{w&&(M&&(w.unobserve(M),d.current=!1),y&&w.observe(y))},[w]),[C,S]=ke(T),b=De(t);return s.useEffect(()=>{!w||!C.current||(w.disconnect(),d.current=!1,w.observe(C.current))},[C,w]),_(()=>(a({type:E.RegisterDroppable,element:{id:r,key:i,disabled:n,node:C,rect:v,data:b}}),()=>a({type:E.UnregisterDroppable,key:i,id:r})),[r]),s.useEffect(()=>{n!==f.current.disabled&&(a({type:E.SetDroppableDisabled,id:r,key:i,disabled:n}),f.current.disabled=n)},[r,i,n,a]),{active:l,rect:v,isOver:(c==null?void 0:c.id)===r,node:C,over:c,setNodeRef:S}}export{Er as D,Ar as a,Mr as u};