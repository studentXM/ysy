let dotenv = require('dotenv')
let env;
if (process.env.NODE_ENV === 'development') {
    env = dotenv.config({ path: '.env.development' }).parsed;
} else {
    env = dotenv.config({ path: '.env' }).parsed;
}

module.exports = env
