const map = new Map();

exports.newKey = (key, value)=>{
    map.set(key, value);
}

exports.getValue = (key)=>{
    return map.get(key);
}

exports.isContain = (key)=>{
    return map.has(key);
}

exports.delKey = (key)=>{
    map.delete(key);
}
