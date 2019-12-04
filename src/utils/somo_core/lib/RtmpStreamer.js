"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
var rtmp_streamer_1 = __importDefault(require("rtmp-streamer"));
var object;
var embed;
var streamer;
var strArr = [
	"publish",
	"disconnect",
	"setScreenSize",
	"setCamMode",
	"setCamFrameInterval",
	"setCamQuality",
	"setMicQuality",
	"setMicRate",
	"fuck"
];
var Streamer = /** @class */ (function() {
	function Streamer(options, client) {
		this.client = client;
		if (!object) {
			object = document.createElement("object");
			embed = document.createElement("embed");
			embed.setAttribute("src", options.src);
			embed.setAttribute("width", options.width);
			embed.setAttribute("height", options.height);
			embed.setAttribute("type", "application/x-shockwave-flash");
			embed.setAttribute("quality", "high");
			embed.setAttribute("allowScriptAccess", "always");
			object.appendChild(embed);
			streamer = new rtmp_streamer_1.default(embed);
		}
		this.dom = object;
		this.init();
	}
	Streamer.prototype.init = function() {
		var _this = this;
		this.client.streamerDom = this.dom;
		strArr.forEach(function(key) {
			_this.client[key] = _this[key];
		});
	};
	Streamer.prototype.publish = function(url, name) {
		streamer.publish(url, name);
	};
	Streamer.prototype.disconnect = function() {
		streamer.disconnect();
	};
	Streamer.prototype.setScreenSize = function(w, h) {
		streamer.setScreenSize(w, h);
	};
	Streamer.prototype.setCamMode = function(w, h, fps) {
		streamer.setCamMode(w, h, fps);
	};
	Streamer.prototype.setCamFrameInterval = function(frameInterval) {
		streamer.setCamFrameInterval(frameInterval);
	};
	Streamer.prototype.setCamQuality = function(bandwidth, quality) {
		streamer.setCamQuality(bandwidth, quality);
	};
	Streamer.prototype.setMicQuality = function(quality) {
		streamer.setMicQuality(quality);
	};
	Streamer.prototype.setMicRate = function(rate) {
		streamer.setMicRate(rate);
	};
	return Streamer;
})();
exports.default = Streamer;
