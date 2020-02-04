export default function (fn) {
    let count = 0;
    let timer = null;
    return (...arg) => {
        count = count + 1;
        if (!timer) {
            timer = setTimeout(() => {
                count = 0;
                clearTimeout(timer);
                timer = null;
            }, 300)
        }
        if(count === 2) {
            count = 0;
            clearTimeout(timer);
            timer = null;
            fn(...arg);
        }
    }
}