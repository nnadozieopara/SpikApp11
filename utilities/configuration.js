require('dotenv').config();

const environments = {};

module.exports = {
    'port': process.env.PORT || 3000,
    'host': `http://localhost:3000/api/v1`,
    'JWT_SECRET': process.env.JWT_SECRET,
    'JWT_LIFETIME': process.env.JWT_LIFETIME,
    'application_name': 'spik-app',
    'atlasConnection': process.env.atlasConnection,
    'localConnection': process.env.localMongodbUri,

    //log systems
    'file': process.env.LOG_FILE || "logs.txt",
    'size': process.env.LOG_SIZE || '10M',
    'interval': process.env.LOG_INTERVAL || '1d',
    'compress': process.env.LOG_COMPRESS || 'gzip',
    'format': process.env.LOG_FORMAT || 'combined',

    //cloudinary
    'cloudinaryCloudName' : process.env.cloudName,
    'cloudinaryApiKey' : process.env.api_key,
    'CloudinaryApiSecret': process.env.api_secret,
    'cloudinarySecure' : process.env.secure,

    //mail details
    'gmailUser': process.env.gmailUser,
    'gmailSecret': process.env.gmailSecret

};