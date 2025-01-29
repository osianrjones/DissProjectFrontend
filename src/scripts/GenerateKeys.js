const crypto = require('crypto');
const fs = require('fs');

// Generate RSA key pair
crypto.generateKeyPair('rsa', {
    modulusLength: 2048,  // Key size in bits
    publicKeyEncoding: {
        type: 'spki',      // Recommended public key format
        format: 'pem'      // Output format
    },
    privateKeyEncoding: {
        type: 'pkcs8',     // Recommended private key format
        format: 'pem'      // Output format
    }
}, (err, publicKey, privateKey) => {
    if (err) {
        console.error("Key generation failed:", err);
        return;
    }

    // Save keys to files
    fs.writeFileSync('private_key.pem', privateKey);
    fs.writeFileSync('public_key.pem', publicKey);

    console.log("Keys generated and saved as 'private_key.pem' and 'public_key.pem'.");
});
