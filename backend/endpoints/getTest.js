// data
let blocks = [
    {
        N: 3
    },
]

const handler = function (req, reply) {
    return blocks[0].N
}

module.exports = {
    method: 'GET',
    path: '/api/blocks/test',
    handler
}