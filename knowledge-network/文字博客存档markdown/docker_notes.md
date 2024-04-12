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



