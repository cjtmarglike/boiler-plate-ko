if(process.env.NODE_ENV === 'production') {
    console.log('prodddddddddddddd')
    module.exports = require('./prod')
} else {
    console.log('devvvvvvvvvvvvvv')
    module.exports = require('./dev')
}