
// var arr = [2,4,6,8,10];
// const newArr = arr.filter(item => {
//     return item>5;
// })
// console.log(newArr);
// function

// var arr = [2,4,6,8,10,11];
// function filterLessThanFive(item) {
//     return item >5;
// }
// function filterOdd(item) {
//     return (item % 2) != 0
// }
// function filter(arr, testFucntion) {
//     var filterArr = [];
//     for (var i=0; i<arr.length; i++) {
//         if (testFucntion(arr[i])){
//             filterArr.push(arr[i]);
//         }
//     }
//     return filterArr;
// }
// console.log(filter(arr,function(item){
//     return (item % 2) != 0
// }))
var arr = [2,4,6,8,10,11];
Array.prototype.filter = function(testFucntion) {
    var filterArr = [];
    for (var i=0; i<arr.length;i++){
        if (testFucntion(this[i])) {
            filterArr.push(this[i]);
        }
    }
    return filterArr;
}
var newArr = arr.filter(function(item){
    return (item % 2) != 0
})
console.log(newArr);