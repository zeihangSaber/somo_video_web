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
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_1 = require("./lib/socket");
var ajax_1 = __importDefault(require("./lib/ajax"));
var RtmpStreamer_1 = __importDefault(require("./lib/RtmpStreamer"));
var Somo = /** @class */ (function(_super) {
	__extends(Somo, _super);
	function Somo() {
		return (_super !== null && _super.apply(this, arguments)) || this;
	}
	Somo.prototype.init = function() {
		this.ajaxInit();
	};
	Somo.prototype.initStreamer = function(options) {
		var streamer = new RtmpStreamer_1.default(options, this);
	};
	Somo.prototype.joinMid = function() {
		var _this = this;
		var arg = [];
		for (var _i = 0; _i < arguments.length; _i++) {
			arg[_i] = arguments[_i];
		}
		return this.join.apply(this, arg).then(function(res) {
			_this.socket = new socket_1.Socket(
				{
					uid: _this.defaultParameter.uid,
					mid: res.mid,
					cookie: _this.defaultParameter.cookie,
					device: _this.defaultParameter.device,
					dt: _this.defaultParameter.dt
				},
				_this
			);
		});
	};
	Somo.prototype.leaveMid = function() {
		var _this = this;
		var arg = [];
		for (var _i = 0; _i < arguments.length; _i++) {
			arg[_i] = arguments[_i];
		}
		return this.leave.apply(this, arg).then(function(res) {
			_this.socket.clone();
			_this.socket = null;
			_this.setMid(null);
		});
	};
	// ajax原型
	Somo.ajax = ajax_1.default;
	return Somo;
})(ajax_1.default);
exports.default = Somo;
