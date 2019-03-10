export default  {
  // 配置mongodb连接数据库地址
  // mongodb的端口27017
  dbs: "mongodb://127.0.0.1:27017/meituan",

  // 配置redis地址
  redis: {
    get host() {
      return "127.0.0.1";
    },
    get port() {
      return 6379;
    }
  },

  // 配置 smtp邮箱服务
  smtp: {
    get host() {
      // 腾讯qq邮箱提供
      return "smtp.qq.com";
    },
    get user() {
      // qq帐号
      return "954545647@qq.com";
    },
    get pass() {
      // 授权码
      return "dyxatulseqgsbfad";
    },
    // 获取随机验证码
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase();
      };
    },
    // 验证码过期时间
    get expire() {
      return () => {
        return new Date().getTime() + 1 * 30 * 1000;
      };
    }
  }
};
