import { Antiquity } from "zeihang_saber";
import { Base64 } from "js-base64";
const { encode, decode } = Base64;
const {cookie, uid, device, mid, password, meetingStatus} = JSON.parse(decode(window.location.href.split("arguments=")[1]));

export const myMid = mid;
export const Password = password;
export const MeetingStatus = meetingStatus;
export default new Antiquity(uid, cookie, device);
