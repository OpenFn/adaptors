import { mSetString, mGetString, setMockClient } from '../src/index.js';
import { createClient } from 'redis';

// ⚠️ CONFIGURE YOUR REDIS CREDENTIALS HERE OR USE ENV VARS
const configuration = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  username: process.env.REDIS_USERNAME || undefined,
  tls: process.env.REDIS_TLS === 'true', // Set REDIS_TLS=true for cloud
};

async function runLiveTest() {
  console.log(`🔌 Connecting to Redis at: ${configuration.host}:${configuration.port} (TLS: ${configuration.tls})`);

  // 1. Create and Connect a REAL Redis client
  const protocol = configuration.tls ? 'rediss' : 'redis';
  // Construct auth string: "username:password@" or ":password@" or ""
  let auth = '';
  if (configuration.password) {
    auth = configuration.username 
      ? `${configuration.username}:${configuration.password}@` 
      : `:${configuration.password}@`;
  }

  const client = createClient({
    url: `${protocol}://${auth}${configuration.host}:${configuration.port}`
  });

  client.on('error', err => console.error('Redis Client Error', err));

  await client.connect();
  console.log('✅ Connected to Redis.');

  // 2. Inject the real client into the adaptor
  setMockClient(client);

  const performMSet = mSetString({
    'live:test:1': 'Hello',
    'live:test:2': 'World',
    'live:test:3': 'OpenFn'
  });

  const performMGet = mGetString([
    'live:test:1', 
    'live:test:2', 
    'live:test:3'
  ]);

  try {
    // 1. Run mSetString
    console.log('📝 Running mSetString...');
    const stateAfterSet = await performMSet({ configuration });
    console.log('✅ mSetString complete.');

    // 2. Run mGetString
    console.log('📖 Running mGetString...');
    const stateAfterGet = await performMGet(stateAfterSet);
    
    console.log('📊 Result Data:', stateAfterGet.data);

    if (
      stateAfterGet.data[0] === 'Hello' && 
      stateAfterGet.data[1] === 'World'
    ) {
      console.log('✨ SUCCESS: Real data verification passed!');
    } else {
      console.error('❌ FAILURE: Data mismatch.');
    }

  } catch (error) {
    console.error('❌ ERROR:', error);
  } finally {
    // Force exit to close potential open handles
    process.exit(0);
  }
}

runLiveTest();
