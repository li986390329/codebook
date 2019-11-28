## [时间驱动原理](https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513044&idx=1&sn=9b8526e9d641b970ee5ddac02dae3c57&scene=21#wechat_redirect)

  Node.js: 只有一个线程来处理所有请求，事件驱动编程。
  事件驱动的最大优势是是什么, 就是在高并发IO时, 不会造成堵塞
  * [node缺点:](https://www.zhihu.com/question/19653241/answer/15993549)
    * 可靠性低
    * 单进程, 单线程，支持单核CPU, 不能充分利用多核cpu服务器。
  pm2实现Node的多线程
