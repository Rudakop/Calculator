const checkPrime = require('../checkPrime')

const handler = function (req, reply) {
    const { action, numbers } = req.body

    if (!Array.isArray(numbers)) {
        return reply.code(400).send()  
    }

    const sum = numbers.reduce((acc, value) => {
        const num = parseInt(value)

        if (typeof num !== 'number' || isNaN(num)) {
            return acc
        }

        return acc + num
    }, 0)

    reply.send({
        result: sum,
        isPrime: checkPrime(sum)
    })
}


module.exports = {
    method: 'POST',
    path: '/api/sum',
    schema: {
        body: {
            type: 'object',
            required: ['action', 'numbers'],
            properties: {
                action: { type: 'string' },
                numbers: {
                    type: 'array',
                    items: { type: 'integer' },
                    default: []
                }
            }
        }
    },
    handler
}