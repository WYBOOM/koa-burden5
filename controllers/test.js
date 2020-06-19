const http = require('http')

const testApi = async (ctx, next) => {
  console.log('ctx', ctx)
    var body = ''
  var req = http
    .request(
      'http://api.varena.com/fundata-dota2-free/v2/league/team',
      {
        method:'get',  
        headers:{  
            "Content-Type": 'application/json',  
        }  
      },
      function (res) {
        console.log('response: ' + res.statusCode)
        res
          .on('data', function (data) {
            body += data
          })
          .on('end', function () {
            console.log("返回的body",body)
          })
      }
    )
    .on('error', function (e) {
      console.log('error: ' + e.message)
    })
      
var data = {username:"hello",password:"123456"};  
data = JSON.stringify(data); 
  req.write(data)
  req.end()

  ctx.response.body = '测试'
}

module.exports = {
  'GET /wytest': testApi,
}
