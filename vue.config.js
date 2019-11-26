module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "/vmt": {
          target: "https://vmt.video.somo.tech/api/v1"
        },
        "/udb": {
          target: "https://udb.video.somo.tech/api/v1"
        },
        "/bill": {
          target: "https://billing.video.somo.tech/api/v1"
        }
      }
    },
    externals: {
      arg: "AgoraRTC"
    }
  }
};
