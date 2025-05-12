// String operations
exports.isStringOperation = (val) => {
  const operationList = [
    "SET", "GET", "DEL", "GETRANGE", "GETSET", "MGET", "GETBIT", "SETBIT",
    "SETEX", "SETNX", "SETRANGE", "STRLEN", "MSET", "MSETNX", "PSETEX",
    "INCR", "INCRBY", "DECR", "DECRBY", "APPEND", "INCRBYFLOAT"
  ];
  return operationList.includes(val);
};

// Hash operations
exports.isHashOperation = (val) => {
  const operationList = [
    "HSET", "HGET", "HDEL", "HEXISTS", "HGETALL", "HINCRBY",
    "HKEYS", "HLEN", "HMGET", "HMSET", "HSETNX", "HVALS"
  ];
  return operationList.includes(val);
};

// List operations
exports.isListOperation = (val) => {
  const operationList = [
    "LPUSH", "RPUSH", "LPOP", "RPOP", "LRANGE", "LLEN",
    "LREM", "LSET", "LTRIM", "LINDEX", "RPOPLPUSH"
  ];
  return operationList.includes(val);
};

// Set operations
exports.isSetOperation = (val) => {
  const operationList = [
    "SADD", "SREM", "SISMEMBER", "SMEMBERS", "SCARD",
    "SPOP", "SRANDMEMBER", "SDIFF", "SINTER", "SUNION"
  ];
  return operationList.includes(val);
};

// Sorted Set operations
exports.isSortedSetOperation = (val) => {
  const operationList = [
    "ZADD", "ZREM", "ZINCRBY", "ZRANGE", "ZREVRANGE", "ZRANGEBYSCORE",
    "ZRANK", "ZREVRANK", "ZCARD", "ZSCORE", "ZPOPMAX", "ZPOPMIN"
  ];
  return operationList.includes(val);
};
