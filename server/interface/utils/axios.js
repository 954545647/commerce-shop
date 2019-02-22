import axios from "axios";

let instance = axios.create({
  // process.env 属性返回一个包含用户环境信息的对象
  // baseURL:是基础URL
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 5000, //超时时间
  headers: {
  }
});

export default instance;
