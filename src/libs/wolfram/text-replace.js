export const decodeWolfram = (text) => {
    const map = {
        "\\[Implies]": "⇒",
        "\\[And]": "∧",
        "\\[Or]": "∨",
        "\\[Equivalent]": "⇔",
        "\\[Not]": "¬",
    };

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement)
    }
    const l1 = text.length;
    for (var key in map){
        text = text.replaceAll(key, map[key]);
        
    }
    return {
        text,
        lenOffset: text.length - l1
    };
}

export const encodeWolfram = (text) => {
    const map = {
        "\\[Implies]": "⇒",
        "\\[And]": "∧",
        "\\[Or]": "∨",
        "\\[Equivalent]": "⇔",
        "\\[Not]": "¬",
    };

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement)
    }

    let map2 = {};
    for (var key in map){
        map2[map[key]] = key;
    }
    for (var key in map2){
        text = text.replaceAll(key, map2[key]);
    }
    return text;
}

export const formatProblemAsJSON = (problem) => {
    if (problem === null)
        return "[Define your problem]";
    var problemString = "";
    for (var key in problem){
        problemString = problemString + key + ": " + decodeWolfram(problem[key]).text + "\n";
    }
    return problemString;
}

export default {decodeWolfram, encodeWolfram, formatProblemAsJSON};