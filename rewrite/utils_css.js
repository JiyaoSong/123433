var utils_css = (function () {
    //获取元素的属性值
    function getCss(curEle,attr) {
        var val;
        if("getComputedStyle" in window){
            val=getComputedStyle(curEle)[attr];
        }else{
            val=curEle.currentStyle[attr];
        }
        var reg = /^width|height|FontSize|opacity|margin|padding|top|left|right|bottom$/;
        if(reg.test(attr)){
            if(!isNaN(parseFloat(val))){
                val = parseFloat(val);
            }else {
                return "";
            }
        }
        return val;
    }
    //单个设置元素属性值
    function setCss(curEle,attr,val) {
        if(attr==="opacity"){
            curEle.style[attr] = val;
            curEle.style["filter"] = "algha(opacity="+val*100+")";
            return;
        }
        var reg = /^width|height|FontSize|(margin|padding)?(top|left|right|bottom)?$/i;
        if(reg.test(attr)){
            if(typeof val==="number"){
                val = val +"px";
            }
        }
        curEle.style[attr] = val;
    }
    //一组设置元素属性值
    function setGroundCss(curEle,obj) {
        for(var key in obj){
            setCss(curEle,key,obj[key]);
        }
    }
    // 结合上面三个三个封装一个css;
    function css(...argu) {
        if(argu.length===3){
            setCss(...argu);
        }else if (argu.length===2){
            if(toString.call(argu[1])==="[object Object]"){
                setGroundCss(...argu);
            }else {
                return getCss(...argu);
            }
        }
    }
    function offSet(curEle) {
        var parent = curEle.offsetParent;
        var left = curEle.offsetLeft;
        var top = curEle.offsetTop;
        while(parent){
            if(!/MSIE 8\.0/.test(navigator.userAgent)){
                left += parent.clientLeft;
                top += parent.clientTop;
            }
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {left:left,top:top};
    }
    function win(attr,value) {
        if(isNaN(value)){
            return document.documentElement[attr]||document.body[attr];
        }
        document.body[attr] = value;
        document.documentElement[attr] = value;
    }
    function getRandom(n,m){
        n = Number(n);
        m = Number(m);
        if(!isNaN(n)&&!isNaN(m)) {
            if (n > m) {
                [n, m] = [m, n];
            }
            return Math.round(Math.random() * (m - n) + n);
        }
    }
    return {
        getCss:getCss,
        setCss:setCss,
        setGroundCss:setGroundCss,
        css:css,
        offSet:offSet,
        win:win,
        getRandom:getRandom
    }
})();