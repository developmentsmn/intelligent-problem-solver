String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

export const JSONparser = (arrayString) => {
    var str = arrayString.substring(1,arrayString.length-1);
    str = str.replaceAll(/\\\\/g,"<->");
    str = str.replaceAll(/\\/g,"");
    str = str.replaceAll(/<->/g,"\\\\");
    return JSON.parse(str);
};

export default {JSONparser};
