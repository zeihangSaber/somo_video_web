import { Post } from "@/Types";

const post: Post = {
    actList: {
        url: "/vmt/act/list",
        defaultData: []
    },
    regCode: {
        url: "/udb/user/reg/code",
        defaultData: ["device"]
    },
    register: {
        url: "udb/user/reg",
        defaultData: []
    },
    queryMid: {
        url: "/vmt/code/query",
        defaultData: ["uid", "dt", "cookie", "tenant"]
    },
    login: {
        url: "/udb/login",
        defaultData: []
    }
};
export default post;
