(this.webpackJsonpcovid19=this.webpackJsonpcovid19||[]).push([[0],{109:function(t,e,a){t.exports=a(119)},114:function(t,e,a){},115:function(t,e,a){},117:function(t,e,a){},118:function(t,e,a){},119:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),r=a(54),o=a.n(r),c=(a(114),a(2)),l=a(3),s=a(7),d=a(5),u=a(4),h=(a(115),function(t){Object(d.a)(a,t);var e=Object(u.a)(a);function a(){var t;return Object(c.a)(this,a),(t=e.call(this)).state={data:[]},t.GetWorldStatistics=t.GetWorldStatistics.bind(Object(s.a)(t)),t}return Object(l.a)(a,[{key:"GetWorldStatistics",value:function(){var t=this;fetch("https://coronavirus-19-api.herokuapp.com/all",{method:"GET"}).then((function(t){return t.json()})).then((function(e){t.setState({data:e})}))}},{key:"componentDidMount",value:function(){this.GetWorldStatistics()}},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"},i.a.createElement("div",null,"Global stats:"),i.a.createElement("div",null,"cases: ",this.state.data.cases),i.a.createElement("div",null,"deaths: ",this.state.data.deaths),i.a.createElement("div",null,"recovered: ",this.state.data.recovered)))}}]),a}(i.a.Component)),v=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function f(t,e){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var a=t.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}})).catch((function(t){console.error("Error during service worker registration:",t)}))}a(116);var p=a(1),m=(a(117),function(t){Object(d.a)(a,t);var e=Object(u.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var t=this.props,e=t.path,a=t.stroke,n=t.fill,r=t.strokeWidth;return i.a.createElement("path",{d:e,stroke:a,fill:n,strokeWidth:r})}}]),a}(n.Component));m.defaultProps={stroke:"white",fill:"none",strokeWidth:3};var g=m,k=function(t){Object(d.a)(a,t);var e=Object(u.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var t=this.props,e=t.data,a=t.xScale,n=t.yScale,r=p.d().x((function(t){return a(t.x)})).y((function(t){return n(t.y)})).curve(p.c);return i.a.createElement(g,{path:r(e.points)})}}]),a}(n.Component);k.defaultProps={data:[],colors:p.h(p.j)};var y=k,b=function(t){Object(d.a)(a,t);var e=Object(u.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var t=this.props,e=t.width,a=t.height,n=t.data,i=p.i().domain([n.minDate,n.maxDate]).range([0,e]),r=p.a(i);r.ticks(p.l.every(1)),p.k('[title="'.concat(n.title,'"]')).append("g").attr("transform","translate(40,".concat(a,")")).call(r);var o=p.g().domain([n.yMin,n.yMax]).range([a,10]),c=p.b(o);c.ticks(10),p.k('[title="'.concat(n.title,'"]')).append("g").attr("transform","translate(40,0)").call(c)}},{key:"render",value:function(){var t=this.props,e=t.width,a=t.height,n=t.data,r=p.i().domain([n.minDate,n.maxDate]).range([40,e]);r.ticks(5);var o=p.g().domain([n.yMin,n.yMax]).range([a,0]);return i.a.createElement("svg",{width:e+30,height:a+30,title:n.title},i.a.createElement("g",null,i.a.createElement("text",{x:(e+30)/2,y:15,textAnchor:"middle",fontSize:"16px",fill:"white"},n.title),i.a.createElement(y,{xScale:r,yScale:o,data:n})))}}]),a}(n.Component);b.defaultProps={width:600,height:300};var w=b,E=function(t){Object(d.a)(a,t);var e=Object(u.a)(a);function a(){var t;return Object(c.a)(this,a),(t=e.call(this)).state={data:[],covidData:{}},t.GetWorldStatistics=t.GetWorldStatistics.bind(Object(s.a)(t)),t}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.GetWorldStatistics()}},{key:"GetWorldStatistics",value:function(){var t=this;fetch("https://covidtracking.com/api/v1/us/daily.json",{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(e){t.setState({data:e,covidData:[{points:t.cumulativeData(e),yMin:p.f(e,(function(t){return t.death})),yMax:p.e(e,(function(t){return t.death})),minDate:t.getDate(p.f(e,(function(t){return t.date}))),maxDate:t.getDate(p.e(e,(function(t){return t.date}))),title:"US total deaths"},{points:t.cumulativeData(t.derive(e,1)),yMin:p.f(e,(function(t){return t.death})),yMax:p.e(e,(function(t){return t.death})),minDate:t.getDate(p.f(e,(function(t){return t.date}))),maxDate:t.getDate(p.e(e,(function(t){return t.date}))),title:"US deaths/day"}]}),t.render()}))}},{key:"getDate",value:function(t){var e=Math.floor(t/1e4),a=Math.floor(t/100)-1-100*e;return new Date(e,a,t-1e4*e-100*(a+1))}},{key:"derive",value:function(t,e){if(!(e<0)){if(0===e)return t;for(var a=0;a<t.length-1;a++)t[a].death=t[a].death-t[a+1].death;return t.pop(),this.derive(t,--e)}}},{key:"cumulativeData",value:function(t){var e=this;return t=t.map((function(t){return{x:e.getDate(t.date),y:t.death?t.death:0}}))}},{key:"isDataLoaded",value:function(){var t,e=!1;return!!(null===(t=this.state)||void 0===t?void 0:t.covidData[0])&&(e=!!this.state.covidData[0].points&&this.state.covidData[0].points.length>0),e}},{key:"render",value:function(){return i.a.createElement("div",{className:"Graph"},this.isDataLoaded()?i.a.createElement("div",null,i.a.createElement(w,{data:this.state.covidData[0],width:600,height:300}),i.a.createElement(w,{data:this.state.covidData[1],width:600,height:300})):i.a.createElement("div",null,"loading..."))}}]),a}(n.Component),j=(a(118),function(t){Object(d.a)(a,t);var e=Object(u.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"ContactCard"},i.a.createElement("div",null,"David Alvarez Contact"),i.a.createElement("div",null,"Email: ",i.a.createElement("a",{href:"mailto:d.alvar.work@gmail.com"},"d.alvar.work@gmail.com")),i.a.createElement("div",null,"Phone: ",i.a.createElement("a",{href:"tel:+12068905009"},"206-890-5009")),i.a.createElement("div",null,"LinkedIn: ",i.a.createElement("a",{href:"https://linkedin.com/in/david-g-alvarez",target:"_blank",rel:"noopener noreferrer"},"david-g-alvarez")))}}]),a}(i.a.Component));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(h,null),i.a.createElement(E,null),i.a.createElement(j,null)),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("/covid19",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/covid19","/service-worker.js");v?(!function(t,e){fetch(t,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):f(t,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):f(e,t)}))}}()}},[[109,1,2]]]);
//# sourceMappingURL=main.0455db28.chunk.js.map