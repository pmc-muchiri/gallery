require('dotenv').config();

var config = {};

const { MONGO_USERNAME: username, MONGO_PASSWORD: password, MONGO_CLUSTER: cluster, APP_VALUE: app_value} = process.env;

config.mongoURI = {
    production: `mongodb+srv://${username}:${password}@${cluster}/darkroom?retryWrites=true&w=majority&appName=${app_value}`,
    development: `mongodb+srv://${username}:${password}@${cluster}/darkroom-dev?retryWrites=true&w=majority&appName=${app_value}`,
    test: `mongodb+srv://${username}:${password}@${cluster}/darkroom-test?retryWrites=true&w=majority&appName=${app_value}`,

    }
module.exports = config;