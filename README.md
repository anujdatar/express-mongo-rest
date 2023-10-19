# express-mongo-rest

Basic scaffold for backend REST API using typescript express & mongo.

## Getting started
1. Install `degit`
   ```bash
   npm install -g degit
   ```
2. Gegit repo
   ```bash
   degit anujdatar/express-mongo-rest
   degit anujdatar/express-mongo-rest new-project-name
   ```
3. Modify `.env` file to your needs and add to `.gitignore`
4. Happy coding!!

> Note: if you are on Mac and use the default `.env` variable values, you may see a `Error: listen EADDRINUSE: address already in use :::5000` error. This is because Control Center on Mac OS Monterey+ uses ports `5000` and `7000`. Either use a different port for the backend, or turn off `System Settings` > `General` > `AirDrop & Handoff` > `AirPlay Receiver`

## Starting a local MongoDB dev server
```yaml
  mongodb:
    image: mongo:latest
    container_name: mongodb
    restart: unless-stopped
    ports:
      - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - ~/.mongo/data:/data/db
      # - /opt/mongodb/config:/etc/mongo
```


