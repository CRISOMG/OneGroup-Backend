const MongoLib = require('../lib/mongo');
const { adminApiKeyToken, publicApiKeyToken } = require('../config').config;

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'create:products',
  'read:products',
  'update:products',
  'delete:products',
];

const publicScopes = ['signin:auth', 'signup:auth', 'read:products'];

const apiKeys = [
  {
    token: adminApiKeyToken,
    scopes: adminScopes,
  },
  {
    token: publicApiKeyToken,
    scopes: publicScopes,
  },
];

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    console.log('Cheking ApiKeys...');
    const promises = apiKeys.map(async (apiKey) => {
      const [existApiKey] = await mongoDB.getAll('api-keys', { token: apiKey.token });

      if (!existApiKey) {
        await mongoDB.create('api-keys', apiKey);
        console.log('ApiKey Created');
      }
    });

    await Promise.all(promises);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedApiKeys();
