(this.webpackJsonppathfindingvisualizer=this.webpackJsonppathfindingvisualizer||[]).push([[2],[,,,,,,,,,,function(e,t,n){e.exports=n(20)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){var a={"./AStar":[8,0],"./AStar.js":[8,0],"./Dijkstra":[9,1],"./Dijkstra.js":[9,1]};function o(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],o=t[0];return n.e(t[1]).then((function(){return n(o)}))}o.keys=function(){return Object.keys(a)},o.id=19,e.exports=o},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(4),l=n.n(r),c=(n(15),n(1)),i=n(2),s=n(6),u=n(5),d=n(7),m=(n(16),function(e){var t=e.grid;return o.a.createElement(o.a.Fragment,null,o.a.createElement("table",{id:"grid",onMouseLeave:e.setMouseDownFalse},o.a.createElement("tbody",{id:"tableBody"},t.map((function(t,n){return o.a.createElement("tr",{key:n,id:"row_".concat(n)},t.map((function(t,a){return o.a.createElement("td",{key:a,id:"node_".concat(n,"_").concat(a),className:"unvisited",onMouseDown:function(t){e.mouseEventHandler(t),e.setMouseDownTrue()},onMouseUp:e.setMouseDownFalse,onMouseOver:function(t){e.mouseDown&&e.mouseEventHandler(t)}})})))})))))}),f=(n(17),function(e){return o.a.createElement("nav",{id:"navbar"},o.a.createElement("ul",{id:"navbar-list"},o.a.createElement("li",{className:"dropdown-menu-item"},"Algorithms",o.a.createElement(N,{updateAlgo:e.updateAlgo})),o.a.createElement("li",{className:"dropdown-menu-item"},"Nodes",o.a.createElement(E,{nodes:e.nodes,selectNode:e.selectNode,updateAlgo:e.updateAlgo})),o.a.createElement("li",{className:"dropdown-menu-item",onClick:function(){return e.runAlgo()}},"Run"),o.a.createElement("li",{className:"dropdown-menu-item",onClick:function(){return e.clearBoard()}},"Clear Board")))}),N=function(e){return o.a.createElement("ul",{className:"dropdown-menu"},o.a.createElement("li",{onClick:e.updateAlgo("Dijkstra")},"Dijkstra"),o.a.createElement("li",{onClick:e.updateAlgo("AStar")},"A*"))},E=function(e){return o.a.createElement("ul",{className:"dropdown-menu"},o.a.createElement("li",{value:"Wall",onClick:function(){return e.selectNode(e.nodes.WALL_NODE)}},"Wall"),o.a.createElement("li",{value:"Start",onClick:function(){return e.selectNode(e.nodes.START_NODE)}},"Start"),o.a.createElement("li",{value:"End",onClick:function(){return e.selectNode(e.nodes.END_NODE)}},"End"))},v=(n(18),{WALL_NODE:0,START_NODE:1,END_NODE:2}),h=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).setNodeToPlace=function(e){a.nodeToPlace=e},a.mouseEventHandler=function(e){e.preventDefault();var t=e.target.id,n=a.tableElement.querySelector("#".concat(t));"unvisited"===n.className&&(n.className=a.validateNode(t))},a.validateNode=function(e){var t=parseInt(e.split("_")[1]),n=parseInt(e.split("_")[2]),o=a.state.grid[t][n];switch(a.nodeToPlace){case 0:var r=a.state.grid;return r[t][n].isWall=!0,a.setState({grid:r}),"wall";case 1:if(a.startNode)a.tableElement.querySelector("#node_".concat(a.startNode.row,"_").concat(a.startNode.col)).className="unvisited";return a.startNode=o,"start";case 2:if(a.endNode)a.tableElement.querySelector("#node_".concat(a.endNode.row,"_").concat(a.endNode.col)).className="unvisited";return a.endNode=o,"end"}},a.clearBoard=function(){a.setState({grid:g()});var e=document.getElementById("tableBody").children;a.startNode=null,a.endNode=null;for(var t=0;t<e.length;t++)for(var n=e[t].children,o=0;o<n.length;o++)n[o].className="unvisited"},a.animateAlgo=function(e,t){var n=1,o=a.tableElement.querySelector("#node_".concat(a.endNode.row,"_").concat(a.endNode.col));t.forEach((function(t){var r=a.tableElement.querySelector("#node_".concat(t.row,"_").concat(t.col));r===o&&setTimeout((function(){a.animateSPNodes(e)}),10*n),"start"!==r.className&&"end"!==r.className&&(setTimeout((function(){r.className="visited"}),10*n),n++)}))},a.animateSPNodes=function(e){var t=1;e.forEach((function(e){var n=a.tableElement.querySelector("#node_".concat(e.row,"_").concat(e.col));"start"!==n.className&&"end"!==n.className&&(setTimeout((function(){n.className="shortestPath"}),30*t),t++)}))},a.runAlgo=function(){a.algorithm&&a.startNode&&a.endNode?n(19)("./".concat(a.algorithm)).then((function(e){var t=new e.default(a.state.grid,a.startNode,a.endNode).run();a.animateAlgo(t.sp,t.visited)})):window.alert("Something's missing! Check if you placed both start and end nodes nad if you chose an algorithm")},a.state={grid:[]},a.nodeToPlace=v.WALL_NODE,a.startNode=null,a.endNode=null,a.mouseDown=!1,a.algorithm=null,a.tableElement=null,a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=g();this.tableElement=document.getElementById("grid"),this.setState({grid:e})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"main"},o.a.createElement("div",{id:"menu"},o.a.createElement(f,{selectNode:this.setNodeToPlace,nodes:v,runAlgo:this.runAlgo,clearBoard:this.clearBoard,updateAlgo:function(t){e.algorithm=t}})),o.a.createElement("div",{id:"grid"},o.a.createElement(m,{mouseEventHandler:this.mouseEventHandler,setMouseDownFalse:function(){return e.mouseDown=!1},setMouseDownTrue:function(){return e.mouseDown=!0},mouseDown:this.mouseDown,grid:this.state.grid})))}}]),t}(a.Component),g=function(){for(var e=[],t=0;t<17;t++){for(var n=[],a=0;a<70;a++)n.push({row:t,col:a,cost:1/0,path:null,isWall:!1});e.push(n)}return e};var w=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,3,4]]]);
//# sourceMappingURL=main.31585884.chunk.js.map