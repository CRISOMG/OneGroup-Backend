# OneGroup | Backend

### Preparando Entorno

.env.example

```js
// CONFIG
PORT=8080
CORS=*

// MONGO
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME='onegroup'

// AUTH
AUTH_JWT_SECRET=

// API KEYS
ADMIN_API_KEY_TOKEN=
PUBLIC_API_KEY_TOKEN=
```

**AUTH_JWT_SECRET** & **ADMIN_API_KEY_TOKEN** & **PUBLIC_API_KEY_TOKEN** \
Deben ser un 'SHA 256-bit Key' diferentes, recomiendo [keygen.io](https://keygen.io/) para generar estas keys.

### MongoDB Credentials

El formato de la uri que se utiliza para conectarse a mongodb es este

```js
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_HOST = config.dbHost;
const DB_NAME = config.dbName;

const MONGO_URI = config.dev
  ? 'mongodb://127.0.0.1:27017/'
  : `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
```

El USER y PASSWORD se codifican para ser componente de una uri.

Si se esta en un entorno de desarrollo se usa una coneccion a un cluster local de mongodb, de lo contrario se usa una coneccion 'mongodb+src' al cluster de mongodb atlas

### Build Setup

```bash
# install dependencies
$ yarn install

# server in development mode at localhost:8080
$ yarn dev

# server in production mode at localhost:8080
$ yarn start
```

For detailed explanation on how things work, check out [Express.js](https://expressjs.com/es/).
