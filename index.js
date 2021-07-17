const app = require('./app')
const config = require('config')

const port = config.get('port') || 5500

app.listen(port, () => console.log(`Service has been started on port ${port}`))