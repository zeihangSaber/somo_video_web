import { Antiquity } from "zeihang_saber";
import { Base64 } from "js-base64";
const { encode, decode } = Base64;
console.log(Antiquity.uuid())
const {cookie, uid, device, mid} = JSON.parse(decode(window.location.href.split("arguments=")[1]));
export const myMid = mid;
export default new Antiquity(uid, cookie, device);
