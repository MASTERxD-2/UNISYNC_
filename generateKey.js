const crypto = require('crypto');

// Generate a 64-byte random value and convert it to a hex string
const secretKey = crypto.randomBytes(64).toString('hex');

// Output the generated secret key to the console
console.log('Generated JWT_SECRET:', secretKey);
