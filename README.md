## 博客项目后端
使用到的技术：nodejs，mysql，redis，mongodb，nginx
## 环境
node v20.11.1  
mysql v9.0.1  
redis-cli v7.2.5  
mongodb v7.0.14    
nginx v1.27.1  
## 项目启动
redis端口：6379
```
$ redis-server
```
mysql端口：3306  
mongodb端口：27017  
nginx设置反向代理，监听端口8080  
nginx.conf文件
```
  server {
    listen 8080；
    server_name localhost;
    location / {
      proxy_pass http://localhost:8001;
    }

    location /api/ {
      proxy_pass http://localhost:8000;
      proxy_set_header Host $host;
    }
  }
```
```bash
$ nginx -t
$ nginx
```
前端端口：8001
```bash
$ cd front-end
$ http-server -p 8001
```
后端端口：8000
```bash
$ pnpm install
$ pnpm run dev
```
浏览器打开`localhost:8080`和`localhost:8000/login.html`进入项目
