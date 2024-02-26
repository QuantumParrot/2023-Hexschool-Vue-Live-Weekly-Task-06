import{_ as u,m as d,a as m,c as a,d as _,b as s,F as c,h,t as e,e as l,i as g,r as f,o as i}from"./index-pQWg6EHF.js";import{l as v}from"./loadingStore-h-BplzEJ.js";import{p as r}from"./productStore-V7lHhx7T.js";import"./messageStore-ThBgcMdp.js";const y={computed:{...d(v,["isLoading"]),...d(r,["product","displayImages"])},methods:{...m(r,["getSingleProduct","changeDisplay"])},mounted(){this.getSingleProduct(this.$route.params.id)}},b={key:0,class:"container my-5"},k={class:"row"},w={class:"col-md-6"},L={class:"h-100 d-flex flex-column justify-content-between gap-4"},$={class:"card overflow-hidden"},S=["src","alt"],j={class:"flex-grow-1 justify-content-center card p-3"},N={class:"d-flex gap-3"},V=["src","alt","onClick"],C={class:"col-md-6"},I={class:"h-100 card px-4 pt-5 pb-4 d-flex flex-column justify-content-between"},B={class:"fw-bold mb-3"},D={class:"fs-6 text-muted fst-italic"},P=s("hr",null,null,-1),F={class:"fs-5"},O=s("span",{class:"badge lh-base bg-dark me-2"},"分類",-1),T={class:"fs-5"},x=s("span",{class:"badge lh-base bg-dark me-2"},"規格",-1),z=s("hr",null,null,-1),A={class:"text-description text-justify"},E={class:"alert bg-secondary-subtle mb-0"},U={class:"d-flex justify-content-between align-items-center"};function q(t,n,G,H,J,K){const p=f("LoadingOverlay");return i(),a(c,null,[_(p,{active:t.isLoading,"onUpdate:active":n[0]||(n[0]=o=>t.isLoading=o),"z-index":1e3},null,8,["active"]),t.isLoading?g("",!0):(i(),a("div",b,[s("div",k,[s("div",w,[s("div",L,[s("div",$,[s("img",{class:"main-img",src:t.displayImages.mainImage,alt:t.product.title},null,8,S)]),s("div",j,[s("div",N,[(i(!0),a(c,null,h(t.displayImages.images,o=>(i(),a("img",{class:"display-img",src:o,alt:t.product.title,key:o,onClick:M=>t.changeDisplay(o)},null,8,V))),128))])])])]),s("div",C,[s("div",I,[s("div",null,[s("h2",B,e(t.product.title),1),s("h3",D,e(t.product.subtitle),1),P,s("p",F,[O,l(" "+e(t.product.category),1)]),s("p",T,[x,l(" "+e(t.product.content),1)]),z,s("p",A,e(t.product.description),1)]),s("div",E,[s("div",U," NT$ "+e(t.product.price)+" / "+e(t.product.unit),1)])])])])]))],64)}const Y=u(y,[["render",q]]);export{Y as default};