const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const makeJWT = (keyVar, secretVar, uri) => {
    if (!secretVar.startsWith('-----BEGIN EC PRIVATE KEY-----') ||
        (!secretVar.endsWith('-----END EC PRIVATE KEY-----') && !secretVar.endsWith('-----END EC PRIVATE KEY-----\n'))) {
        throw new Error('The provided secretVar is not in a valid EC PEM format.');
    }

    const pemContents = secretVar
        .replace(/-----BEGIN EC PRIVATE KEY-----/, '')
        .replace(/-----END EC PRIVATE KEY-----/, '')
        .replace(/\n/g, '')
        .trim();

    const privateKeyBuffer = Buffer.from(pemContents, 'base64');
    let privateKey;
    try {
        privateKey = crypto.createPrivateKey({
            key: privateKeyBuffer,
            format: 'der',
            type: 'sec1' // sec1 is used for EC keys
        });
    } catch (error) {
        console.error('Error loading EC private key:', error.message);
    }

    const jwtData = {
        sub: keyVar,
        iss: "cdp",
        nbf: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 120
    };

    if (uri) {
        jwtData.uri = uri;  // Add uri property to jwtData if uri is truthy
    }

    // Create a nonce using crypto
    const nonce = crypto.randomBytes(16).toString('hex'); // Generates a random nonce

    // Encode the JWT token
    const jwtToken = jwt.sign(jwtData, privateKey, {
        algorithm: "ES256", // Specify the algorithm
        header: { kid: keyVar, nonce: nonce } // Add custom headers
    });

    return jwtToken;
}

module.exports = {
    makeJWT,
};