export const decodeWolfram = (text) => {
    const map = {
        "\\[Implies]": " ⇒ ",
        "\\[And]": " ∧ ",
        "\\[Or]": " ∨ ",
        "\\[Equivalent]": " ⇔ ",
        "\\[Not]": " ¬ ",
    };
    for (var key in map){
        text = text.replace(key, map[key]);
    }
    return text;
}

export const encodeWolfram = (text) => {
    const map = {
        "\\[Implies]": " ⇒ ",
        "\\[And]": " ∧ ",
        "\\[Or]": " ∨ ",
        "\\[Equivalent]": " ⇔ ",
        "\\[Not]": " ¬ ",
    };
    let map2 = {};
    for (var key in map){
        map2[map[key]] = key;
    }
    for (var key in map2){
        text = text.replace(key, map2[key]);
    }
    return text;
}

export default {decodeWolfram, encodeWolfram};