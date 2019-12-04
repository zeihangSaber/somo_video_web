"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
	wsUrl: "wss://vmtws.video.somo.tech/api/v1/vmt/ws",
	uuid: uuid(),
	mid: 0,
	appID: "2a89a275a9fe442784041d0468b0fa5b",
	// 实例
	client: null
};
// 事件类型
exports.events = {
	2: "joinMid",
	3: "leaveMid",
	4: "kickExpire",
	6: "setRole",
	7: "kick",
	8: "lockMid",
	9: "closeMid",
	10: "startShare",
	11: "stopShare",
	12: "kickPreShare",
	20: "setMic",
	21: "setCamera",
	23: "setRule",
	25: "setSpeaker",
	41: "getMsg",
	65: "pwdChange",
	66: "nameChange"
};
function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = "-";
	s[13] = "-";
	s[18] = "-";
	s[23] = "-";
	return s.join("");
}
exports.uuid = uuid;
function getOS() {
	var isWin = navigator.platform === "Win32" || navigator.platform === "Windows";
	var isMac =
		navigator.platform === "Mac68K" ||
		navigator.platform === "MacPPC" ||
		navigator.platform === "Macintosh" ||
		navigator.platform === "MacIntel";
	if (isMac) return "Mac";
	var isUnix = navigator.platform === "X11" && !isWin && !isMac;
	if (isUnix) return "Unix";
	var isLinux = String(navigator.platform).indexOf("Linux") > -1;
	if (isLinux) return "Linux";
	if (isWin) return "Windows";
	return "other";
}
exports.getOS = getOS;
function getBrowserInfo() {
	var agent = navigator.userAgent.toLowerCase();
	var regStr_ie = /msie [\d.]+;/gi;
	var regStr_ff = /firefox\/[\d.]+/gi;
	var regStr_chrome = /chrome\/[\d.]+/gi;
	var regStr_saf = /safari\/[\d.]+/gi;
	var final;
	// IE
	if (agent.indexOf("msie") > 0) {
		final = agent.match(regStr_ie);
	}
	// firefox
	if (agent.indexOf("firefox") > 0) {
		final = agent.match(regStr_ff);
	}
	// Safari
	if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
		final = agent.match(regStr_saf);
	}
	// Chrome
	if (agent.indexOf("chrome") > 0) {
		final = agent.match(regStr_chrome);
	}
	return final[0];
}
exports.getBrowserInfo = getBrowserInfo;
exports.default = config;
