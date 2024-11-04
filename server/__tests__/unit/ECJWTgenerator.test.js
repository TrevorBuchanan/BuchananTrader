// JWTgenerator.test.js

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { makeECJWT } = require('../../utils/ECJWTgenerator');

jest.mock('jsonwebtoken');
jest.mock('crypto');

describe('ECJWTgenerator makeECJWT', () => {
    const keyVar = 'test-api-key';
    const validECKey = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIDtNlxk4nXMI3/1d7MZkK8ML4Be91uIDYIzGBKk2gpvWoAoGCCqGSM49
AwEHoUQDQgAEzV5R8Rp9jfCfiC5P8vE2MT6jwF1j5brMUIK8mJz5XyXHd2nklYbi
tAvCHCMZ3Djc3w==
-----END EC PRIVATE KEY-----`;

    const pemContents = validECKey
        .replace(/-----BEGIN EC PRIVATE KEY-----/, '')
        .replace(/-----END EC PRIVATE KEY-----/, '')
        .replace(/\n/g, '')
        .trim();

    let mockCreatePrivateKey;

    beforeAll(() => {
        mockCreatePrivateKey = jest.spyOn(crypto, 'createPrivateKey');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if the secretVar is not in valid EC PEM format (missing start)', () => {
        const invalidSecretVar = `
        MHcCAQEEIDtNlxk4nXMI3/1d7MZkK8ML4Be91uIDYIzGBKk2gpvWoAoGCCqGSM49
        AwEHoUQDQgAEzV5R8Rp9jfCfiC5P8vE2MT6jwF1j5brMUIK8mJz5XyXHd2nklYbi
        tAvCHCMZ3Djc3w==
        -----END EC PRIVATE KEY-----`;

        expect(() => makeECJWT(keyVar, invalidSecretVar, 'test-uri'))
            .toThrow('The provided secretVar is not in a valid EC PEM format.');
    });

    it('should throw an error if the secretVar is not in valid EC PEM format (missing end)', () => {
        const invalidSecretVar = `-----BEGIN EC PRIVATE KEY-----
        MHcCAQEEIDtNlxk4nXMI3/1d7MZkK8ML4Be91uIDYIzGBKk2gpvWoAoGCCqGSM49
        AwEHoUQDQgAEzV5R8Rp9jfCfiC5P8vE2MT6jwF1j5brMUIK8mJz5XyXHd2nklYbi
        tAvCHCMZ3Djc3w==`;

        expect(() => makeECJWT(keyVar, invalidSecretVar, 'test-uri'))
            .toThrow('The provided secretVar is not in a valid EC PEM format.');
    });

    it('should handle error when creating private key fails', () => {
        // Mock the private key creation to throw an error
        crypto.createPrivateKey.mockImplementation(() => {
            throw new Error('Invalid private key');
        });

        // Expect the makeJWT function to throw an error
        expect(() => makeECJWT(keyVar, validECKey, 'test-uri')).toThrow('Invalid private key');
    });

    it('should create a valid JWT with the correct headers and payload when uri is provided', () => {
        mockCreatePrivateKey.mockReturnValue('mocked-private-key');
        const mockNonce = 'mockednonce12345678'; // Example nonce

        crypto.randomBytes.mockReturnValue(mockNonce);

        jwt.sign.mockReturnValue('mocked-jwt-token');

        const result = makeECJWT(keyVar, validECKey, 'test-uri');

        const expectedJwtData = {
            sub: keyVar,
            iss: 'cdp',
            nbf: expect.any(Number),
            exp: expect.any(Number),
            uri: 'test-uri'
        };

        expect(crypto.randomBytes).toHaveBeenCalledWith(16);
        expect(jwt.sign).toHaveBeenCalledWith(expectedJwtData, 'mocked-private-key', {
            algorithm: 'ES256',
            header: { kid: keyVar, nonce: mockNonce } // Ensure this matches the expected value
        });
        expect(result).toBe('mocked-jwt-token');
    });

    it('should create a valid JWT without uri when uri is not provided', () => {
        mockCreatePrivateKey.mockReturnValue('mocked-private-key');
        const mockNonce = 'mockednonce12345678'; // Example nonce

        crypto.randomBytes.mockReturnValue(mockNonce);

        jwt.sign.mockReturnValue('mocked-jwt-token');

        const result = makeECJWT(keyVar, validECKey);

        const expectedJwtData = {
            sub: keyVar,
            iss: 'cdp',
            nbf: expect.any(Number),
            exp: expect.any(Number),
        };

        expect(jwt.sign).toHaveBeenCalledWith(expectedJwtData, 'mocked-private-key', {
            algorithm: 'ES256',
            header: { kid: keyVar, nonce: mockNonce } // Ensure this matches the expected value
        });
        expect(result).toBe('mocked-jwt-token');
    });
});
