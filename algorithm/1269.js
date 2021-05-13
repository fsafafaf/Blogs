// 1269. 停在原地的方案数

// 有一个长度为 arrLen 的数组，开始有一个指针在索引 0 处。
// 每一步操作中，你可以将指针向左或向右移动 1 步，或者停在原地（指针不能被移动到数组范围外）。
// 给你两个整数 steps 和 arrLen ，请你计算并返回：在恰好执行 steps 次操作以后，指针仍然指向索引 0 处的方案数。
// 由于答案可能会很大，请返回方案数 模 10^9 + 7 后的结果。
/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */

var numWays = function (steps, arrLen) {
  const MODULO = 1000000007;
  let max = Math.min((steps / 2 | 0), arrLen - 1)
  const dp = new Array(steps + 1).fill(0).map(() => new Array(max + 1).fill(0))
  dp[0][0] = 1;
  for (let i = 1; i <= steps; i++) {
    for (let j = 0; j <= max; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j - 1 >= 0) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MODULO
      }
      if (j + 1 <= max) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j + 1]) % MODULO
      }
    }
  }
  return dp[steps][0]
};