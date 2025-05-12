# 🔴 Redis Clone (TCP-Based Key-Value Store)

A lightweight Redis-like in-memory key-value database implemented in **Node.js** using the native `net` module. This project is built for educational purposes to simulate basic Redis operations over a TCP connection.

---

## 🚀 Features

- 📡 TCP server listens on port `8000`
- 💾 In-memory data storage using `Map`
- 🧠 Redis-like commands supported:
  - `SET key value` - Store a string value by key
  - `GET key` - Retrieve a value by key
  - `DEL key` - Delete a key from memory
  - `APPEND key value` - Append to a string
  - `STRLEN key` - Get the length of the value
  - `GETRANGE key start end` - Get a substring
  - `GETSET key value` - Atomically set a new value and return the old one
  - `INCR key`, `INCRBY key num`, `INCRBYFLOAT key num`
  - `DECR key`, `DECRBY key num`
- 🧹 Handles quoted strings like `SET "some key" "some value"`
- 🛠 Proper error handling for invalid commands or missing keys

---


---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/redis-clone.git
cd redis-clone
```
### 2. Install dependencies (if any)
This project uses only built-in Node.js modules, so no installation is needed unless you add external packages.

### 3. Run the server
```
node redis.js
```