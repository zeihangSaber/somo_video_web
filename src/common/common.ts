let checkout = (code: number): any => {
	if (code === 2001) {
		return alert("会议不存在");
	}
	if (code === 2002) {
		return alert("加入失败，会议已结束");
	}
	if (code === 2003) {
		return alert("加入失败，人员已满");
	}
	if (code === 2004) {
		return alert("加入失败，会议已锁定");
	}
	if (code === 2008) {
		return alert("余额不足，请关注【蓝猫微会】公众号联系客服及时续费");
	}
};
//保留两位小数
import moment from "moment";
// 保留两位小数
let getNum = (x: any): string | boolean => {
	x = x / 100;
	let f: any = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf(".");
	if (rs < 0) {
		rs = s.length;
		s += ".";
	}
	while (s.length <= rs + 2) {
		s += "0";
	}
	return s;
};
// 按照格式过滤时间
const format = (value: any, arg: string = "YYYY/MM/DD HH:mm:ss"): string => {
	return moment(value).format(arg);
};

//设置活动时间
const setTime = (time: number): string => {
	// 获取当前日期
	const date = new Date(time);

	// 获取当前月份
	const nowMonth = `0${date.getMonth() + 1}`.slice(-2);

	// 获取当前是几号
	const strDate = `0${date.getDate()}`.slice(-2);

	// 时
	const hours = `0${date.getHours()}`.slice(-2);

	// 分
	const minutes = `0${date.getMinutes()}`.slice(-2);

	// 秒
	const seconds = `0${date.getSeconds()}`.slice(-2);
	// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
	return `${nowMonth}/${strDate} ${hours}:${minutes}`;
};
const detailTime = (time: number): string => {
	// 获取当前日期
	const date = new Date(time);

	// 获取当前月份
	const nowMonth = `0${date.getMonth() + 1}`.slice(-2);

	// 获取当前是几号
	const strDate = `0${date.getDate()}`.slice(-2);

	// 时
	const hours = `0${date.getHours()}`.slice(-2);

	// 分
	const minutes = `0${date.getMinutes()}`.slice(-2);

	// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
	return `${date.getFullYear()}年${nowMonth}月${strDate}日${hours}:${minutes}`;
};
export { getNum, setTime, detailTime, checkout, format };
