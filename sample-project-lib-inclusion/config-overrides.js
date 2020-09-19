const path = require('path');
const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
    alias({
        react: path.resolve('./node_modules/react'),
    })(config)

    return config;
};
