var utils_toArray = (function () {
    function toArray(likeArray) {
        var ary = [];
        try{
            ary = [].slice.call(likeArray);
        }catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                var cur = likeArray[i];
                ary.push(cur);
            }
        }
        return ary;
    }
    return{
        toArray:toArray
    }
})();