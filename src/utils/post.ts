import { Post } from "@/Types";

const post: Post = {
	//全部活动列表
	actList: {
		url: "/vmt/act/list",
		defaultData: []
	},
	addAct: {
		url: "/vmt/act/add",
		defaultData: ["uid", "dt", "cookie", "tenant"]
	},
	//查询用户的付费活动
	singUpList: {
		url: "/vmt/act/signup/list",
		defaultData: ["dt", "uid", "cookie"]
	},
	//查询单个活动的付费情况
	singUpCheck: {
		url: "/vmt/act/signup/check",
		defaultData: ["dt", "uid", "cookie"]
	},
	//报名参加活动
	signUp: {
		url: "/vmt/act/signup",
		defaultData: ["cookie", "uid", "dt"]
	},
	//注册获取验证码
	regCode: {
		url: "/udb/user/reg/code",
		defaultData: ["device"]
	},
	//注册
	register: {
		url: "/udb/user/reg",
		defaultData: []
	},
	//邮箱登录获取验证码
	emailCode: {
		url: "/udb/login/email/code",
		defaultData: []
	},
	//手机登录获取验证码
	mobileCode: {
		url: "/udb/login/mobile/code",
		defaultData: []
	},
	//邮箱登录
	emailLogin: {
		url: "/udb/login/email",
		defaultData: ["os", "device"]
	},
	//手机登录
	mobileLogin: {
		url: "/udb/login/mobile",
		defaultData: ["os", "device"]
	},
	//账号密码登录
	login: {
		url: "/udb/login",
		defaultData: ["dt", "os", "device"]
	},
	queryMid: {
		url: "/vmt/code/query",
		defaultData: ["uid", "dt", "cookie", "tenant", "device"]
	},
	//二维码code
	qrcodeCode: {
		url: "/udb/login/qrcode/code",
		defaultData: ["device", "dt", "os"]
	},
	//二维码时间
	qrcodeQuery: {
		url: "/udb/login/qrcode/query",
		defaultData: ["dt", "device"]
	},
	uploadImg: {
		url: "/file/image/upload",
		defaultData: ["uid", "cookie", "device", "dt"]
	}
};
export default post;
