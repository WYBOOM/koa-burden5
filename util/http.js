const http = require('http')
const md5 = require('js-md5')

const query = function (method, url) {
  const baseUrl = 'http://api.varena.com/fundata-dota2-free/v2'
  const key = '7762ad77fdc31819162e4f28bf8cd303'
  const secret = 'ee6c18f2cffc41125d2d79fb7ca6d38a'
  const str = randomString(10)
  const timeStamp = Math.floor(new Date().getTime() / 1000)
  const md5str = [
    str,
    secret,
    timeStamp,
    '/fundata-dota2-free/v2' + url,
    'limit=10&page=0',
  ].join('|')
  const sign = md5(
    md5str
  )
  console.log('md5',md5str)
  console.log('md5',sign)


  return new Promise((resolve, reject) => {
      let body = ''
    const ret = http.request(
      baseUrl + url +'?limit=10&page=0',
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept-ApiKey': key,
          'Accept-ApiNonce': str,
          'Accept-ApiTime': timeStamp,
          'Accept-ApiSign': sign,
        },
      },
      
      function (res) {
        console.log('responseWWWWW: ' + res.statusCode)
        res
          .on('data', function (data) {
            body += data
          })
          .on('end', function () {
            console.log('返回的bodyWWWWW', body)
          })
          resolve()
      }
    )
    ret.end();
    console.log('ret',ret);
  })
}

function randomString(len) {
  len = len || 32
  var $chars =
    'abcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length
  var pwd = ''
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

module.exports = query
