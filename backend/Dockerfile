FROM node
WORKDIR /backend
COPY . /backend
RUN node install;\
    chmod +x app.js
CMD node app.js
EXPOSE 80