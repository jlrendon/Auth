const jwt = require('jsonwebtoken');
const secret = '3lkajlskdjajjhHGJGdks&//5/eeer';

exports.CreateToken = (user) => {
    return jwt.sign({user}, secret, {expiresIn: '1hr'})
}
