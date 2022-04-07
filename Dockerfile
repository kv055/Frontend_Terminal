FROM nginx
COPY /build /usr/share/nginx/html

# sudo docker run -p 6060:80 -t test/terminalui
# sudo docker run -p 6060:80 <image-id>

# sudo docker build . -t test/terminalui
# sudo docker images

# delete image
# sudo docker rmi <imageid>

# remove all containers
# sudo docker system prune

# sudo docker exec -it <CONTAINER_ID> /bin/bash