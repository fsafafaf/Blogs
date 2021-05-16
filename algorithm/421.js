//421. 数组中两个数的最大异或值
// 给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。

// 进阶：你可以在 O(n) 的时间解决这个问题吗？
/**
 * @param {number[]} nums
 * @return {number}
 */
// 逐个计算，比较最大值，ruduce用法
// 时间 848 ms, 内存 40.4 MB
 var findMaximumXOR = function(nums) {
  const len = nums.length;
  const maximumXOR = nums.reduce((total,current,index) => {
      for (let i = index; i< len; i++) {
          total = Math.max(total, current ^ nums[i])
      }
      return total
  }, 0)
  return maximumXOR
};

// 两层 for 循环，效率比 reduce 快
var findMaximumXOR = function (nums) {
  const len = nums.length;
  let x = 0
  for (let i = 0; i < len; i++) {
      for (let j = i; j < len; j++) {
          x = Math.max(x, nums[i] ^ nums[j])
      }
  }
  return x
};