const http = require('http')
const md5 = require('js-md5')

/**
 * 封装http.request 方法 ，请求头增加varena要求的接口并完成签名算法
 * @param {*} method 请求方法 'get|post'
 * @param {*} url 请求url 相对于'http://api.varena.com/fundata-dota2-free/v2'
 * @param {*} originalUrl 源请求url 用于处理入参
 */
const query = function (method, url, originalUrl) {
  const baseUrl = 'http://api.varena.com/fundata-dota2-free/v2'
  const key = '7762ad77fdc31819162e4f28bf8cd303'
  const secret = 'ee6c18f2cffc41125d2d79fb7ca6d38a'
  const str = randomString(10)
  const timeStamp = Math.floor(new Date().getTime() / 1000)

  //接口均为get请求，将入参转为数组形式用于排序
  const paramsStr = sortParmas(originalUrl)

  const md5str = [
    str,
    secret,
    timeStamp,
    '/fundata-dota2-free/v2' + url,
    paramsStr
  ].join('|')
  const sign = md5(md5str)

  return new Promise((resolve, reject) => {
    let body = ''
    const ret = http.request(
      baseUrl + url + '?' +paramsStr,
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
      (res) => {
        console.log('返回码: ' + res.statusCode)
        res
          .on('data', function (data) {
            body += data
          })
          .on('end', function () {
            // console.log('返回的body', body)
            resolve(body)
          })
      }
    )
    ret.end()
  })
}

/**
 * 将传入的源请求解析入参
 * 按照首字母升序排序入参
 * @param {*} originalUrl 
 */
function sortParmas(originalUrl) {
    if(originalUrl.indexOf('?')===-1){
        return ''
    }
    const str = originalUrl.split('?')[1]
    let obj = {}
    str.split('&').map(i=>{
        obj[i.split('=')[0]] = i.split('=')[1]
    })

    let paramsArr = []
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key]
          paramsArr.push(key + '=' + element)
        }
      }
    //   字母升序排序
      paramsArr.sort((a,b)=>{
        if(a.substring(0,1)<=b.substring(0,1)){
            return -1
        }else{
            return 1
        }
      })
      
      return paramsArr.join("&")
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
