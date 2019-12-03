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
				},
				"/file": {
					target: "https://file.video.somo.tech/api/v1/file/image/upload"
				}
			}
		},
		externals: {
			arg: "AgoraRTC"
		}
	},
	chainWebpack: config => {
		config.module
			.rule("swf")
			.test(/\.swf$/)
			.use("url-loader")
			.loader("url-loader")
			.end();
	}
};
