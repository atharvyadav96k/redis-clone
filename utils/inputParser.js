module.exports = (string) => {
    // Use a regular expression to split by whitespace and remove quotes around strings
    let data = string.match(/"([^"]*)"|[^\s\r\n]+/g);

    // Remove quotes from strings inside quotes
    data = data.map(item => item.startsWith('"') && item.endsWith('"') ? item.slice(1, -1) : item);

    // Filter out any empty strings
    data = data.filter(value => value !== "");

    return data;
};
