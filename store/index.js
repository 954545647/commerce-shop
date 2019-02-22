import Vue from "vue";
import vuex from "vuex";
import geo from "./modules/geo";
import home from './modules/menu'
import citys from './modules/city'
import hotplace from './modules/hotPlace'
Vue.use(vuex);
const store =  () =>
  new vuex.Store({
    modules: {
      geo,
      home,
      citys,
      hotplace
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        // 城市数据SSR渲染
        // const {
        //   status,
        //   data: { province, city }
        // } = await app.$axios.get("/geo/getPosition");
        // // console.log(province,city)
        // commit('geo/setPosition',status===200?{city,province}:{city:'',province:''})
        // commit('geo/setPosition',{city:this.localStorage.getItem('currentCity'),province:this.localStorage.getItem('currentPro')})

        // 首页菜单数据SSR渲染
        const {
          status:status2,
          data:{
            menu
          }
        } = await app.$axios.get('/geo/menu');
        commit('home/setMenu',status2===200?{menu}:{menu:''})

        // 热门地点数据SSR渲染
        // const {
        //   status:status3,
        //   data:{
        //     result
        //   }
        // } = await app.$axios.get('/search/hotPlace',{
        //   params:{
        //     city: app.store.state.geo.position.city.replace('市','')
        //   }
        // })
        // commit('home/setHotPlace',status3===200?result:[])


        // 切换城市省份数据SSR渲染
        // const {
        //   status: status4,
        //   data:{
        //     province:province1
        //   }
        // } = await app.$axios.get('/geo/province')
        // commit('citys/setCity',status4===200?province1:[])
      }
    },
  });

  export default store
