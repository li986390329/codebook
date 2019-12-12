### 父子组件通信
  1. Prop, 基于vue的单项数据流
    ```
      :content="message"
      props: {
        content: {
          type: String,
          default: () => { return 'from child.' }
        }
      }
    ```
  2. $emit 触发当前实例上的事件，附加参数都会传递给监听器回调。
    ```
      let myButton = Vue.extend({
        template: '<button @click="triggerClick">click</button>',
        data () {
          return {
            greeting: 'vue.js'
          }
        },
        methods: {
          triggerClick () {
            this.$emit('greet', this.greeting)
          }
        }
      })

      new Vue({
        el: '#app',
        components: {
          MyButton
        },
        methods: {
          sayHi (val) {
            alert('Hi, ' + val)
          }
        }
      })
    ```
  3. .sync修饰符，可以进行双向数据绑定，但违反了数据的单向流设计理念，所以在vue的2.0被干掉了，但是在2.3.0又重新引入回来，是`v-on:update:ttile="doc.title = $event`的简写， 简写后`v-bind:title.sync="doc.title"`, 一个语法糖
  4. $attrs & $listeners.**(新增)**
     1. $attrs: 包含了父作用域中不作为prop被识别(且获取)的特性绑定，当一个组件没有声明任何prop时，这里会包含所有父作用域的绑定(class 和 style除外), 并且可以通过v-bind="$attrs"出入内部组件，---在创建高级别的组件时非常有用。
     2. $listeners: 包含了父作用域的(不含.native修饰符的) v-on事件监听器。它可以通过v-on="$listeners"传入内部组件---在创建更高层次的组件时非常有用。
  5. provide 和 reject
  6. Event bus
  7. vuex
### 双向绑定
 Object.defineProperty(), setter、getter属性
 ```
  var obj = {};
  Object.defineProperty(obj, 'txt', {
    get: function () {
      return obj;
    },
    set: function (newValue) {
      document.getElementById('txt').value = newValue
    }
  })

  obj.txt = '123'
 ```

  [双向绑定中有几种方式](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf): `发布-订阅`, `脏检测`, `数据劫持`, `数据模型`

**数据劫持**:
  * Object.defineProperty.
  * proxy
  * Object.observe(废弃)

Object.defineProperty缺点:
  * 无法监听数组变化, 只针对八种方法进行了劫持
  * 只能劫持对象的属性, 因此我们需要对每个对象的每个属性进行遍历, 可能要进行深度遍历

Proxy实现的双向绑定的特点:
  * 可以直接监听对象而非属性, 劫持了整个对象
  * 可以监听数组的变化
  * 返回的是新的对象
  * 兼容性问题, 无法用polyfill磨平
 ### vue2和vue3
