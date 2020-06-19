var http = require("http");  
  
var data = {username:"hello",password:"123456"};  
data = JSON.stringify(data);  
//data = require('querystring').stringify(data);  
  
var opt = {  
    host:'http://api.varena.com/fundata-dota2-free/v2/league/team',  
    method:'get',  
    headers:{  
        "Content-Type": 'application/json',  
    }  
}  
  console.log(http.request)
var body = '';  
var req = http.request('http://api.varena.com/fundata-dota2-free/v2/league/team',opt, function(res) {  
    console.log("response: " + res.statusCode);  
    res.on('data',function(data){  
        body += data;  
    }).on('end', function(){  
        console.log(body)  
    });  
}).on('error', function(e) {  
    console.log("error: " + e.message);  
})  
req.write(data);  
req.end();  