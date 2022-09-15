# Node.js and Express.js application with Docker

This is a simple CRUD application (Backend only) which wrapped out by using Dockerfile and manage pertinent services which used to run the app by using Docker Compose file for development and production environment. 

---
## Scope of Project : 
  - CRUD Application (Backend only)
  - Dockerfile
  - Docker Swarm
  - Docker Compose for development environment
  - Docker Compose for production environment

---
## Prerequisites:
  - Docker installation on linux distro [[How to install docker on ubuntu](https://docs.docker.com/engine/install/ubuntu/)].
  <br> So, here I understand people problem who basically still know nothing about docker and then end up confused by reading the documentation, but wanted to see how is it working in the environment. Just follow these steps for quick installation :
  ```
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
  ``` 
  *P.S : written on 15 September 2022.*
  <br>
  Run the command one at a time, and make sure you are in the same directory when you want to run the second command.

  <br>Since installing docker on linux (especially ubuntu) didn't concurrently install the docker compose package, so we need to run the following command to install docker compose :
  ```
  sudo apt install docker-compose
  ```
  <br>or
  - Docker installation on windows [[How to install docker desktop on windows](https://docs.docker.com/desktop/install/windows-install/)]
  <br>Installing docker desktop on windows has already install docker compose package, so you don't need to worry about this.

---
## How to run the application in development environment
After everything is done with the docker installation. Let's start to follow these steps :
<br>
1. Now we can clone this repository into our local repository first :
```
git clone https://github.com/swahyyuu/simple-docker-node.git .
```

2. Next, let's move and ensure we already in root directory of our app in local repository, and then run the following command to run our app into development environment :
```
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
```
```-f```
: means that to which file we desire to run our services.
<br>
```-d```
: means that we will running our services in the background, if we run it without this flag, the output in terminal would be the logs of our services.

3. Next, we can check either our app have running well or cause some errors while creating, run this command : 
```
  docker ps
```

4. There will be 4 container consist  of nginx, redis, mongodb, and node-project (this is our app container name). If one of them didn't show up when we run command above, then we can do debugging to check in which part of our container encounter the error, run the following command :
```
docker logs [container_name]
```
5. After we found the error, if the error is occured in our Node.js or Express.js side, we can just debugging directly while the services of container running. But, if the error is occured in our service or container side, then we need to drop off our services first by running this command :
```
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down -V
```
```-V```
: means that we will bring down our services concurrently the persistent volumes which attached to certain container when we created our services. *This is optional*.

After debug is done, you can follow the second step, and after all, everything will be running fine in the development environment.

If you want to check whether it's work or not, you can open the postman and write this to get request :
```
  http://[ip_address]:4005/api/v1
```
As you may see, this app directed the development environment into port 4005, you can check in *docker-compose.dev.yaml*.
<br> 
You can change the port as you desire, if you want to change it.

---
# Project Reference
Full course and material explanation available on :
- Thanks to this youtube tutorial [here](https://www.youtube.com/watch?v=9zUHg7xjIqQ&list=PLE0M9lpCZoq3T66-bRaopSmogQmid93hA&index=3).

<!-- ---
## How to run the application in production environment

or you can just fork this repository into your github repository, since we need the authorization of the repository to make some changes to ensure our app running well, whenever there is a changes -->

