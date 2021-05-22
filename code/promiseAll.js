/**
 * 实现一个 Promise.all
 */

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    let resolvedCounter = 0;
    let promiseNum = promises.length;
    let resolvedValues = new Array(promiseNum);
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          resolvedCounter++;
          resolvedValues[i] = value;
          if (resolvedCounter === promiseNum) {
            return resolve(resolvedValues);
          }
        },
        (reason) => {
          return reject(reason);
        }
      )
    }
  })
}