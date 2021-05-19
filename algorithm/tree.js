
function proOrder(binaryTree) {
  if (!binaryTree) return;
  console.log(binaryTree.value);
  proOrder(binaryTree.left);
  proOrder(binaryTree.right);
}
