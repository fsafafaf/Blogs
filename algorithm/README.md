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

> 队列是一种**先进显出**的数据结构，在 JS 中没有队列的数据结构，可以使用数组来实现队列的功能：`enqueue 入队` 和 `dequeue 出队`

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