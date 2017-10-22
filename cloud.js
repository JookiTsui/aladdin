var AV = require('leanengine');
var utils = require("./libs/utils.js");
/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request) {
  return 'Hello world!';
});

AV.Cloud.define('getWxaCode',function(request){
  //或许小程序的TOKEN
  var request = require('request');
  request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx991b2e004bb2ab85&secret=690f9bd28beeeaa8b57424161904ea98', function (error, response, body) {
  console.log('gettoken_error:', error); // Print the error if one occurred
  console.log('gettoken_statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('gettoken_body:', body);

      //获取小程序二维码
      var token = JSON.parse(body).access_token;

      var requestJson = require("request-json");
      var client = requestJson.createClient('https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + token);

      var data = {
        path: "pages/index/index"
      };
      client.post('',data,function(errorJson,responseJson,bodyJson){
      console.log("bodyJson: ",JSON.stringify(bodyJson));
      var imgData = { base64: bodyJson};
      var codeImg = new AV.File('codeImg.jpg',imgData);
      codeImg.save();

      // var imgResData = { base64: responseJson};
      // var codeResImg = new AV.File('codeResImg.jpg',imgResData);
      // codeResImg.save();
      // var bufferImgStream = new Buffer(bodyJson);
      // var wxacodeImg = new AV.File('wxacodeImg.jpg',bufferImgStream);
      // wxacodeImg.save();
      });
  });
});
