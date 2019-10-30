// 获取当前是什么浏览器和当前版本号
export function getBrowserInfo() {
		var agent = navigator.userAgent.toLowerCase();
		var regStr_ie = /msie [\d.]+;/gi;
		var regStr_ff = /firefox\/[\d.]+/gi;
		var regStr_chrome = /chrome\/[\d.]+/gi;
		var regStr_saf = /safari\/[\d.]+/gi;
		//IE
		if (agent.indexOf("msie") > 0) {
			return agent.match(regStr_ie);
		}
		//firefox
		if (agent.indexOf("firefox") > 0) {
			return agent.match(regStr_ff);
		}
		//Safari
		if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
			return agent.match(regStr_saf);
		}
		//Chrome
		if (agent.indexOf("chrome") > 0) {
			return agent.match(regStr_chrome);
		}

	}
export const add_js = {
	// 获取当前是什么浏览器和当前版本号
	browserORverinfo: function() {
		var browserORverinfo = []
		browserORverinfo[0] =(getBrowserInfo()+"").replace(/[^a-z]/ig,"")
		browserORverinfo[1] =(getBrowserInfo()+"").replace(/[^0-9.]/ig,"")
		return browserORverinfo
	},
	// 获取随机数的uuid函数
	uuid: function() {
		const s = []
		const hexDigits = '0123456789abcdef'
		for (let i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
		}
		s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = '-'
		s[13] = '-'
		s[18] = '-'
		s[23] = '-'
		return s.join('')
	}
}
