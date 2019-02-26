// {
//   <!doctype html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
//     <title>自定义样式信息窗体</title>
//     <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"/>
//     <style>
//         html, body, #container {
//             height: 100%;
//             width: 100%;
//         }

//         .custom-input-card{
//             width: 18rem;
//         }

//         .custom-input-card .btn:last-child{
//             margin-left: 1rem;
//         }

//         .content-window-card{
//             position: relative;
//             width: 23rem;
//             padding: 0.75rem 0 0 1.25rem;
//             box-shadow: none;
//             bottom: 0;
//             left: 0;
//         }

//         .content-window-card p{
//             height: 2rem;
//         }
//     </style>
// <div id="container"></div>
// <div class="input-card custom-input-card">
//     <h4>打开/关闭信息窗体</h4>
//     <div class="input-item">
//         <input type="button" class="btn" value="打开信息窗体" onClick="javascript:openInfo()"/>
//         <input type="button" class="btn" value="关闭信息窗体" onClick="javascript:infoWindow.close()"/>
//     </div>
// </div>
// <div class="info">
//     信息窗体可在地图任意位置打开
// </div>
// <script type="text/javascript"
//         src="https://webapi.amap.com/maps?v=1.4.13&key=您申请的key值"></script>
// <script type="text/javascript">
//     var infoWindow;
//     var map = new AMap.Map("container", {
//         resizeEnable: true,
// 		center: [116.473188,39.993253],
//         zoom: 13
//     });

//     //在指定位置打开信息窗体
//     function openInfo() {
//         //构建信息窗体中显示的内容
//         var info = [];
//         info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
//         info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>高德软件</h4>");
//         info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
//         info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");

//         infoWindow = new AMap.InfoWindow({
//             content: info.join("")  //使用默认信息窗体框样式，显示信息内容
//         });

//         infoWindow.open(map, map.getCenter());
//     }


// }
