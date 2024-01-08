# Altura-Task-1-2

## To Start the Tasks

1. **Install Dependencies:**
   ```bash
   npm install
2. **Start the Project:**
   ```bash
   npm task1
   npm task2

## Task 1: Implement a file-based caching system

### Context

Create a file-based caching system that stores and retrieves data from a local file
system.

### Decision

We will implement a file-based caching system that uses the local file system for persistence. This system will use a simple key-value store model. Each key will correspond to a unique file in the system, and the value will be the data stored in the file.

### Breakdown of the code implementation

1. The `set` method is used to store data. It takes a key and data as arguments. The key is used to create a unique file for each entry in the store. 
2. The `get` method is used to retrieve data. It takes a key as an argument and constructs the file path in the same way as the set method.
3. The `delete` method is used to delete data. It takes a key as an argument, constructs the file path, and checks if the file exists.
4. The `clear` method is used to delete all data in the store.

## Task 2: Create an HTTP Proxy Server

### Context

Implement an HTTP proxy server using Node.js and the built-in http module. The
server should handle incoming requests and forward them to the specified target
server, then return the target server's response to the client. The proxy server should
support both HTTP and HTTPS requests.

### Decision

We will implement an HTTP Proxy Server using Node.js built-in `http` and `https` modules. The server will listen for incoming requests, forward them to the target server, and send the response back to the client. It will also use a file-based caching system to store responses for a certain period of time.

### Breakdown of the code implementation

1. It sets up a configuration object `proxyConfig` that contains the protocol, host, and port of the target server to which requests will be proxied. These values are read from environment variables, with 'https' as the default protocol.
2. It sets up a constant `PORT` for the server port, which is read from an environment variable with a default value of 3000.
3. It creates an HTTP server with `http.createServer()`. The function passed to `createServer` is the request handler that will be called every time the server receives a request.
4. Inside the request handler, it creates an instance of `FileBasedCache`.
5. If the incoming request is a GET request, it tries to get the response from the cache using the request URL as the key.
6. If the data is in the cache (`cachedData !== null`), it logs a message, writes a 200 status code and 'application/json' content type to the response headers, sends the cached data as the response body, and ends the response.
7. If the data is not in the cache, it logs the request headers.
8. It determines the protocol of the target server (`targetProtocol`) based on the `proxyConfig.protocol`.
9. It makes a request to the target server using `targetProtocol.request()`. The options object passed to `request()` contains the host, port, URL path, and method of the target server. The function passed to `request()` is the response handler that will be called when the server receives a response from the target server.
