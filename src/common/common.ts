//保留两位小数
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

//设置活动时间
const setTime = (time: any): string => {
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
export { getNum, setTime };
