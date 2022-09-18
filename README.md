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
## CRUD Application

| Method        | URL           | Description           |
| ------------- |:-------------:| -----:                |
| GET           | /api/v1       | Default web interface |
| GET           | /api/v1/posts | Retrieve all posts    |
| POST          | /api/v1/posts | Create a new post     |
| GET           | /api/v1/posts/:id | Get a specific post |
| PATCH         | /api/v1/posts/:id | Update a specific post |
| DELETE        | /api/v1/posts/:id | Delete a specific post |
| POST          | /api/v1/users/signup | Create a new user |
| POST          | /api/v1/users/login | User login |


<br> JSON format of posts
``` JavaScript
{
  "title" : "title of the post",
  "body"  : "body content of post"
}
```
<br> JSON format of users
``` JavaScript
{
  "username"  : "username of user",
  "password"  : "password of user"
}
```

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
  or
  - Docker installation on windows [[How to install docker desktop on windows](https://docs.docker.com/desktop/install/windows-install/)]
  <br>Installing docker desktop on windows has already install docker compose package, so you don't need to worry about this.

---
## How to run the application in development environment
After everything is done with the docker installation. Let's start to follow these steps :
<br>
1. Now, we can clone this repository into our local repository first :
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

## How to run the application in production environment

Now, we jump into how to deploy our application on production environment. Just following these steps :

1. First of all we need a server, we can launch a quick setup server by using a cloud provider such as GCP, Azure, AWS, or DigitalOcean at this point, or you can just launch a virtual machine run on linux. It's your preference.

2. After we launch a server, we should get connect into our server and prepare some environment variables. Ensure you are in the home directory, and follwo these steps : 
``` 
  nano .env
```
Now, copy of the following code to store environment variables inside our system.
```
NODE_ENV=production
MONGO_USER=myusername
MONGO_PASSWORD=mypassword
SESSION_SECRET=secret
MONGO_INITDB_ROOT_USERNAME=myusername
MONGO_INITDB_ROOT_PASSWORD=mypassword
```
To save and exit nano, you press ```ctrl+x``` then ```Y``` and ```enter```.
<br>

3. Now, we need to append a line of code to extract our environment variables which in .env file. Follow these steps : 
```
  nano .profile
```
Now, add the following code into the file at the last line :
```
  set -o allexport; source [path_of_env_file]; set +o allexport
```
or just simply add this :
```
  echo "set -o allexport; source [path_of_env_file]; set +o allexport" >> .profile
```

And then run this : 
```
  source .profile
```
So, now you need to re-enter the server, then run this command to check whether our variables have been stored or not.
```
  printenv
```

4. Now, we can clone this repository into our local repository first :
```
  git clone https://github.com/swahyyuu/simple-docker-node.git .
```

5. We can run our in a similar way within our development environment like this : 
```
  docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d
```

6. Now, if you run command ```docker ps ```, you will see many of containers deployed at one time, please check out what happened on ```docker-compose.prod.yaml``` file.


7. After you see, what's happening here, let's use Docker Swarm as our container orchestration by running this command :
```
  docker swarm init
```

8. When you installing docker at the beginning, it also installed the docker swarm along with it. And now run this command instead of like steps number 5.
```
  docker stack deploy -c docker-compose.yaml -c docker-compose.prod.yaml [service_name]
```
Wait a couple of minutes until all the services up.

9. After that, you can check which services are already running, run this command : 
```
  docker stack ps [service_name]
```
If you want to check whether it's work or not, you can open the postman and write this to get request :
```
  http://[ip_address]/api/v1
```
As you may see, this app directed the production environment into port of http default which is 80.
<br>
Thank you for reading.

---
# Project Reference
**Please for full of explanation about this project refer to this awesome tutorial on youtube.**
- Thanks to this youtube tutorial [here](https://www.youtube.com/watch?v=9zUHg7xjIqQ&list=PLE0M9lpCZoq3T66-bRaopSmogQmid93hA&index=4).

