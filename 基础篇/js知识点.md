## [JS](https://juejin.im/post/5c875791e51d456b30397846#heading-20)
### 闭包
  一个持有外部环境变量的函数就是闭包

```
  function func() {
    var a = 10;
    return () => {
      return a;
    }
  }
  var geta = fun();
  var a = geta();
  console.log(a)
```
### 原型、原型链
  对象一个自带隐式__proto__属性, 原型也有可能有自己的原型, 如果一个原型对象的原型不为null的话，我们就称之为原型链
  原型链是由一些用来继承和共享属性的对象组成的(有限的)对象链

### 类的继承和创建
  原型链继承: 基于原型链，无法实现多继承
  ```
    function Cat() {}
    Cat.prototype = new Animal()
    Cat.prototype.name = 'cat'
    var cat = new Cat()
  ```
  构造函数继承: 复制父类的实例给子类, 之继承父类实例的属性和方法，不继承原型上的，可实现多继承。
  ```
    function Cat (name) {
      Animal.call(this)
      this.name = name || 'Tom'
    }
    var cat = new Cat()
  ```
  3. 组合继承

### new Function
  * 创建一个空对象
  * 将该对象的原型指向创建该对象的构造函数的prototype上

### 创建对象的模式
  1. 工厂模式
  2. 构造函数模式
  3. 原型模式
  4. 混合构造函数与原型模式

### 深拷贝
  ```
    let newArr = JSON.parse(JSON.stringfy(oldArr));
    let newArr = oldArr.slice() || oldArr.concat([])
    let newArr = [...oldArr]

    function deepClone (obj) {
      let newObj = obj instanceof Array ? [] : {}
      for(var i in obj) {
        newObj[i] = typeof obj[i] == 'object' ? deepClone(obj[i] : obj [i])
      }
      return newObj
    }
  ```

### 数组操作
  * unshift()
  * shift()
  * push()
  * pop()
  * concat([])
  * splice(index, howmany, item1, ... , itemX)
  * slice(start, end)
  * sort()
  * reverse()
  * join()
  * forEach() 遍历数组每一个元素，并在回调函数中处理
  * map() 遍历数组每一项，并返回操作后的数组
  * filter() 遍历数组中的每一项，并在回调中处理，返回符合条件的新数组
  * every() 遍历数组每一项，通过回调判断是否符合条件
  * isArray() || Object.prototype.toString.call(arg) === '[object Array]'

### 实现对一个数字每三位加一个逗号
  ```
    function test(nums) {
      if (!nums) return nums
      let arr = nums.toString().split('.')
      let intArr = [...arr[0]]
      let decArr = arr[1] ? [...arr[1]] : []
      let newIntArr = intArr.map((item, index) => {
        if (index < intArr.length - 1 && (index + 1) % 3 === 0) {
          return item = item + ','
        }
        return item
      })
      let newDecArr = decArr.map((item, index) => {
        if (index < decArr.length - 1 && (index + 1) % 3 === 0) {
          return item = item + ','
        }
        return item
      })
      newDecArr.unshift('.')
      return newIntArr.concat(newDecArr).join('')
    }
    test(131234534656.123)
  ```

### 手写快速排序
```
  function QuickSort(arr) {
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    let leftArr = []
    let rightArr = []
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] < arr[mid]) {
        leftArr.push(arr[i])
      } else if (arr[i] > arr[mid]){
        rightArr.push(arr[i])
      }
    }
    let resLeftArr = QuickSort(leftArr)
    let resRightArr = QuickSort(rightArr)
    resRightArr.unshift(arr[mid])
    return resLeftArr.concat(resRightArr)
  }
```

### 函数的防抖和节流
  * 防抖: 任务频繁出发情况下, 只有两次任务间隔超过指定时间
  ```
    function debounce (fn, time) {
      let timeout = null
      return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          fn.call(this, arguments)
        }, time)
      }
    }

    function handle () {
      console.log('防抖')
    }
    debounce(handle, 1000)
  ```
  * 节流: 频繁触发任务, 任务按照一定时间间隔进行执行
  ```
    function throttle(fn, time) {
      let canRun = true
      return function () {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
          fn.call(this, arguments)
          canRun = true
        }, time)
      }
    }
  ```

## ES6

### Promise
  * 三种状态: pending过渡态, fulfilled 完成态, rejected 失败态
  * 优势: 可读性好，便于维护，解决回调地狱
  * 缺点： 无法停止，指定回调，pending状态无法确定进行到哪一步

  手写promise
  ```
    function Promise (exec) {
      let self = this;
      this.value = undefined
      this.reason = undefined
      this.status = 'pending'
      this.onResolveCallbacks = []
      this.onRejectCallbacks = []

      function resolve (value) {
        if (self.status === 'pending') {
          self.value = value
          self.status = 'resolved'
          self.onResolveCallbacks.forEach(fn => fn())
        }
      }

      function reject (reason) {
        if (self.status === 'pending') {
          self.reason = reason
          self.status = 'rejected'
          self.onRejectCallbacks.forEach(fn => fn())
        }
      }
      try {
        exec(resolve, reject)
      } catch (e) {
        reject(e)
      }
    }
    Promise.prototype.then = function (onFulfilled, onRejected) {
      let self = this

    }
  ```

### 浏览器内核
  Chromium 是多进程架构
  * 架构
  ![架构](./img/1.webp)
  ![多进程架构](./img/2.webp)