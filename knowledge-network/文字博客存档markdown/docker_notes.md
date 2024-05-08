## 基础的docker

下面是一段基础版本的docker，在代码中创建 `Dockerfile` 文件，然后在代码中写入下面的内容！

- 这是最基础版本的

```dockerfile
# 基于node18版本的
FROM node:18
# 指定当前的目录容器为/app 下
WORKDIR /app
# 把package.json 复制到容器里，并设置淘宝镜像
COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .
# 开始构建
RUN npm run build
# 暴露3000端口
EXPOSE 3000
# 容器跑起来之后执行 node ./dist/main.js 去运行项目
CMD [ "node", "./dist/main.js" ]
```

上面的配置写完后，使用下面的命令去构建 nest为容器名称，first为标签

`docker build -t nest:first`

使用上面这个后，所需要的容器大小非常大，所以可以改为下面升级版本的Dockfile配置

## 升级版本docker

采用多阶段去构建dockerfile，

```dockerfile
# alpine 的，这是一个 linux 发行版，主打的就是一个体积小
# 给当前镜像设置一个 build-stage的名称
FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/
# 只安装 dependencies 依赖
RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
```

执行这段脚本`docker build -t nest:second .`



## docker一些相关命令

### 基础操作

- `docker --version`：查看 Docker 版本。
- `docker info`：查看 Docker 系统信息。

### 镜像操作

- `docker images`：列出本地所有镜像。
- `docker pull [image]`：从 Docker Hub 拉取或者更新指定的镜像。
- `docker build -t [image] [path]`：使用 Dockerfile 创建镜像。
- `docker rmi [image]`：删除指定的镜像。
- `docker tag [source-image] [target-image]`：标记本地镜像，将其归入某一仓库。

### 容器操作

- `docker ps`：列出当前运行的容器。
- `docker ps -a`：列出所有容器，包括未运行的。
- `docker run [options] [image]`：创建一个新的容器并运行一个命令。
- `docker stop [container]`：停止一个运行的容器。
- `docker start [container]`：启动一个停止的容器。
- `docker restart [container]`：重启一个容器。
- `docker rm [container]`：删除一个或多个容器。
- `docker exec -it [container] [command]`：在运行的容器中执行命令。

### 网络操作

- `docker network ls`：列出 Docker 中的网络。
- `docker network create [name]`：创建一个新的网络。
- `docker network connect [network] [container]`：将容器连接到网络。
- `docker network disconnect [network] [container]`：将容器从网络中断开。

### 数据卷操作

- `docker volume ls`：列出所有的数据卷。
- `docker volume create [name]`：创建一个数据卷。
- `docker volume rm [volume]`：删除一个或多个数据卷。

### 日志和监控

- `docker logs [container]`：获取容器的日志输出。
- `docker stats [container]`：显示容器的资源使用情况。

## docker compose的一些命令

1. **启动所有服务**：

   sh

   复制

   ```
   docker-compose up
   ```

   这个命令会根据 docker-compose.yml 文件启动所有配置的服务。加上 `-d` 参数可以在后台运行。

2. **停止并移除容器、网络、默认创建的匿名卷和镜像**：

   sh

   复制

   ```
   docker-compose down
   ```

   这个命令会停止 docker-compose up 创建的所有容器，并移除网络。

3. **启动已经存在的服务容器**：

   sh

   复制

   ```
   docker-compose start
   ```

4. **停止已经运行的容器**：

   sh

   复制

   ```
   docker-compose stop
   ```

5. **重启服务**：

   sh

   复制

   ```
   docker-compose restart
   ```

6. **查看正在运行的服务**：

   sh

   复制

   ```
   docker-compose ps
   ```

7. **构建（或重新构建）服务**：

   sh

   复制

   ```
   docker-compose build
   ```

8. **查看服务的日志输出**：

   sh

   复制

   ```
   docker-compose logs
   ```

9. **暂停所有容器**：

   sh

   复制

   ```
   docker-compose pause
   ```

10. **恢复所有暂停的容器**：

    sh

    复制

    ```
    docker-compose unpause
    ```

11. **杀死所有正在运行的容器**：

    sh

    复制

    ```
    docker-compose kill
    ```

12. **查看服务的状态**：

    sh

    复制

    ```
    docker-compose status
    ```

13. **拉取服务依赖的镜像**：

    sh

    复制

    ```
    docker-compose pull
    ```

14. **推送服务构建的镜像**：

    sh

    复制

    ```
    docker-compose push
    ```

15. **运行一次性命令**：

    sh

    复制

    ```
    docker-compose run [service] [command]
    ```

16. **查看版本信息**：

    sh

    复制

    ```
    docker-compose version
    ```

## 防火墙的一些命令

### irewalld 命令

`firewalld` 提供了一个动态的防火墙管理工具，它使用区域和服务而不是链式规则。

- `sudo firewall-cmd --state`：显示 firewalld 的状态。
- `sudo firewall-cmd --reload`：重新加载防火墙规则。
- `sudo firewall-cmd --list-all`：显示当前活动的区域的配置。
- `sudo firewall-cmd --get-default-zone`：获取默认的区域。
- `sudo firewall-cmd --set-default-zone=public`：设置默认的区域为 public。
- `sudo firewall-cmd --add-service=http`：允许 HTTP 服务（等同于开放端口 80）。
- `sudo firewall-cmd --remove-service=http`：禁止 HTTP 服务。
- `sudo firewall-cmd --add-port=8080/tcp`：允许 TCP 端口 8080。
- `sudo firewall-cmd --zone=public --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" port port="3306" protocol="tcp" accept'`：添加一个富规则，允许来自 192.168.1.0/24 网段的 TCP 端口 3306 的流量。

请注意，`iptables` 和 `firewalld` 命令通常需要管理员权限（sudo）来执行。在修改防火墙规则时，务必小心，错误的配置可能导致服务不可达或者安全漏洞。在生产环境中，建议在修改前备份当前的防火墙配置，并在测试环境中验证新的规则。