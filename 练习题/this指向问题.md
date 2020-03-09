


#### [！！！this 永远指向最后一个调用它的对象](https://juejin.im/post/59bfe84351882531b730bac2)
```
  var name = 'windowName'
  var a = {
    name: null,
    fn: function () {
      console.log(this.name) // windowsName
    }
  }
  var f = a.fn;
  f();
```
这里你可能会有疑问，为什么不是 Cherry，这是因为虽然将 a 对象的 fn 方法赋值给变量 f 了，但是没有调用，再接着跟我念这一句话：“this 永远指向最后调用它的那个对象”，由于刚刚的 f 并没有调用，所以 fn() 最后仍然是被 window 调用的。所以 this 指向的也就是 window。



一、 this指向并不是在函数定义的时候确定的，而是在调用的时候确定的，函数的调用方式决定了this指向

二、 普通函数的调用方式有三种: 直接调用，方法调用和new调用。除此之外，还有一些特殊的调用方式, bind()、call()、apply(), 箭头函数调用时，this指向又有所不同，
[参考链接](https://segmentfault.com/a/1190000008400124)
  1. **直接调用**

  通过函数名这种方式调用, 这时候函数内部的this指向全局对象，在浏览器中全局对象window, 在nodeJS中全局对象是global.

 ```
   const _global = typeof window === 'undefined' ? global : window
   function test(){
     console.log(this === _global);
   }
   test() // true
 ```
  值得注意的，```直接调用并不是指在全局作用域下进行调用，在任何作用域下，直接通过函数名来对函数进行调用的方式，都成为直接调用```

 ```
   (function(_global) {
     // 通过 IIFE 限定作用域

     function test() {
         console.log(this === _global);  // true
     }

     test();     // 非全局作用域下的直接调用
   })(typeof window === "undefined" ? global : window);
 ```

  2. **bind()对直接调用的影响**
    将当前函数于指定的对象绑定，并返回一个```新函数```，这个新函数无论以什么样的方式调用, 其this始终指向绑定的对象
    ```
      const obj = {};
      function test() {
        console.log(this === obj);
      }
      const testObj = test.bind(obj);
      test() // false
      testObj() // trye
    ```
    ```
      // 自定义的函数, 模拟bind()对this影响
      function myBind(func, target) {
        return function () {
          return func.apply(target, arguments);
        };
      }
    ```
  3. **call和apply对this影响**
    它们的第一个参数都是指定函数运行时其中的this指向
    如果目录函数本事是一个绑定了this对象的函数，那apply和call不会像预期那样执行
    ```
      const obj = {}
      function test () {
        console.log(this === obj)
      }

      const testObj = test.bind({});
      test.apply(obj); // true
      // 期望this是obj, 输出true
      // 但是因为testObj绑定了不是obj对象，所以会输出false
      testObj.apply(obj); // false
    ```
  4. **方法调用**
    方法调用是指通过对象来调用其方法函数，这种情况下，函数中的this指向调用该方法的对象, 但是，同样需要注意bind()的影响。
    ```
      const obj = {
        // 第一种方式，定义对象的时候定义其方法
        test() {
          console.log(this === obj)
        }
      };
      // 第二种方式， 对象定义好了为其附加一个方法(函数表达式)
      obj.test2 = function () {
        console.log(this === obj)
      }
      // 第三种方式和第二种方式原理相同
      // 是对象定义之后为其附加一个方法(函数定义)
      function t(){
        console.log(this === obj);
      }
      obj.test3 = t;
      // 这也是为对象附加一个方法
      // 但是这个函数绑定了一个不是obj的其他对象
      obj.test4 = (function (){
        conosle.log(this === obj);
      }).bind({});

      obj.test() // true
      obj.test2() // true
      obj.test3() // true
      obj.test4() // false
    ```
    注意, 后三种方式都是预定定义函数, 再将其附加obj对象作为其方法。再次强调，函数内部的this指向与定义无关，受调用方式的影响
  5. **方法中this指向全局对象的情况**
    注意这里说的是方法中而不是方法调用中, 方法中的this指向全局对象，如果不是因为bind(), 那就一定是因为不是用的方法调用方式
    ```
      const obj = {
        test() {
          console.log(this === obj)
        }
      }
      const t = obj.test;
      t(); // false
    ```
    t就是obj的test方法，但是t()调用时，其中的this指向全局
    之所以要特别提出这种情况，主要是因为常常讲一个对象方法作为回调传递给某个函数之后，却发现运行结果与预期不符———因为忽略调用方式对this的影响，比如下面的例子是在页面对某些事情进行封装之后特别容易遇到的问题:
    ```
      class Handles {
        constructor(data, $button) {
          this.data = data;
          $button.on('click', this.onButtonClick);
        }
        onButtonClick(e) {
          console.log(this.data)
        }
      }
      const handles = new Handles('string data', $("#someButton"));
      // 点击操作后
      // 输出 undefined
      // 预期是输出string data.

      // 解决办法
      // es5
      var _this = this;
      $button.on('click', function () {
        _this.onButtonClick();
      }
      // 通过bind()来解决
      $button.on('click', this.onButtonClick.bind(this));
      // es6中可以通过箭头函数处理
      $button.on('click', e => this.onButtonClick(e));
    ```
    注意: 箭头函数用作JQuery的回调时造成要小心函数内对this的使用，jQuery大多数回调函数(非箭头函数)中的this都是标识调用目标, 所以完全可以写$(this).text()这样的语句，但jQuery无法改变箭头函数的this指向，同样的语句语义完全不同。

    1. **new 调用**
      在es6之前，每个函数都可以当做是构造函数，通过new调用来产生新的对象，函数内无特定返回值的情况下，而es6改变了这种状态，虽然class定义的类用typeof运算符得到的仍然是function，但是它不能像普通函数一样直接调用，同时，class定义的方法函数，也不能当做构造函数用new来调用。
      而在es5中，用new调用一个构造函数，会创建一个新对象，而其中的this就指向这个对象
      ```
        var data = "Hi";
        function AClass(data) {
          this.data = data;
        }
        var a = new AClass('Hello World');
        console.log(a.data); // hello
        console.log(data); // hi
        var b = new AClass('Hello World');
        console.log(a == b) // false
      ```
    2. **箭头函数中的this**
      箭头函数没有自己的this绑定，箭头函数中使用的this, 其实是直接包含它的那个函数或函数表达式的this.
      ```
        const obj = {
          test () {
            const arrow = () => {
              // 这里的 this 是test()中的this
              // 由test()的调用方式决定
              console.log(this === obj);
            };
            arrow();
          },
          getArrow () {
            return () => {
              // 这里的this是getArrow()中的this
              // 由getArrow()的调用方式决定
              console.log(this === obj);
            }
          }
        }
        obj.test(); // true
        const arrow = obj.getArrow();
        arrow(); // true
      ```
      示例中的两个this都是箭头函数的直接外层函数决定的，而方法函数的this是由其调用方式决定的，上例子的调用方式都是方法调用，所以this都指向方法调用的对象，即obj
      箭头函数让大家使用闭包的时候不需要太纠结this, 不需要通过_this这样的局部变量来临时引用this给闭包函数使用
      ```
        const obj = () {
          getArrow() {
            return () => {
                console.log(this === obj);
            }
          }
        }
        var obj = {
          getArrow: function getArrow() {
            var _this = this;
            return function () {
              console.log(_this === obj)
            }
          }
        }
      ```
      注意: 箭头函数不能用new调用，不能bind到某个对象(虽然bind()方法调用没问题, 但是不会产生预期效果)。不管在什么情况下使用箭头函数，它本身是没有绑定this的，他用的直接外层函数(即包含她的最近的一层函数或函数表达式)囊东的this.