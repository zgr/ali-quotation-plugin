/**
 * 加载主程序文件，该文件用es5语法写，注意浏览器兼容性
 * */
var DaydaoVideoInterviewExtension = {
    isDev: function () {
        return localStorage.getItem('env-value') === 'dev';
    },

    getDomain: function () {
        return this.isDev() ? location.protocol + '//dev.daydao.com:9090' : 'https://static-ai.daydao.com';
    },

    getFilePath:function(){
        return this.isDev() ? '': 'static/zhaopin_daydao_com/video_interview_extension/';
    },

    init:function(){
        var sDomain = this.getDomain();
        var filePath = this.getFilePath();
        var t = this;

        //加载css
        t.insertCssLink(sDomain + '/'+ filePath +'css/app.css?v=-VERSION-');
        // 防止 elementUI、main.js先执行导致 vue is undefined
        t.inserScriptLink(sDomain + '/'+ filePath +'js/chunk-vendors.js?v=-VERSION-',function () {
            t.inserScriptLink(sDomain + '/' + filePath + 'js/app.js?v=-VERSION-');
        });
    },
    /**
     * 创建并插入标签到 head 中
     * @param {Object} options 标签的属性
     * @param {Boolean} noAppend 是否插入到 head, 默认自动插入
     */
    insertTarget: function (options, noAppend) {
        var target = document.createElement(options.tagName);
        Object.keys(options).map(function (key) {
            if (key !== 'tagName'){
                target[key] =  options[key];
            }
        });
        if (!noAppend){
            document.querySelector('head').appendChild(target);
        }
        return target;
    },
    // 执行 script 脚本
    execScript: function (content) {
        var script = null;
        if (content) {
            script = this.insertTarget({
                tagName: 'script',
                id: 'DD_execScript',
                type: 'text/javascript',
                innerHTML: content
            });
        }
        return script
    },
    // 插入 css 资源
    insertCssLink: function (href) {
        var css = null;
        if (href) {
            css = this.insertTarget({
                tagName: 'link',
                rel: 'stylesheet',
                type: "text/"+ ("css"),
                charset: 'utf-8',
                href: href
            });
        }
        return css
    },
    // 插入 script 资源
    inserScriptLink: function (href, onload, noAppend) {
        // onload事件兼容
        var targetOnload = function (target) {
            if (target.readyState) {
                target.onreadystatechange = function(e) {
                    if (target.readyState == "loaded" || target.readyState == "complete") {
                        target.onreadystatechange = null;
                        onload.call(target, e);
                    }
                }
            } else {
                target.onload = onload;
            }
        }
        var script = null;
        if (href) {
            script = this.insertTarget({
                tagName: 'script',
                type: 'text/javascript',
                charset: 'UTF-8',
                src: href
            }, true);
            if (typeof onload === 'function' && onload) {
                targetOnload(script);
            }
            if (!onload || !noAppend) {
                document.querySelector('head').appendChild(script);
            }
        }
        return script
    }
};

DaydaoVideoInterviewExtension.init();
