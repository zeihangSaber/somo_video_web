import Somo from "somo-fir";
import post from "@/utils/post";
const Ajax = new Somo();
Ajax.postInit(post);
Ajax.setEnv("pro");
export default Ajax;
