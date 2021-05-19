# leetCode 刷题记录

- [1269. 停在原地的方案数](./1269.js)
- [12. 整数转罗马数字](./12.js)
- [13. 罗马数字转整数](./13.js)
- [421. 数组中两个数的最大异或值](./421.js)

# 前端常见数据结构

## 栈

> 栈是一种**先进后出**的数据结构，在 JavaScript 中没有栈的结构，但是可以用数组来实现栈的所有功能：`push 入栈`和 `pop 出栈`

### 代码实现

```JS
function Stack() {
  this.stack = [];
  this.push = funtion(item) {
    this.stack.push(item)
  };
  this.push = funtion(item) {
    this.stack.pop(item)
  };
}
```

### 应用场景

**函数调用堆栈**：函数在执行过程中，最先执行的函数会在最后执行完成；

## 队列

> 队列是一种**先进先出**的数据结构，在 JS 中没有队列的数据结构，可以使用数组来实现队列的功能：`enqueue 入队` 和 `dequeue 出队`

### 代码实现

```JS
function Quene() {
  this.quene = [];
  this.enqueue = function (item) {
    this.quene.push(item);
  }
  this.dequeue = function () {
    this.quene.shift(item);
  }
}
```

### 应用场景

**JS 任务队列**：eventLoop 事件循环中的任务队列，先进的先执行，后进的后执行

## 链表

> 链表也是由多个元素组成的列表，但是与队列和栈不同的是，链表的存储是不联系的，而是使用 next 指向下一个元素。在链表中，我们需要添加删除元素，只需要修改 next 指针即可。在 js 中我们可以用 object 来模拟链表

### 代码实现

```JS
function LinkList(val) {
  // 创建一个节点
  function _createNode (val) {
    return {
      val: val,
      next: null,
    }
  }

  this.head = _createNode(val);
  this.tail = this.head;

  // 查找
  this.find = function (val) {
    let node = this.head;
    while (node) {
      if (val === node.val) {
        return node;
      }
      node = node.next;
    }
    return null;
  }

  // 在 node 节点后插入节点
  this.insert = function (insertVal, val) {
    const insertNode = _createNode(insertVal)
    if (val && this.find(val).next) {
      const node = this.find(val);
      // 先把后面给连住
      insertNode.next = node.next;
      // 再连接前面
      node.next = insertNode
    } else {
      this.tail.next = insertNode;
      this.tail = insertNode;
    }
  }
}
```

### 应用场景

**原型链**：链表中用 next 来连接下一个元素，而原型链则使用 `__proto__` 属性来连接原型对象

## 集合

> 集合是一种**无序且唯一**的数据结构，在 JS 中，可以用 es6 的 Set 对象直接创建一个集合

```JS
// es6 中专门的数据结构
const set = new Set();
```

### 应用场景

- 数组去重
  - [...new Set(arr)]
  - Array.from(new Set(arr));
- 数组判断、删除等操作
  - 判断数组中是否存在一个值：Set.prototype.has
  - 删除数组中的一个值：Set.prototype.delete

## 字典

> 字典也是一种存储唯一值的数据结构，但是以**键值对**的方式进行存储。在 JS 中，我们可以用 es6 的 Map 方法直接创建一个字典

```JS
// es6 中专门的数据结构
const map = new Map();
```

### 应用场景

用来存储数据

### 与其他结构的区别

1. 与 Object 的区别

- 有序性：Map 是按照原有的添加顺序排序，而 Object 会根据 key 自动排序
- 可遍历性：Map 实现了迭代器，可以通过 for of 进行遍历
- Map 可以直接获取长度

2. 与 Set 的区别

- Set 只有 key ，而且是唯一，Map 则存储了 key value
- Map 展开后每项格式为 [key, value]

## 树

> 树是一种**分层**数据的抽象模型，在 JS 中没有树的数据结构，我们可以用 Object 来模拟

### JS 模拟结构

```JS
const treeData = {
  value: '1',
  children: [
    {
      value: '1-1',
      children: [
        {
          value: '1-1-1',
          children: []
        },
        {
          value: '1-1-2',
          children: [
            {
              value: '1-1-2-1',
              children: []
            }
          ]
        },
      ],
    },
    {
      value: '1-2',
      children: [
        {
          value: '1-2-1',
          children: [],
        },
      ],
    },
  ],
}
```

#### 深度优先遍历

> 深度优先遍历即有 children 就继续遍历，直到这个节点下没有 children 了，再遍历下一个节点

```JS
function des(root) {
  console.log(root.value);
  if(!root.children) return;
  root.children.forEach(item => des(item))
}
```

#### 广度优先遍历

> 广度优先遍历是优先遍历子节点，子节点遍历完之后再遍历子节点的子节点，以此类推

广度优先遍历流程：
1. 创建一个数组，将根节点设置为第一项；
2. 将数组的第一项弹出并访问；
3. 遍历弹出节点的 children, 将其依次插入到数组中；
4. 重复 2、3 步，直到数组为空；


```JS
function bfs(root) {
  var arr = [root];
  var node;
  while (node = arr.shift()) {
    console.log(node.value);
    node.children.forEach(item => arr.push(item))
  }
}
```

### 二叉树
> 树种每个节点最多只能有两个节点，通常用 Object 来模拟一个二叉树 ，二叉树的遍历有先、中、后序遍历三种

模拟二叉树的数据结构
```JS
const binaryTreeData = {
  value: 'root',
  left: {
    value: 'left',
    left: {
      value: 'left-left',
      left: null,
      right: null,
    },
    right: {
      value: 'left-right',
      left: null,
      right: null,
    }
  },
  right: {
    value: 'right',
    left: {
      value: 'right-left',
      left: null,
      right: null,
    },
    right: {
      value: 'right-right',
      left: null,
      right: null,
    },
  }
}
```

#### 先序遍历

> 根节点 -> 左子树先序遍历 -> 右子树先序遍历

利用了函数调用栈的特性：后进先出（类似于深度遍历，left在前，right在后）
```JS
function proOrder(binaryTree) {
  if (!binaryTree) return;
  console.log(binaryTree.value);
  proOrder(binaryTree.left);
  proOrder(binaryTree.right);
}
```

#### 中序遍历

> 左子树中序遍历 -> 根节点 -> 右子树中序遍历

```JS
function inOrder(binaryTree) {
  if (!binaryTree) return;
  inOrder(binaryTree.left);
  console.log(binaryTree.value);
  inOrder(binaryTree.right);
}
```

#### 后序遍历

> 左子树后序遍历 -> 右子树后序遍历 -> 根节点，即：

```JS
function postOrder(binaryTree) {
  if (!binaryTree) return;
  postOrder(binaryTree.left);
  postOrder(binaryTree.right);
  console.log(binaryTree.value);
}
```


### 应用场景

**domTree、vDom**
在浏览器的 dom 结构和 react、vue 这类框架中的虚拟 dom 都应用到了树这个数据结构来表示页面元素之间的关系