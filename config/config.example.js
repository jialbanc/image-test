var path = require('path');

module.exports.puerto = 13337;
module.exports.upload_puerto = 3535;
module.exports.path_files = path.resolve(__dirname, '../files');
module.exports.access_token = '';

module.exports.steam_conf = {
    storage: {
        defaults: {
            driver: 'fs',
            path: path.resolve(__dirname, '../files')
        },
        cache: {
            path: path.resolve(__dirname, '../cache/cache')
        },
        cacheOptimized: {
            path: path.resolve(__dirname, '../cache/cacheOptimized')
        },
        cacheTTS: 600,
        cacheOptimizedTTS: 300,
        replicas: {
            otherPlace: {
                cache: {
                    path: path.resolve(__dirname, '../cache/replica-cache')
                },
                cacheOptimized: {
                    path: path.resolve(__dirname, '../cache/replica-cacheOptimized')
                }
            }
        }
    },
    router: {
        originalSteps: {
            resize: {
                width: 2560, height: 1440, max: true, canGrow: false
            }
        }
    }
};