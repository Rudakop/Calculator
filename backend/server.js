// Require the framework and instantiate it
const app = require('fastify')({
    logger: true
})

/* Setup CORS */
app.register(require('fastify-cors'))

/* multiple integers */
app.route(require('./endpoints/getSum'))

/* Check numbers for prime */
app.route(require('./endpoints/isPrime'))

/* Just test */
app.route(require('./endpoints/getTest'))

// Run the server!
app.listen(3000, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
})
