# Redis Clone 🧠⚡

A full-featured clone of [Redis](https://redis.io/): an in-memory data structure store used as a database, cache, and message broker.

This project recreates Redis from scratch, supporting **all major features** including key-value storage, data structures, persistence, replication, pub/sub, transactions, and more. Ideal for learning how Redis works under the hood.

---

## ✨ Features

✅ Fully in-memory, high-performance key-value store  
✅ Data types:
- `Strings`
- `Lists`
- `Sets`
- `Sorted Sets`
- `Hashes`
- `Streams`
- `Bitmaps`
- `HyperLogLogs`
- `Geospatial Indexes`

✅ Core commands (`SET`, `GET`, `DEL`, `EXPIRE`, `TTL`, etc.)  
✅ Persistence:
- RDB snapshots
- AOF (Append Only File)

✅ Replication (Master-Slave)  
✅ Pub/Sub messaging  
✅ Transactions (`MULTI`, `EXEC`, `WATCH`)  
✅ Lua scripting support  
✅ Event notifications  
✅ Expiration and eviction policies  
✅ RESP protocol support  
✅ TCP socket server (Redis-compatible client support)  
✅ Optional authentication (`AUTH` command)  
✅ Cluster-ready architecture (basic version)  

---

## 🚀 Getting Started

### Prerequisites

- A Unix-like OS (Linux/macOS/WSL recommended)
- Language-specific runtime (e.g. Node.js / Go / Python / Rust / C++)
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/redis-clone.git
cd redis-clone
```
### Start the Server
```
node redis.js
```

### Example 
```
SET user:1 "Atharv"
GET user:1
DEL user:1

LPUSH queue job1 job2
LRANGE queue 0 -1

SADD onlineUsers user1 user2
SMEMBERS onlineUsers

HSET user:2 name "Atharv" age 22
HGETALL user:2

ZADD leaderboard 100 "Player1" 200 "Player2"
ZRANGE leaderboard 0 -1 WITHSCORES
```