
以下是一些常用的 Docker 指令，涵蓋了容器的基本操作：

### 映像檔 (Images)

1. **列出所有映像檔**
   ```bash
   docker images
   ```
2. **從 Docker Hub 拉取映像檔**
   ```bash
   docker pull <image_name>:<tag>
   ```
3. **刪除映像檔**
   ```bash
   docker rmi <image_id>
   ```

### 容器 (Containers)

1. **列出所有運行中的容器**
   ```bash
   docker ps
   ```
2. **列出所有容器 (包含停止的容器)**
   ```bash
   docker ps -a
   ```
3. **啟動容器**
   ```bash
   docker start <container_id>
   ```
4. **停止容器**
   ```bash
   docker stop <container_id>
   ```
5. **重啟容器**
   ```bash
   docker restart <container_id>
   ```
6. **刪除停止的容器**
   ```bash
   docker rm <container_id>
   ```
7. **強制刪除容器**
   ```bash
   docker rm -f <container_id>
   ```
8. **運行新的容器**
   ```bash
   docker run -d --name <container_name> <image_name>:<tag>
   ```
   - `-d` 表示在背景執行容器。
   - `--name` 用來指定容器名稱。

9. **進入運行中的容器**
   ```bash
   docker exec -it <container_id> /bin/bash
   ```
   - `-it` 用於開啟交互模式。

10. **查看容器日誌**
    ```bash
    docker logs <container_id>
    ```

### 容器的管理和網路

1. **檢查容器資源使用情況 (CPU, Memory, etc.)**
   ```bash
   docker stats <container_id>
   ```
2. **列出所有網路**
   ```bash
   docker network ls
   ```
3. **創建新的網路**
   ```bash
   docker network create <network_name>
   ```
4. **連接容器到網路**
   ```bash
   docker network connect <network_name> <container_id>
   ```
5. **從網路斷開容器**
   ```bash
   docker network disconnect <network_name> <container_id>
   ```

### Docker Compose

1. **啟動服務**
   ```bash
   docker-compose up
   ```
2. **啟動服務 (在背景)**
   ```bash
   docker-compose up -d
   ```
3. **停止服務**
   ```bash
   docker-compose down
   ```
4. **查看服務日誌**
   ```bash
   docker-compose logs
   ```

這些指令涵蓋了 Docker 使用中的常見操作，可以幫助你有效地管理 Docker 容器和映像檔。


### 額外指令

1. **啟動所有容器**
docker start $(docker ps -a -q)


2. **移除 Docker Build 暫存快取**
docker builder prune

2-1. **查找 Ubuntu 根目錄的空間**
du -h --max-depth=1 / | sort -rh

2-2. **查找某一層 EX: /var 的空間**
du -h --max-depth=1 /var | sort -rh

2-3. **查看所有 Docker 空間使用量**
docker system df
