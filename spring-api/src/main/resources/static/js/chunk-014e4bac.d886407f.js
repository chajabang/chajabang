(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-014e4bac"],{"26cf":function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t._self._c;return e("b-container",{staticClass:"bv-example-row mt-3"},[e("b-row",[e("b-col",[e("b-alert",{attrs:{show:""}},[e("h3",[t._v("글수정")])])],1)],1),e("board-input-item",{attrs:{type:"modify"}})],1)},r=[],i=n("7e37"),a={name:"BoardModify",components:{BoardInputItem:i["a"]}},s=a,o=n("2877"),u=Object(o["a"])(s,c,r,!1,null,null,null);e["default"]=u.exports},6711:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"e",(function(){return a})),n.d(e,"b",(function(){return s})),n.d(e,"d",(function(){return o})),n.d(e,"a",(function(){return u}));n("e9c4");var c=n("365c"),r=Object(c["a"])();function i(t,e,n){r.get("/board",{params:t}).then(e).catch(n)}function a(t,e,n){r.post("/board/write",t).then(e).catch(n)}function s(t,e,n){r.get("/board/".concat(t)).then(e).catch(n)}function o(t,e,n){r.put("/board",JSON.stringify(t)).then(e).catch(n)}function u(t,e,n){r.delete("/board/".concat(t)).then(e).catch(n)}},"7e37":function(t,e,n){"use strict";var c=function(){var t=this,e=t._self._c;return e("b-row",{staticClass:"mb-1"},[e("b-col",{staticStyle:{"text-align":"left"}},[e("b-form",{on:{submit:t.onSubmit,reset:t.onReset}},[e("b-form-group",{attrs:{id:"subject-group",label:"제목:","label-for":"subject",description:"제목을 입력하세요."}},[e("b-form-input",{attrs:{id:"subject",type:"text",required:"",placeholder:"제목 입력..."},model:{value:t.article.subject,callback:function(e){t.$set(t.article,"subject",e)},expression:"article.subject"}})],1),e("b-form-group",{attrs:{id:"content-group",label:"내용:","label-for":"content"}},[e("b-form-textarea",{attrs:{id:"content",placeholder:"내용 입력...",rows:"10","max-rows":"15"},model:{value:t.article.content,callback:function(e){t.$set(t.article,"content",e)},expression:"article.content"}})],1),"register"===this.type?e("b-button",{staticClass:"m-1",attrs:{type:"submit",variant:"primary"}},[t._v("글작성")]):e("b-button",{staticClass:"m-1",attrs:{type:"submit",variant:"primary"}},[t._v("글수정")]),e("b-button",{staticClass:"m-1",attrs:{type:"reset",variant:"danger"}},[t._v("초기화")])],1)],1)],1)},r=[],i=n("5530"),a=(n("14d9"),n("6711")),s=n("2f62"),o="memberStore",u={name:"BoardInputItem",data:function(){return{article:{articleno:0,id:"",subject:"",content:""}}},props:{type:{type:String}},created:function(){var t=this;if(this.id=this.user.id,"modify"===this.type){var e=this.$route.params.articleno;Object(a["b"])(e,(function(e){var n=e.data;t.article=n}),(function(t){console.log(t)}))}},computed:Object(i["a"])({},Object(s["d"])(o,["user"])),methods:{onSubmit:function(t){t.preventDefault();var e=!0,n="";e&&!this.article.subject&&(n="제목 입력해주세요",e=!1,this.$refs.subject.focus()),e&&!this.article.content&&(n="내용 입력해주세요",e=!1,this.$refs.content.focus()),e?"register"===this.type?this.registArticle():this.modifyArticle():alert(n)},onReset:function(t){t.preventDefault(),this.article.articleno=0,this.article.subject="",this.article.content="",this.moveList()},registArticle:function(){var t=this,e={userId:this.id,subject:this.article.subject,content:this.article.content};Object(a["e"])(e,(function(e){var n=e.data,c="등록 처리시 문제가 발생했습니다.";"success"===n&&(c="등록이 완료되었습니다."),alert(c),t.moveList()}),(function(t){console.log(t)}))},modifyArticle:function(){var t=this,e={articleno:this.article.articleno,userid:this.article.userid,subject:this.article.subject,content:this.article.content};Object(a["d"])(e,(function(e){var n=e.data,c="수정 처리시 문제가 발생했습니다.";"success"===n&&(c="수정이 완료되었습니다."),alert(c),t.moveList()}),(function(t){console.log(t)}))},moveList:function(){this.$router.push({name:"boardlist"})}}},l=u,b=n("2877"),f=Object(b["a"])(l,c,r,!1,null,null,null);e["a"]=f.exports}}]);
//# sourceMappingURL=chunk-014e4bac.d886407f.js.map