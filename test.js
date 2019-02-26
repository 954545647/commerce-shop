import { homedir } from "os";
import { link } from "fs";
import { Button } from "element-ui";

export default {
  path: [
    {
      path: "/parent",
      component: () => import("@/components/parent.vue"),
      children: [
        {
          path: "child",
          component: () => import("@/components/child.vue")
        }
      ]
    },
    {
      path: "/home",
      name: home,
      component: () => import("@/components/home.vue")
    },
    {
      path: "/name_view",
      components: {
        default: () => import("@/components/child.vue"),
        email: () => import("@/components/email.vue"),
        tel: () => import("@/components/tel.vue")
      }
    },
    {
      path:'/argu/:name',
      name: 'argu',
      component: ()=>import('@/components/argu.vue')
    }
  ]
};

// window.AMap.plugin(["AMap.ToolBar", "AMap.OverView"], () => {
//   //异步加载插件
//   let toolbar = new window.AMap.ToolBar();
//   map.addControl(toolbar);
//   map.addControl(new window.AMap.OverView({ isOpen: true }));
//   let maker = new window.AMap.Marker({
//     icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
//     position: self.point
//   });
//   self.marker = marker;
//   marker.setMap(map);
// });
      // //实时路况图层
      // var trafficLayer = new window.AMap.TileLayer.Traffic({
      //   zIndex: 10
      // });
      // map.add(trafficLayer); //添加实时路况图层到地图

      // 添加点标记
      // function addMaker() {
      //   map.clearMap();
      //   marker = new AMap.Marker({
      //     map: map,
      //     position: self.point
      //   });
      // }

  // let {
      //   status,
      //   data: { count, pois }
      // } = await axios.get("/search/resultsByKeywords", {
      //   params: {
      //     keyword: self.$store.state.hotplace.hotName,
      //     city: self.$store.state.geo.position.city
      //   }
      // });

      // 获取当前城市地点的数据
      // const posis = pois
      //   .filter(item => item.photos.length)
      //   .map(item => {
      //     return {
      //       poi: item.location
      //     };
      //   });
      // 添加滚动条滚动事件
      // window.addEventListener("scroll", function(e) {
      //   //变量t就是滚动条滚动时，到顶部的距离
      //   var t = document.documentElement.scrollTop || document.body.scrollTop;
      //   if (t < 208.2) {
      //     self.isfix = false;
      //   } else {
      //     self.isfix = true;
      //   }
      //   if (t > 382) {
      //     let i = Math.floor((t - 382) / 170.8);
      //     // for(let i = Math.floor((t - 382) / 170.8); k < count; ){
      //     //   x = posis[k].poi.split(",")[0]
      //     //   y = posis[k].poi.split(",")[1]
      //     // }
      //     x = posis[0].poi.split(",")[0];
      //     y = posis[0].poi.split(",")[1];
      //     addMaker();
      //   }
      // });
      // var marker = new AMap.Marker({
      //   position: [x, y] //位置
      // });
      // map.add(marker); //添加到地图

      // 可以给点标记添加点击信息窗体
      // AMap.event.addListener(marker, "click", function() {
      //   console.log(1);
      //   infoWindow.open(map, marker.getPosition());
      // });

// // 实例化信息窗体
//       let title =
//         '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>';
//       let content = [];
//       content.push(
//         "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街"
//       );
//       content.push("电话：010-64733333");
//       content.push(
//         "<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>"
//       );
//       // 自定义窗体
//       let infoWindow = new AMap.InfoWindow({
//         isCustom: true, //使用自定义窗体,
//         // //信息窗体的内容可以是任意html片段
//         content: createInfoWindow(title, content.join("<br/>")),
//         offset: new AMap.Pixel(16, -45)
//       });

  // //构建自定义信息窗体
  //     function createInfoWindow(title, content) {
  //       let info = document.createElement("div");
  //       info.className = "custom-info input-card content-window-card";

  //       // 定义顶部标题
  //       var top = document.createElement("div");
  //       var titleD = document.createElement("div");
  //       var closeX = document.createElement("img");
  //       top.className = "info-top";
  //       titleD.innerHTML = title;
  //       closeX.src = "https://webapi.amap.com/images/close2.gif";
  //       closeX.onclick = closeInfoWindow;

  //       top.appendChild(titleD);
  //       top.appendChild(closeX);
  //       info.appendChild(top);

  //       // // 定义中部内容
  //       // var middle = document.createElement("div");
  //       // middle.className = "info-middle";
  //       // middle.style.backgroundColor = "white";
  //       // middle.innerHTML = content;
  //       // info.appendChild(middle);

  //       // // 定义底部内容
  //       // var bottom = document.createElement("div");
  //       // bottom.className = "info-bottom";
  //       // bottom.style.position = "relative";
  //       // bottom.style.top = "0px";
  //       // bottom.style.margin = "0 auto";
  //       // var sharp = document.createElement("img");
  //       // sharp.src = "https://webapi.amap.com/images/sharp.png";
  //       // bottom.appendChild(sharp);
  //       // info.appendChild(bottom);
  //       return info;
  //     }
      // //关闭信息窗体
      // function closeInfoWindow() {
      //   map.clearInfoWindow();
      // }
