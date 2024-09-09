const prodData = require('../data/index.js')
const seed = require('./seed.js')
const db = require('../connection.js')


const runSeed = () => {
    return seed(prodData).then(() => db.end())
}

runSeed()