// 参考网址: https://juejin.im/post/5da1a04ae51d45783d6122bf

// avarage
const avarage = (...nums) => {
  nums.reduce((acc, val) => { acc + val, 0 })
}

// averageBy
const averageBy = (arr, fn) => {
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc +val, 0)
}

// 交换元素
const swap = (v1, v2, context) => {
  [context[v1], context[v2]] = [context[v2], context[v1]]
}

// 转字符串
const join = (separator, ...list) => {
  return list.join(separator);
}

const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
}
difference([1, 2, 3])

const indexOfAll = (arr, val) => {
  return arr.reduce((acc, el, i) => {
    if (el === val) acc.push(i);
    return acc;
  }, []);
};

const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => s.has(fn(x)));
}

// 输出数组中出现最多的元素和次数
const maxEleNums = (arr) => {
  if (!Array.isArray(arr) && arr.length === 0) return
  let maxNum = 0
  let maxItem
  // let res = {}
  // arr.forEach(ele => {
  //   res[ele] ? res[ele]++ : res[ele] = 1
  //   if (res[ele] > maxNum) {
  //     maxNum = res[ele]
  //     maxItem = ele
  //   }
  // });
  arr.reduce((res, currentItem) => {
    res[currentItem] ? res[currentItem]++ : res[currentItem] = 1
    if (res[currentItem] > maxNum) {
      maxNum = res[currentItem]
      maxItem = currentItem
    }
    return res
  }, {})
}

// 100阶台阶一次走一步或两步多少种走法
// 斐波那契数列
const stepQuestion = (stepNum) => {
  let n1 = 1
  let n2 = 2
  let res = 0
  for (let i = 2; i < stepNum; i++) {
    res = n1 + n2
    n1 = n2
    n2 = res
  }
}

// 递归实现
const stepRec = (stepNum) => {
  if (stepNum === 1 || stepNum === 2) {
    return stepNum
  }
  return stepRec(stepNum - 1) + stepRec(stepNum - 2)
}

// 生成树形结构的对象
const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item =>
      ({
        ...item,
        children: nest(items, item.id)
      })
    )

const nest1 = (items, id = null, key = 'parent_id') => {
  let idArrr = items.filter(item => item[key] === id)
  return idArrr.map(item => {
    item.children = nest(items, item.id)
    return item
  })
}

const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

// 缓存函数
const memoize = fn => {
  const cache = new Map();
  const cached = function (val) {
    if (cache.has(val)) cache.set(val, fn.call(this, val));
    return cache.get(val)
  }
  cache.cache = cache;
  return cached;
}

const once = fn => {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.call(this, arguments);
    }
  }
}

const flattenObject = (obj, prefix = '') => {
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix ? prefix + '.' : '';
    if (typeof obj[k] === 'object') {
      Object.assign(acc, flattenObject(obj));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {})
}
flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

const unflattenObject = (obj) => {
  return Object.keys(obj).reduce((acc, k) => {
    if (k.indexOf('.') !== -1) {
      const keys = k.split('.');
      const preStr = keys.map((v, i) => {
        return `{"${v}":`
      }).join('')
      let jsonStr = preStr + obj[k] + '}'.repeat(keys.length)
      Object.assign(acc, JSON.parse(jsonStr));
    } else {
      acc[k] = obj[k];
    }
    return acc;
  }, {})
}

const decapitalize = ([first, ...rest]) => {
  first.toLowerCase() + rest.join('')
}

// equals：全等判断
const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
}

const escapeHTML = str => {
  return str.replace(/[&<>'"]/g, tag => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag
  })
}

// 获取中位数: https://liuhao.im/chinese/2016/07/22/median-of-two-sorted-arrays.html
const cache = Object.create(null);

// 请把<ul><li>第1行</li><li>第2行</li>...</ul>（ul之间有10个li元素）插入body里面
var lis = ''
var liLen = 10
var ul = document.createElement("ul")
for (let i = 0; i < liLen; i++) {
  lis += "<li>第" + i + "行</li>";
}
ul.innerHTML = lis;
document.body.appendChild(ul);

// 不使用loop循环，创建一个长度为100的数组，并且每个元素的值等于它的下标。
var a = new Array(100).join(',').split(',').map((item, index) => {
  return index
})

// 实现对数组进行乱序
sign = a.sort((a, b) => {
  sign = (Math.random() > 0.5) ? 1 : -1;
  return (a - b) * sign;
})

//
[...new Set([1, 2, 1, 1])]

// 翻转字符串

function recv(str) {
  let strArr = str.split('');
  let tempArr = [];
  for (let i = strArr.length - 1; i >= 0; i++) {
    tempArr.push(strArr[i]);
  }
  return tempArr.join('')
}
// https://juejin.im/post/5d68f836f265da03992988ae
// 排序
function quickSort(array) {
  if (array.length === 1) return array
  let frontArr = []
  let bebindArr = []
  let mid = parseInt(array.length/2)
  let midValue = array[mid]
  array.map(i => {
    if (i < mid) {
      frontArr.push(i);
    }
    if (i > mid) {
      behindArr.push(i);
    }
  })
  return quickSort(frontArr).concat([mid], quickSort(bebindArr))
}


// 实现DOM树的最大深度
function getEleDeep($element) {
  var map = function map(cb) {
    return function (arr) {
      return Array.prototype.map.call(arr, cb);
    };
  };
  var max = function max(arr) {
    return arr.reduce(function (acc, cur) {
      if (cur >= acc) return cur;
      else return acc;
    }, arr[0]);
  }
  var nextChildren = function nextChildren(node) {
    if (node.children.length === 0) return 1;
    else {
      var deeps = map(nextChildren)(node.children);
      return 1 + max(deeps);
    }
  }
  var deep = nextChildren($element)
  return deep;
}

const getDepth = node => {
  if (!node.children || node.children.length === 0) {
    return 1;
  }
  const maxChildrenDepth = [...node.children].map(v => getDepth(v));
  return 1 + Math.max(...maxChildrenDepth)
}

// 广度优先遍历
function traverseByBFS(domRoot) {
  var queue = [domRoot];
  while (queue.length) {
    var node = queue.shift();
    console.log(node);
    if (!node.children.length) {
      continue;
    }
    Array.from(node.children).forEach(x => queue.push(x))
  }
}

function traverseByBFS(domRoot) {
  let queue = [domRoot];
  while (queue.length) {
    let node = queue.shift();
    console.log('node', node);
    if (!node.children.length) {
      continue;
    }
    Array.from(node).map(x => queue.push(x));
  }
}

// 深度优先搜索

function traverseByDFS(domRoot) {
  let child = domRoot.firstElementChild;
  while (child) {
    console.log(child);
    traverseByBFS(child);
    child = child.nextElementSibling; // nextElementSibling 返回当前元素在其父元素的子元素节点中的后一个元素节点,如果该元素已经是最后一个元素节点,则返回null,该属性是只读的.
  }
}

function traverseByDFS(domRoot) {
  let child = domRoot.firstElementChild;
  while (child) {
    console.log(child);
    traverseByDFS(child);
    child = child.nextElementSibling; // nextElementSubling;
  }
}

function getMaxDomTreeDepth_DFS(domRoot) {
  let childrenDepth = [];
  let child = domRoot.firstElementChild;
  if (!child) return 1;
  while (child) {
    console.log(child);
    childrenDepth.push(getMaxDomTreeDepth_DFS(child));
    child = child.nextElementSibling;
  }
  return Math.max(...childrenDepth) + 1;
}

function getMaxDomTreeDepth_BFS(domRoot) {
  var queue = [domRoot];
  var domDepth = 0;
  while (queue.length) {
    domDepth++;
    var currentSize = queue.length;
    var count = 0;
    while (count < currentSize) {
      ++count;
      var node = queue.shift();
      console.log(node);
      if (!node.children.length) {
        continue;
      }
      Array.from(node.children).forEach(x => queue.push(x));
    }
  }
  return domDepth;
}

function binarySearchTree(keys) {

}
