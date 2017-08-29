const copyConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');
copyConfig.copyFonts.src.push('{{ROOT}}/node_modules/font-awesome/fonts/**/*');


// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string

