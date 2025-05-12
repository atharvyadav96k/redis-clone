module.exports = (string)=>{
    let data = string.toString().split(/[\s\r\n]+/);
    data = data.filter(value => value !== "");
    return data;
}