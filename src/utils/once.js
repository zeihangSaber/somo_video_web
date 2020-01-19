export default function (fn) {
    let result;
    let n = 0;
    return function (...arg) {
        n++;
        if (n < 2) {
            result = fn(...arg);
        }
        return result;
    }
}
