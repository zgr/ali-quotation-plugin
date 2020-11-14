/**
 * 加载最新版本的daydao视频面试PC插件js
 * */

;(function () {
    //如果是开发环境就从dev本地域名中读取，否则从线上域名读取，每家企业的code不一样
    var envPath = localStorage.getItem('env-value') == 'dev'? (location.protocol + '//zhangpeng.project:9090/'): (location.protocol + '//zhangpeng.project:9090/');
    var newUrl =  envPath + 'version.js?t=' + (new Date().getTime());
    var scriptEle = document.createElement('script');
    scriptEle.src = newUrl;
    scriptEle.type = 'text/javascript';
    document.querySelector('head').appendChild(scriptEle);
})();