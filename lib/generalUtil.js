module.exports = {
    safeReturn:function (array = [], index, defaultValue, checkFor) {
        defaultValue = typeof defaultValue == 'undefined' ? false : defaultValue;

        if (typeof array == 'undefined' || typeof index == 'undefined' || array == null || index == null) {
            return defaultValue;
        }
        if(typeof array !== 'object' && typeof array[index] === 'undefined')
        {
            return defaultValue;
        }
        /*if (!(index in array)) {
            return defaultValue;
        }*/
        if (this.inArray(null, checkFor) && array[index] == null) {
            return defaultValue;
        }
        if (this.inArray('', checkFor) && array[index] === '') {
            return defaultValue;
        }
        if (this.inArray('0', checkFor) && array[index] == '0') {
            return defaultValue;
        }
        return array[index];
    },
    inArray:function (needle, stack = []) {
        var ret = false;
        if(typeof needle != 'undefined')
        {
            var i = stack.indexOf(needle);
            if(i > -1){
                ret = true;
            }
        }

        return ret;
    },
    myGet: function (name, url) {
        if(typeof window !== "undefined"){
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
        }
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        /*return decodeURIComponent(results[2].replace(/\+/g, " "));*/
        return decodeURIComponent(results[2]);
    },
    uniqueUrlLinkCheck:function (urls){
        let urlArray = urls.split('/');
        let removeDuplicate = urlArray.filter((item,index) => urlArray.indexOf(item) === index);
        return removeDuplicate.join('/');
    }
}