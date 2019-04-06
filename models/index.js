// Imports:
const fs = require('fs');

/************************************************************************
 * The following code grabs every file in the /models directory (except
 * index.js) and exports it using its filename (without the .js extension).
 ************************************************************************/

fs.readdirSync(__dirname).forEach(file => {
    if(file !== 'index.js') {
        const filename = file.replace('.js', '');
        module.exports[filename] = require('./' + file);
    }
});