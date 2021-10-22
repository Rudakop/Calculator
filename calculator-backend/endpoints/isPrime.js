const checkPrime = require('../checkPrime')

const handler = function (req, reply) {
    const { action, num } = req.body

    reply.send({
        result: num,
        isPrime: checkPrime(num)
    })
}

module.exports = {
    method: 'POST',
    path: '/api/isPrime',
    schema: {
        body: {
            type: 'object',
            required: ['action', 'num'],
            properties: {
                action: { type: 'string' },
                num: { type: 'integer' }
            }
        }
    },
    handler
}