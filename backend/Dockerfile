FROM node
WORKDIR /backend
COPY . /backend
RUN npm install;\
    chmod +x app.js
CMD node app.js
EXPOSE 80