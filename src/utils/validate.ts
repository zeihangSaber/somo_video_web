//名字验证
export function validateName(rule: any, value: any, callback: (value?: any) => {}) {
	const reg = new RegExp(/^.{1,20}$/);
	if (value == "" || value == undefined || value == null) {
		return callback(new Error("请输入姓名"));
	} else {
		if (!reg.test(value) && value != "") {
			return callback(new Error("输入错误，请重新输入"));
		} else {
			return callback();
		}
	}
}

//手机验证
export function validatePhone(rule: any, value: any, callback: (value?: any) => {}) {
	const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if (value == "" || value == undefined || value == null) {
		return callback(new Error("请输入电话号码"));
	} else {
		if (!reg.test(value) && value != "") {
			return callback(new Error("输入错误，请重新输入"));
		} else {
			return callback();
		}
	}
}

export function validateEmail(rule: any, value: any, callback: (value?: any) => {}) {
	const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if (value == "" || value == undefined || value == null) {
		return callback(new Error("请输入邮箱"));
	} else {
		if (!reg.test(value) && value != "") {
			return callback(new Error("输入错误，请重新输入"));
		} else {
			return callback();
		}
	}
}

export function validateCompany(rule: any, value: any, callback: (value?: any) => {}) {
	if (value == "" || value == undefined || value == null) {
		return callback(new Error("请输入公司名称"));
	} else {
		return callback();
	}
}

export function validatePost(rule: any, value: any, callback: (value?: any) => {}) {
	if (value == "" || value == undefined || value == null) {
		return callback(new Error("请输入职位"));
	} else {
		return callback();
	}
}
