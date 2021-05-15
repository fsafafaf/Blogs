// 13.罗马数字转整数
/**
 * @param {string} s
 * @return {number}
 */
// 最蠢的办法，按位数一个个转
//时间 212 ms，内存 47.3 MB
const romanToInt1 = (s) => {
  var qian = [['MMM', 3000], ['MM', 2000], ['M', 1000]];
  var bai = [['CM', 900], ['DCCC', 800], ['DCC', 700], ['DC', 600], ['D', 500], ['CD', 400], ['CCC', 300], ['CC', 200], ['C', 100],];
  var shi = [['XC', 90], ['LXXX', 80], ['LXX', 70], ['LX', 60], ['L', 50], ['XL', 40], ['XXX', 30], ['XX', 20], ['X', 10],];
  var ge = [['IX', 9], ['VIII', 8], ['VII', 7], ['VI', 6], ['V', 5], ['IV', 4], ['III', 3], ['II', 2], ['I', 1],];
  const map = (arr) => {
    for (let [i, n] of arr) {
      if (s.indexOf(i) === 0) {
        s = s.replace(i, '');
        return n;
      }
    }
    return 0;
  }
  return map(qian) + map(bai) + map(shi) + map(ge);
};

// 进阶了一点，所以字符一起转化为数字
// 时间 180 ms，内存 45.3 MB
const romanToInt2 = (s) => {
  var romanMap = [
    ['MMM', 3000], ['MM', 2000], ['M', 1000],
    ['CM', 900], ['DCCC', 800], ['DCC', 700], ['DC', 600], ['D', 500], ['CD', 400], ['CCC', 300], ['CC', 200], ['C', 100],
    ['XC', 90], ['LXXX', 80], ['LXX', 70], ['LX', 60], ['L', 50], ['XL', 40], ['XXX', 30], ['XX', 20], ['X', 10],
    ['IX', 9], ['VIII', 8], ['VII', 7], ['VI', 6], ['V', 5], ['IV', 4], ['III', 3], ['II', 2], ['I', 1],
  ];
  let int = 0;
  for (let [i, n] of romanMap) {
    if (s.indexOf(i) === 0) {
      s = s.replace(i, '');
      int += n;
    }
  }
  return int;
};

// 优化版本：MMM,MM 可以用 'M' 1000 和 while 搭配 逐个转化，
// 除了特殊情况 CM, CD 这些，都可以拆分成基本罗马字符相加 例如： DCC: 700 = D:500 + C:100 +C:100
// 时间 164 ms，内存 43.4 MB
const romanToInt3 = (s) => {
  var romanMap = [
    ['M', 1000],
    ['CM', 900], ['D', 500], ['CD', 400], ['C', 100],
    ['XC', 90], ['L', 50], ['XL', 40], ['X', 10],
    ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],
  ];
  let int = 0;
  for (let [i, n] of romanMap) {
    while (s.indexOf(i) === 0) {
      s = s.replace(i, '');
      int += n;
    }
  }
  return int;
};

// 左加右减法
// 时间 156 ms，内存 43.8 MB
const romanToInt = (s) => {

  const getValue = (string) => {
    switch (string) {
      case 'I': return 1;
      case 'V': return 5;
      case 'X': return 10;
      case 'L': return 50;
      case 'C': return 100;
      case 'D': return 500;
      case 'M': return 1000;
    }
  }

  const arr = s.split('');
  let sum = 0;
  let num = getValue(arr[0]);
  for (let i = 0; i < arr.length; i++) {
    let nextNum = getValue(arr[i + 1])
    if (num < nextNum) {
      sum -= num;
    } else {
      sum += num;
    }
    num = nextNum
  }
  return sum;
};

console.log(romanToInt("MMMCDXLIII"))

























// const string thousands[] = {"", "M", "MM", "MMM"};
// const string hundreds[]  = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
// const string tens[]      = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
// const string ones[]      = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/integer-to-roman/solution/zheng-shu-zhuan-luo-ma-shu-zi-by-leetcod-75rs/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
console.log(romanToInt(58))