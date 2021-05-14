// 12. 整数转罗马数字
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const [M, m] = [num % 1000, num / 1000 | 0];
  const [D, d] = [M % 500, M / 500 | 0];
  const [C, c] = [D % 100, D / 100 | 0];
  const [L, l] = [C % 50, C / 50 | 0];
  const [X, x] = [L % 10, L / 10 | 0];
  const [V, v] = [X % 5, X / 5 | 0];
  const i = V;

  const map = (number, type) => {
    let string = ''
    for (let i = 1; i <= number; i++) {
      string += type
    }
    return string;
  }

  let mString = map(m, 'M');
  let dString = '';
  let cString = '';
  let lString = '';
  let xString = '';
  let vString = '';
  let iString = '';
  if (M / 100 | 0 === 9) {
    dString = 'CM'
  } else {
    if (d > 0) dString = 'D';
    if (D === 400) {
      cString = 'CD'
    } else {
      cString = map(c, 'C')
    }
  }
  if (C / 10 | 0 === 9) {
    lString = 'XC'
  } else {
    if (l > 0) lString = 'L';
    if (L === 40) {
      xString = 'XL'
    } else {
      xString = map(x, 'X')
    }
  }
  if (X === 9) {
    vString = 'IX'
  } else {
    if (v > 0) vString = 'V';
    if (V === 4) {
      iString = 'IV'
    } else {
      iString = map(i, 'I')
    }
  }
  return mString + dString + cString + lString + xString + vString + iString;
};