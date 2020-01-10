### [重读javaScript](https://juejin.im/post/5a9a9f0d518825558c46de8f)

#### 函数没有重载
  ES 函数不能向传统意义上那样实现重载, 而在其他语言（如Java）中，可以为一个函数编写两个定义，只要这两个定义的签名（接受的参数类型和数量）不同即可[p66]。
  ES 是松散形的，没有签名，所以是没有重载的，后面的函数声明会覆盖掉前面的函数声明

#### 基本数据类型
  es5的: undefined, null, number, string, boolean.

#### [传递参数](https://github.com/nodejh/nodejh.github.io/issues/32)
  基本类型值: 按值传递, 直接复制变量的值传递。
  引用类型值: 是共享调用的(**本质上是传递队形的指针的拷贝, 其指针也是变量的值, 所以传共享调用也可以说是传值调用**)

  **js中函数参数的传递方式既不是传值，也不是传引用。主要问题还是出在了JS的引用类型上面**

  ```
    示例:
    function setName (obj) {
      obj.name = 'jiaming'; // 这里修改了原来指向的object地址下name值
      obj = new Object(); // 这里创建了一个新的对象，重新赋值指针地址，已经影响不到原来的obj了
      obj.name = 'pangjiaming'
    }
    var person = new Object();
    setName(person);
    console.log(person.name); // jiaming, 为什么不是 pangjiaming 呢？
  ```

#### 函数声明与函数表达式
  解析器在向执行环境中加载数据中，对函数声明和函数表达式并非一视同仁，解析器会率先读取函数声明，并使其执行任何代码之前可用(可以访问), 至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解析。

  js解析器中存在一种变量声明被提升的机制，也就是说函数声明会被提升到作用域的最前面，即使写代码的时候是写在后面，也还是会被提升至最前面

  ```
    console.log(sum(10, 10)); // 20
    function sum (num1, num2) {
      return num1 + num2;
    }

    console.log(sum(10, 10)); // typeerror: sum is not a function.
    var sum = function (num1, num2) {
      return num1 + num2;
    }
  ```

#### apply和call
  每个函数都包含两个非继承而来的方法: apply()和call(), 都在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。
  apply和call作用相同，区别在于接收参数的方式不同。
  apply接收两个参数，一个是在其中运行函数的作用域，另一个是参数数组
  call一个是在其中运行函数的作用域, 其余的参数直接传递给函数。换句话说，在使用call()方法时，传递给函数的参数必须逐个列举出来。

#### 创建对象
  Object构造函数或兑现字面量都可以用来创建单个对象，缺点： 使用同一个接口创建很多对象，会产生大量的重复代码。
  **工厂模式**
    ```
      function createPerson(name, age, job) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function () {
          alert(this.name);
        };
        return o;
      }
      var person1 = createPerson('nich', 29, 'soft');
      var person2 = createPerson('greg', 27, 'doctor');
    ```
  **构造函数模式**
    ```
      function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = functin () {
          alert(this.name);
        };
      }
      var person1 = new Person('nich', 29, 'soft');
      var person2 = new Person('greg', 27, 'doctor');
    ```
    使用new操作符，调用构造函数实际上会经历4个步骤:
      1. 创建一个新的对象
      2. 将构造函数的作用域赋给新的对象(this指向这个新对象)
      3. 执行构造函数中的代码(为这个新对象添加属性)
      4. 返回新对象
    构造函数解决了重复实例化的问题和对象识别问题，但是共有方法，实例化的时候都创建了，未免多余, 可以将共有的方法提取到外面, 但是方法变成了全局方法，有点大材小用
