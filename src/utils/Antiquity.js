import { Antiquity } from "zeihang_saber";
import { Base64 } from "js-base64";
const { encode, decode } = Base64;
console.log(window.location.href.split("arguments=")[1]);
let {cookie, uid, device, mid, password, meetingStatus, camera, mic} = JSON.parse(decode(window.location.href.split("arguments=")[1]));
console.log(cookie)
export const myDevice = device;
export const myCookie = cookie;
export const myMid = mid;
export const myCamera = camera;
export const myMic = mic;
export const Password = password;
export const MeetingStatus = meetingStatus;
export default new Antiquity(uid, cookie, device);
