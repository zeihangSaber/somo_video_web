import once from "./once";
export default function (fn, cxt, time = 10000) {
    let timer;
    return (flag, ...arg) => {
        console.log('cxt~~~~~~~~~~~~~~~~~~~');
        if (flag) {
            if (!timer) {
                console.log('数据播空 开始重置播放器倒计时');
                timer = setTimeout(() => {
                    fn(...arg);
                    clearTimeout(timer);
                    timer = null;
                }, time)
            }
        } else {
            console.log('重新拿到数据 开始播放');
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }
    }
}
