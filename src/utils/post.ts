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
    }
};
export default post;
