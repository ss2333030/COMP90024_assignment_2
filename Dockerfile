FROM node
WORKDIR /node
COPY . /node
RUN node install express;\
    chmod +x run.sh
CMD node app.js
