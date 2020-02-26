# codebook

Record books about reading refactoring code.


C++
windows + dulib

JS
Vue + vuex + electron

面向过程 -> 面向对象

MVVM -> MVC

V -> M

C -> controler msgManager UserInfoManager

M -> model UserInfo GroupInfo



通用的工具模块封装
数据持久化:
  DB-> 封装为两个模块 数据库表设计啊
文件模块的封装
加密模块的封装
用户信息模块的封装
消息模块的封装
Session模块的封装
消息流程优化 factory -> messageManager  messageEntiy

离线消息优化 offlineMsg

性能优化
  图片的懒加载
  左侧会话列表懒加载
  插入消息优化，webworker
  页面优化，v-show 和v-if
  渲染优化，key值缓存
  UI层优化，减少重排, 统一读取数据, 然后再写数据。
  DOM渲染层优化
  输入框优化
  逻辑优化,

内存优化
  闭包
  事件绑定
  全局变量、计时器

首屏优化
  减少Html请求，减少包体积，缩小图片体积，延迟加载JS文件，preDNS

#### [！！！this 永远指向最后一个调用它的对象，匿名函数的 this 永远指向 window](https://juejin.im/post/59bfe84351882531b730bac2)

#### [electron 性能优化](https://juejin.im/post/5e0010866fb9a015fd69c645)