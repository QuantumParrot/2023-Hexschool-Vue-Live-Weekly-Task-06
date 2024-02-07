import{i as T,a as u,m as f,_ as S,o as d,c as r,b as e,d as a,w as _,n as b,t as l,e as n,r as h,F as C,g as k,j as V,v as x,h as A}from"./index-B0p8LOKs.js";import{l as F}from"./loadingStore-IVwGr4UN.js";import{S as E,a as O,m as P}from"./messageStore-Bvd6GOaT.js";import{c as g}from"./cartStore-IjV7qrG7.js";import{v as D}from"./validation-92p_Zyy8.js";var B={VITE_APP_SITE:"https://ec-course-api.hexschool.io/v2",VITE_APP_PATH:"ataraxia",BASE_URL:"/2023-Hexschool-Vue-Live-Weekly-Task-06",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_SITE:I,VITE_APP_PATH:M}=B,w=T("orderStore",{state:()=>({showForm:!1}),actions:{...u(F,["createLoader","removeLoader"]),...u(P,["toastAlert","errorHandle"]),...u(g,["getCartsData"]),displayForm(){this.showForm=!0},submitOrder(s,{resetForm:i}){E.fire({title:"確定送出訂單？",showCancelButton:!0,confirmButtonColor:"#dc3545",confirmButtonText:"確定",cancelButtonText:"取消"}).then(v=>{if(v.isConfirmed){this.createLoader("submitOrder");const y={user:{name:s.name,address:s.address,tel:s.tel,email:s.email},message:s.message||"無"};O.post(`${I}/api/${M}/order`,{data:y}).then(p=>{i(),this.toastAlert(`${p.data.message}，感謝您的訂購！`,"success"),this.getCartsData()}).catch(p=>this.errorHandle(p,"error")).finally(()=>this.removeLoader("submitOrder"))}})}}}),N={mixins:[D],computed:{...f(g,["carts"])},methods:{...u(w,["submitOrder"])}},z={class:"container py-5"},q={class:"row justify-content-center"},H={class:"col-md-6"},R=e("h3",{class:"mb-4"},"填寫寄送資訊",-1),j=e("div",{class:"alert bg-secondary-subtle px-4"},[e("span",{class:"text-danger me-2"},"*"),n("為必填欄位哦！ ")],-1),U={class:"mb-3"},Q=e("label",{for:"name",class:"form-label"},[e("span",{class:"text-danger fst-italic me-1"},"*"),n(" 您的大名")],-1),W={class:"invalid-feedback"},G={class:"mb-3"},J=e("label",{for:"email",class:"form-label"},[e("span",{class:"text-danger fst-italic me-1"},"*"),n(" 電子信箱")],-1),K={class:"invalid-feedback"},X={class:"mb-3"},Y=e("label",{for:"tel",class:"form-label"},[e("span",{class:"text-danger fst-italic me-1"},"*"),n(" 您的手機")],-1),Z={class:"invalid-feedback"},ee={class:"mb-3"},se=e("label",{for:"address",class:"form-label"},[e("span",{class:"text-danger fst-italic me-1"},"*"),n(" 寄送地址")],-1),te={class:"invalid-feedback"},oe={class:"mb-3"},ae=e("label",{for:"message",class:"form-label"},"備註與留言",-1),le=["disabled"];function ne(s,i,v,y,p,L){const c=h("VField"),m=h("ErrorMessage"),$=h("VForm");return d(),r("div",z,[e("div",q,[e("div",H,[R,j,a($,{class:"card p-4",onSubmit:s.submitOrder},{default:_(({errors:t})=>[e("div",U,[Q,a(c,{type:"text",id:"name",class:b(["form-control mb-2",{"is-invalid":t.name}]),name:"name",rules:"required"},null,8,["class"]),a(m,{name:"name"},{default:_(({message:o})=>[e("p",W,l(s.localizeMessage(o,"name")),1)]),_:1})]),e("div",G,[J,a(c,{type:"email",id:"email",class:b(["form-control mb-2",{"is-invalid":t.email}]),name:"email",rules:"required|email"},null,8,["class"]),a(m,{name:"email"},{default:_(({message:o})=>[e("p",K,l(s.localizeMessage(o,"email")),1)]),_:1})]),e("div",X,[Y,a(c,{type:"tel",id:"tel",class:b(["form-control mb-2",{"is-invalid":t.tel}]),name:"tel",rules:s.tel},null,8,["class","rules"]),a(m,{name:"tel"},{default:_(({message:o})=>[e("p",Z,l(s.localizeMessage(o,"tel")),1)]),_:1})]),e("div",ee,[se,a(c,{type:"text",id:"address",class:b(["form-control mb-2",{"is-invalid":t.address}]),name:"address",rules:"required"},null,8,["class"]),a(m,{name:"address"},{default:_(({message:o})=>[e("p",te,l(s.localizeMessage(o,"address")),1)]),_:1})]),e("div",oe,[ae,a(c,{id:"message",class:"form-control mb-2",rows:"5",name:"message",as:"textarea"})]),e("button",{type:"submit",class:"btn btn-secondary",disabled:!s.carts.length}," 確定送出",8,le)]),_:1},8,["onSubmit"])])])])}const ie=S(N,[["render",ne]]),de={components:{OrderForm:ie},computed:{...f(F,["isLoading"]),...f(w,["showForm"]),...f(g,["carts","total"])},methods:{...u(w,["displayForm"]),...u(g,["getCartsData","changeCartQty","deleteCartItem","deletAllCart"])},mounted(){this.getCartsData()}},re={class:"container my-5",style:{"min-height":"100vh"}},ce=e("h2",{class:"fw-bolder mb-5"},"購物車",-1),me={key:0,class:"alert bg-secondary-subtle"},_e={key:1,class:"table"},ue=e("thead",null,[e("tr",null,[e("th",{width:"10%"},"處理"),e("th",{width:"50%"},"商品"),e("th",{width:"15%",class:"text-end"},"單價"),e("th",{width:"15%",class:"text-end"},"數量"),e("th",{width:"10%",class:"text-end"},"小計")])],-1),he={class:"align-middle"},pe=["onClick"],be=e("i",{class:"bi bi-trash-fill me-2"},null,-1),fe=e("span",null,"刪除",-1),ge=[be,fe],ve=["src","alt"],ye={class:"d-inline-block align-middle"},$e={class:"fs-5 fw-bold mb-1"},Ce={class:"fs-7 fst-italic text-muted mb-0"},we={class:"text-end"},ke={key:0,class:"text-muted me-1 text-decoration-line-through"},Se={class:"input-group ps-3"},Fe=["value","onChange"],Le=["value"],Te={class:"input-group-text"},Ve={class:"text-end fw-bold"},xe={class:"fs-5 fw-bold"},Ae={colspan:"5",class:"py-3"},Ee={class:"d-flex justify-content-between align-items-center"},Oe={class:"d-flex align-items-center gap-3"},Pe=e("i",{class:"bi bi-cart-check-fill me-2"},null,-1),De=e("span",null,"結帳",-1),Be=[Pe,De];function Ie(s,i,v,y,p,L){const c=h("LoadingOverlay"),m=h("RouterLink"),$=h("OrderForm");return d(),r(C,null,[a(c,{active:s.isLoading,"onUpdate:active":i[0]||(i[0]=t=>s.isLoading=t),"z-index":1e3},null,8,["active"]),e("div",re,[ce,s.carts.length?(d(),r("table",_e,[ue,e("tbody",he,[(d(!0),r(C,null,k(s.carts,t=>(d(),r("tr",{key:t.id},[e("td",null,[e("button",{type:"button",class:"btn btn-danger",onClick:o=>s.deleteCartItem(t.id)},ge,8,pe)]),e("td",null,[e("img",{class:"cart-img me-4",src:t.product.imageUrl,alt:t.product.title},null,8,ve),e("div",ye,[e("p",$e,l(t.product.title),1),e("p",Ce,l(t.product.content),1)])]),e("td",we,[n(" NT$ "),t.product.origin_price!==t.product.price?(d(),r("span",ke,l(t.product.origin_price),1)):A("",!0),e("span",null,l(t.product.price)+" 元",1)]),e("td",null,[e("div",Se,[e("select",{class:"form-select",value:t.qty,onChange:o=>s.changeCartQty(t,o.target.value)},[(d(!0),r(C,null,k(10*Math.ceil((t.qty+1)/10),o=>(d(),r("option",{key:o,value:o},l(o),9,Le))),128))],40,Fe),e("span",Te,l(t.product.unit),1)])]),e("td",Ve,"NT$ "+l(t.total)+" 元",1)]))),128))]),e("tfoot",null,[e("tr",xe,[e("td",Ae,[e("div",Ee,[e("button",{type:"button",class:"btn btn-outline-danger",onClick:i[1]||(i[1]=(...t)=>s.deletAllCart&&s.deletAllCart(...t))},"清空購物車"),e("div",Oe,[n(" 總計：NT$ "+l(s.total)+" 元 ",1),e("button",{type:"button",class:"btn btn-secondary",onClick:i[2]||(i[2]=(...t)=>s.displayForm&&s.displayForm(...t))},Be)])])])])])])):(d(),r("div",me,[n(" 購物車內目前沒有商品，去"),a(m,{to:"/products"},{default:_(()=>[n("逛逛")]),_:1}),n("！ ")])),V(a($,null,null,512),[[x,s.carts.length&&s.showForm]])])],64)}const Re=S(de,[["render",Ie]]);export{Re as default};