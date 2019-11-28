import { Post } from "@/Types";

const post: Post = {
    actList: {
        url: "/vmt/act/list",
        defaultData: []
    },
    queryMid: {
        url: "/vmt/code/query",
        defaultData: ["uid", "dt", "cookie", "tenant"]
    }
};
export default post;
