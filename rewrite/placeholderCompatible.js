~function () {
    var inputList = document.getElementsByTagName("input"),
         inputAry = [];
    //=>获取带有该自定义属性的input
    for (var i = 0; i < inputList.length; i++) {
        var item = inputList[i];
        item.getAttribute("data-place")!==null?inputAry.push(item):null;
    }
    //=>如果是非IE浏览器
    if(!/(MSIIE|Trident)/i.test(navigator.userAgent)){
        for (var i = 0; i < inputAry.length; i++) {
            var itemInp = inputAry[i];
            itemInp.placeholder = itemInp.getAttribute("data-place");
        }
        return;
    }
    //=>IE浏览器的处理
    for (var z = 0; z < inputAry.length; z++) {
        var inputItem = inputAry[z],
            inputText = inputItem.getAttribute("data-place");
        inputItem.placeholder = "";
        var spanTip = document.createElement("span");
        spanTip.innerHTML = inputText;
        spanTip.className = "placeLike";
        inputItem.parentNode.appendChild(spanTip);
        inputItem.index = spanTip.index = z;
        inputItem.spanTip = spanTip;
        spanTip.onclick = function () {
            inputAry[this.index].focus();
        };
        inputItem.onkeydown = inputItem.onkeyup = function () {
            var value = this.value,
                 spanTip = this.spanTip;
            spanTip.style.display = value.length>0?"none":"block";
        };
    }
}();