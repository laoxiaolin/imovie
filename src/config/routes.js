var Index = require('../app/controllers/index')

module.exports = (app) => {

    // Index
    app.get('/', Index.index)

    
}