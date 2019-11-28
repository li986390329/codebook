## [Message Loop Integration](https://electronjs.org/blog/electron-internals-node-integration)
  问题: 使用Node进行GUI编程, GUI有自己的[消息循环](https://www.cnblogs.com/lwzz/archive/2012/11/17/2754011.html), Node使用[libuv](http://luohaha.github.io/Chinese-uvbook/source/introduction.html)作为自己的消息循环, 并且主线程只能同时运行一个循环，因此，在Node中运行GUI消息循环的常用技巧是非常小的时间间隔用interval把GUI的消息注入到Node消息循环中, 但这会使GUI界面响应变慢并且占用大量CPU资源

  Electron中刚好相反，将Node的时间循环集成到Chromium的消息循环中。

### Main进程和渲染进程
  主流程负责创建窗口之类的GUI工作， 而渲染进程仅处理运行和呈现网页。

  Electron允许使用JavaScript来控制Main进程和渲染进程，这意味着我们必须将Node集成到两个进程中

### libuv体会Chromium的message loop
  在渲染进程中，它的消息循环只监听文件描述符和定时器， 而我只需要用libuv实现接口。

  然而，主进程中显然更加困难，每个平台都有自己的GUI消息循环。macOS Chromium使用NSRunLoop, 而Linux使用glib。

  最后添加了一个定时器来一小的间隔轮询GUI消息循环。结果是该进程占用大量CPUs使用率，并且某些操作会有很长时间的延迟。

### 轮询Node的事件循环在一个单独的线程中
  backend fd的概念被引入到libuv中， 可以理解为libuv轮询其事件循环的文件描述符(或句柄)。因此，通过轮询backend fd, 可以在libuv中发生新事件时收到通知。

  所以在Electron中，我创建了一个单独的线程来轮询backend fd, 因为我是使用系统调用来轮询而不是libuv API, 所以它是线程安全的。每当libuv时间循环中发生新事件时，都会将消息发布到Chromium的消息循环中，然后在主线程中处理libuv事件


### [主进程和渲染进程](https://blog.csdn.net/ivan820819/article/details/79080116)
  主进程用于创建GUI界面以便web页面的展示，Electron由Chromium负责页面的显示, 所以当创建一个页面时，就会对应的创建渲染进程(render Process).
  * 进程之间通信
    * ipc Main模块是EventEmitter的实例，当在主进程中使用它的时候，他控制着由渲染进程发送过来的异步或同步消息。从渲染进程发送过来的消息将触发事件。
    * ipcRender模块是EventEmitter的实例，可以从渲染进程向主进程发送异步或同步消息，也可以收到主进程的响应。
    * remote模块 提供了一种在渲染进程和主进程之间进行进程间通讯的简便途径。
  * webview. 与iframe不同, webview和你的应用运行的是不同的进程， 他不拥有渲染进程的权限，并且应用和嵌入内容之间的交互全部都是异步的，因为这能保证应用的安全性不收嵌入内容的影响。

### electron 启动速度慢
  1. 等待html完全加载出来才会显示
  2. vue、vuex需要初始化
  3. 单页应用，首页加载就缓慢，做了懒加载虽然能加快加载速度，但是效果不理想
  参考方案: 预加载窗口，但是比较占用内存，要预先加载窗口，窗口多了会很麻烦，制作一个窗口容器
  应用加载的时候初始化，容器里始终有固定数量的窗口处于hide状态。