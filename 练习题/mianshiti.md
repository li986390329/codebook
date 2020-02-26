<!--
 * @Description:
 * @Author: lihewei
 * @Date: 2020-02-24 09:53:01
 * @LastEditors: lihewei
 * @LastEditTime: 2020-02-24 10:24:45
 -->

1. https页面加载http的资源会导致页面报错的原因是什么?
   在https地址中加载http资源，浏览器将认为这是不安全的资源，默认阻止
   解决:
    最笨方法, http一套， https一台代码，各自指向服务器
    协议替换，后台请求标识好协议，变量传到页面中, 进行协议替换
    h5 使用js自己加载协议情况
  在页面的head中加入: <meta http-equiv="content-Securuty-Policy" content="upgrade-insecure-requests"> 这个csp指令，可以让浏览器傍明做http->https的转换


2. Sass嵌套规则的理解


3. window.console.log 和 console.log()区别
   不一样, window.console.log只能在浏览器中使用，而console.log能够在浏览器，node等其他环境下使用