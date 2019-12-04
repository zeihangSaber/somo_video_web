"use strict";
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
var __awaiter =
	(this && this.__awaiter) ||
	function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function(resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __generator =
	(this && this.__generator) ||
	function(thisArg, body) {
		var _ = {
				label: 0,
				sent: function() {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: []
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function() {
					return this;
				}),
			g
		);
		function verb(n) {
			return function(v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y["return"]
									: op[0]
									? y["throw"] || ((t = y["return"]) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
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
var axios_1 = __importDefault(require("axios"));
var config_1 = __importStar(require("./config"));
var post = {
	// 创建会议
	create: {
		url: "/vmt/create",
		defaultData: ["uid", "dt", "os", "device", "cookie"]
	},
	// 加入会议
	join: {
		url: "/vmt/join",
		defaultData: ["uid", "dt", "os", "device", "cookie"]
	},
	// 心跳
	heartBeat: {
		url: "/vmt/ping",
		defaultData: ["uid", "dt", "device", "mid"]
	},
	// 修改网络质量
	notifyNet: {
		url: "vmt/notify/net",
		defaultData: ["uid", "dt", "cookie", "device"]
	},
	// 离开会议
	leave: {
		url: "/vmt/leave",
		defaultData: ["uid", "dt", "device", "cookie"]
	},
	// 关闭会议
	close: {
		url: "/vmt/close",
		defaultData: ["uid", "dt", "device", "cookie"]
	},
	// 发短信通知某人
	invite: {
		url: "/vmt/invite",
		defaultData: ["uid", "dt", "cookie"]
	},
	// 呼叫
	call: {
		url: "/vmt/call",
		defaultData: ["uid", "dt", "cookie"]
	},
	// 锁定人数
	lock: {
		url: "/vmt/lock",
		defaultData: ["uid", "dt", "cookie"]
	},
	// 解锁人数
	unlock: {
		url: "/vmt/unlock",
		defaultData: ["uid", "dt", "cookie"]
	},
	// 开关麦
	tellYou: {
		url: "/vmt/mic/set",
		defaultData: ["uid", "dt", "device"]
	},
	// 某人开麦
	whoOpenMic: {
		url: "/vmt/audio/start",
		defaultData: ["uid", "dt", "device"]
	},
	// 某人关麦
	whoCloseMic: {
		url: "/vmt/audio/stop",
		defaultData: ["uid", "dt", "device"]
	},
	// 开关视频
	showYou: {
		url: "/vmt/camera/set",
		defaultData: ["uid", "dt", "device"]
	},
	// 某人开视频
	whoOpenVideo: {
		url: "/vmt/video/start",
		defaultData: ["uid", "dt", "device"]
	},
	// 某人关视频
	whoCloseVideo: {
		url: "/vmt/video/stop",
		defaultData: ["uid", "dt", "device"]
	},
	// 选择主视频
	itsYou: {
		url: "/vmt/video/select",
		defaultData: ["uid", "dt", "device", "cookie"]
	},
	// 独聊
	tack: {
		url: "/vmt/im/send",
		defaultData: ["uid", "dt", "device", "cookie"]
	},
	// 群聊
	broadcast: {
		url: "/vmt/im/broadcast",
		defaultData: ["uid", "dt", "device", "cookie"]
	},
	// 踢人
	kick: {
		url: "/vmt/admin/kick",
		defaultData: ["uid", "dt", "device", "cookie"]
	},
	// 设置角色
	roleSet: {
		url: "/vmt/admin/role/set",
		defaultData: ["uid", "dt", "device", "cookie"]
	},
	// 设置类型
	typeSet: {
		url: "/vmt/admin/type/set",
		defaultData: ["dt", "cookie"]
	},
	// 设置规则
	ruleSet: {
		url: "/vmt/admin/rule/set",
		defaultData: ["cookie"]
	},
	// 设置会议名
	nameSet: {
		url: "/vmt/admin/set/name",
		defaultData: ["cookie"]
	},
	// 设置密码
	pwdSet: {
		url: "/vmt/admin/set/password",
		defaultData: ["cookie"]
	},
	// 设置清晰度
	vqosSet: {
		url: "/vmt/admin/set/vqos",
		defaultData: ["cookie"]
	},
	// 分享屏幕
	sharing: {
		url: "/vmt/sharing/start",
		defaultData: ["uid", "dt", "cookie", "device"]
	},
	// 停止分享
	noSharing: {
		url: "/vmt/sharing/stop",
		defaultData: ["uid", "dt", "cookie", "device"]
	},
	// 通过code查询mid
	queryMid: {
		url: "/vmt/code/query",
		defaultData: ["uid", "dt", "cookie", "tenant"]
	}
};
var device = config_1.uuid();
var get = {
	getMidInfo: "/" + config_1.default.mid,
	getMidUserInfo: "/" + config_1.default.mid + "/users",
	getMidRuleInfo: "/" + config_1.default.mid + "/rules",
	getMidStatsInfo: "/" + config_1.default.mid + "/stats"
};
var str = config_1.getBrowserInfo().split("/");
function handleAxios(fn) {
	return function() {
		var arg = [];
		for (var _i = 0; _i < arguments.length; _i++) {
			arg[_i] = arguments[_i];
		}
		return fn.apply(void 0, arg).then(
			function(res) {
				if (res.status >= 200 && res.status < 400) {
					if (res.data.code === 0) return res.data.data;
					var _a = res.data,
						code = _a.code,
						msg = _a.msg;
					return {
						code: code,
						msg: msg
					};
				}
				throw res.statusText;
			},
			function(err) {
				return console.log(err);
			}
		);
	};
}
function getUrl(api) {
	var udb = api.includes("udb");
	var bill = api.includes("bill");
	var udbBaseApi = "https://udb.video.somo.tech/api/v1";
	var vmtBaseApi = "https://vmt.video.somo.tech/api/v1";
	var billBaseApi = "https://billing.video.somo.tech/api/v1";
	if (udb) {
		return "" + udbBaseApi + api;
	}
	if (bill) {
		return "" + billBaseApi + api;
	}
	return "" + vmtBaseApi + api;
}
var Ajax = /** @class */ (function() {
	function Ajax() {
		this.defaultParameter = {
			os: 3,
			device: device,
			dt: 2,
			model: str[0],
			osver: str[1],
			version: "3.0.0",
			uid: null,
			role: null,
			mid: null,
			tenant: null,
			cookie: null
		};
		this.env = "dev";
	}
	// 初始化信令系统
	Ajax.prototype.ajaxInit = function() {
		var _loop_1 = function(key) {
			if (key)
				this_1[key] = function(data) {
					var fn = handleAxios(axios_1.default.get);
					var url = getUrl(get[key]);
					return fn(url, {
						params: data
					});
				};
		};
		var this_1 = this;
		for (var key in get) {
			_loop_1(key);
		}
		this.postInit(post);
	};
	// 添加post请求
	Ajax.prototype.postInit = function(obj) {
		var _this = this;
		var _loop_2 = function(key) {
			if (key)
				this_2[key] = function(data) {
					var fn = handleAxios(axios_1.default.post);
					var url = _this.env === "dev" ? obj[key].url : getUrl(obj[key].url);
					var defaultData = {};
					if (obj[key].defaultData && obj[key].defaultData.length > 0) {
						for (var _i = 0, _a = obj[key].defaultData; _i < _a.length; _i++) {
							var k = _a[_i];
							defaultData[k] = _this.defaultParameter[k];
						}
					}
					return fn(url, __assign(__assign({}, defaultData), data));
				};
		};
		var this_2 = this;
		for (var key in obj) {
			_loop_2(key);
		}
	};
	// 设置租户
	Ajax.prototype.setTenant = function(tenant) {
		this.defaultParameter.tenant = tenant;
	};
	// 设置会议号
	Ajax.prototype.setMid = function(mid) {
		this.defaultParameter.mid = mid;
		this.getUserInfo();
	};
	// 设置uid
	Ajax.prototype.setUid = function(uid) {
		this.defaultParameter.uid = uid;
	};
	// 设置Role
	Ajax.prototype.setRole = function(role) {
		this.defaultParameter.role = role;
	};
	// 设置cookie
	Ajax.prototype.setCookie = function(cookie) {
		this.defaultParameter.cookie = cookie;
	};
	// 设置模式
	Ajax.prototype.setEnv = function(mode) {
		this.env = mode;
	};
	// 获取用户信息
	Ajax.prototype.getUserInfo = function() {
		return __awaiter(this, void 0, void 0, function() {
			var res;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [
							4 /*yield*/,
							handleAxios(axios_1.default.get)("/udb/uinfo/" + this.defaultParameter.uid)
						];
					case 1:
						res = _a.sent();
						this.defaultParameter = __assign(__assign({}, this.defaultParameter), {
							role: res.role,
							tenant: res.tenant
						});
						return [2 /*return*/];
				}
			});
		});
	};
	Ajax.send = function(data) {
		return handleAxios(axios_1.default)(data);
	};
	return Ajax;
})();
exports.default = Ajax;
