async function a1() {
  console.log("a1 start");
  await a2();
  await console.log("a1 end");
}
async function a2() {
  await console.log("a2");
}

console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise1");
});

a1();

let promise2 = new Promise((resolve) => {
  resolve("promise2.then");
  console.log("promise2");
});

promise2.then((res) => {
  console.log(res);
  Promise.resolve().then(() => {
    console.log("promise3");
  });
});

Promise.resolve().then(() => {
  console.log("promise4");
});

console.log("script end");

// 答案
// 主线程 -> 微 -> 微2 -> 宏

// 主线程：script start -> a1 start -> a2 -> promise2 -> script end
// 微： promise1 -> -> promise2.then -> promise4
// 微2：a1 end -> promise3
// 宏：setTimeout ->