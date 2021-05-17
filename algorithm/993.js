// 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。

// 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。

// 我们给出了具有唯一值的二叉树的根节点 root ，以及树中两个不同节点的值 x 和 y 。

// 只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false。
// 示例：
// 输入：root = [1,2,3,null,4,null,5], x = 5, y = 4
// 输出：true

var a = (arr, x, y) => {
  // var arr = [root];
  var xId = arr.findIndex(i => i === x);
  var yId = arr.findIndex(i => i === y);
  console.log(xId, yId);
  if (xId + 1 === yId || xId - 1 === yId) return false;
  var x2 = xId.toString(2);
  var y2 = xId.toString(2);
  if (x2.length === y2.length) return true;
  return false;
}

console.log(a([1, 2, 3, null, 4], 4, 3))