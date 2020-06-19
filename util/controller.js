const fs = require('fs');

// 判断请求方法，根据方法调用router的对应方法
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

//遍历controllers 文件夹下的所有js文件，将router与方法对应
function addControllers(router) {
    var files = fs.readdirSync('./controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require('../controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        // controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router);
    return router.routes();
};