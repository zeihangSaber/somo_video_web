import { Post } from "@/Types";

const post: Post = {
    //全部活动列表
    actList: {
        url: "/vmt/act/list",
        defaultData: []
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
    }
};
export default post;
