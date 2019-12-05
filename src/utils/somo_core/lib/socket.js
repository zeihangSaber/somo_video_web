"use strict";
var __extends =
	(this && this.__extends) ||
	(function() {
		var extendStatics = function(d, b) {
			extendStatics =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function(d, b) {
						d.__proto__ = b;
					}) ||
				function(d, b) {
					for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
				};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
		};
	})();
var __assign =
	(this && this.__assign) ||
	function() {
		__assign =
			Object.assign ||
			function(t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};
var __importStar =
	(this && this.__importStar) ||
	function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
		result["default"] = mod;
		return result;
	};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importStar(require("./config"));
var js_base64_1 = require("js-base64");
var encode = js_base64_1.Base64.encode,
	decode = js_base64_1.Base64.decode;
var EventEmitter = require("events");
// 心跳计时器
var Interval = null;
var IntervalHttp = null;
// 计时器组
var timeGroup = [];
// 事件池上限
var poolLimit = 50;
// 事件池
exports.eventPool = [];
var tick = 1;
var Socket = /** @class */ (function(_super) {
	__extends(Socket, _super);
	function Socket(data, client) {
		var _this = _super.call(this) || this;
		_this.ws = null;
		// 心跳包的频率
		_this.heartBitHz = 10000;
		_this.heartBitHzHttp = 3000;
		// 重连的频率
		_this.reconnectHz = 3000;
		_this.socketParameter = __assign({}, data);
		_this.client = client;
		_this.createWebSocket();
		return _this;
	}
	Socket.prototype.createWebSocket = function() {
		var _this = this;
		var fn = function() {
			timeClear();
			_this.ws = new WebSocket(config_1.default.wsUrl);
			_this.ws.onopen = function() {
				console.log("链接成功...");
				var data = encode(JSON.stringify(_this.socketParameter));
				var ping = JSON.stringify({
					command: "ping",
					data: data
				});
				timeClear();
				_this.ws.send(ping);
				_this.client.heartBeat({
					tick: tick++
				});
				// 心跳包
				Interval = setInterval(function() {
					_this.ws.send(ping);
				}, _this.heartBitHz);
				// 心跳包
				IntervalHttp = setInterval(function() {
					_this.client.heartBeat({
						tick: tick++
					});
				}, _this.heartBitHzHttp);
				_this.init();
			};
			_this.ws.onerror = function(err) {
				console.log("链接失败...", err);
				timeClear();
				timeGroup[0] = setTimeout(function() {
					console.log("websocket重连中");
					fn();
				}, _this.reconnectHz);
			};
		};
		fn();
	};
	Socket.prototype.init = function() {
		var _this = this;
		this.ws.onmessage = function(res) {
			var saber = JSON.parse(res.data);
			var eventId = saber.eventId,
				data = saber.data;
			var lancer = JSON.parse(decode(data));
			var fnName = config_1.events[lancer.event];
			// 判断用户是否绑定了事件
			var fn = _this.client[fnName];
			if (typeof fn === "function") {
				fn(lancer);
			} else {
				console.log("\u8BF7\u7ED1\u5B9A " + fnName + " \u65B9\u6CD5", lancer);
			}
			// this.emit(events[lancer.event], lancer)
			_this.send(eventId);
		};
		this.ws.onclose = function() {
			timeClear();
			console.log("关闭连接");
		};
	};
	Socket.prototype.send = function(event) {
		var data = __assign(__assign({}, this.socketParameter), { event: event });
		var ack = JSON.stringify({
			command: "event_ack",
			data: encode(JSON.stringify(data))
		});
		this.ws.send(ack);
		handlePool(event);
	};
	Socket.prototype.close = function() {
		this.ws.close();
	};
	return Socket;
})(EventEmitter);
exports.Socket = Socket;
// 清除所有计时器
function timeClear() {
	clearInterval(Interval);
	clearInterval(IntervalHttp);
	timeGroup.forEach(function(item) {
		return clearTimeout(item);
	});
}
// 更换事件池水
function handlePool(id) {
	if (exports.eventPool.length > poolLimit) {
		exports.eventPool.shift();
	}
	exports.eventPool.push(id);
}
