"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
var Agr = /** @class */ (function() {
	function Agr() {
		if (window["AgoraRTC"]) {
			this.AgoraRTC = window["AgoraRTC"];
			this.init();
		}
	}
	Agr.prototype.init = function() {
		this.client = this.AgoraRTC.createClient({
			mode: "rtc",
			codec: "h264"
		});
		this.client.init(config_1.default.appID);
	};
	return Agr;
})();
