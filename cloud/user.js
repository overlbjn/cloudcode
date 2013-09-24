// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:

var crypto = require('crypto');
var moment = require('moment');
//注册
AV.Cloud.define('register', function(request, response)
                {

                  //fadfasdf
                var username = request.params.username;
                var password = request.params.password;
                var email = request.params.email;
                
                if (username && password && email){
                
                
                var user = new AV.User();
                user.set("username", username);
                user.set("password", password);
                user.set("email", email);
                
                
                
                user.signUp(null, {
                            success: function(user) {
                            response.success(user);
                            },
                            error: function(user, error) {
                            response.error(user, error);
                            }
                            });
                
                }
});


//登录
AV.Cloud.define('login', function(request, response) 
{
                
    var username = request.params.username;
    var password = request.params.password;
    var theLatitude = request.params.latitude;
    var theLongitude = request.params.longitude;
    var place = request.params.place;

    AV.User.logIn(username, password, 
    {
        success: function(user) 
        {
                  
            if (latitude && longitude && place)
            {
                var userGeoPoint = new AV.GeoPoint({latitude: theLatitude, longitude: theLongitude});
                user.set("location",userGeoPoint);
                user.save(null, {
                    success: function(user) 
                    {
                        response.success(user,user.get(location));
                    },
                    error: function(user, error) 
                    {
                        response.success(user,user.get(location),error);
                    }
                });
            }
            else
            {
                response.success(user,user.get(location));
            }      
        },
        error: function(user, error) {
                                                'asd'.toUpperCase();
          response.error(user, error); 

        }
    });
});

//exports.md5 = function (str) {
//    var md5sum = crypto.createHash('md5');
//    md5sum.update(str);
//    str = md5sum.digest('hex');
//    return str;
//};

function md5 (text) {

    return crypto.createHash('md5').update(text).digest('hex');
};

AV.Cloud.define('md5Test', function(request, response)
{
    response.success(md5('HEHE'));
});

AV.Cloud.define('testCloopen', function(request, response)
{
    var d = new Date();
    var timeStr = d.getFullYear().toString + (d.getMonth()+1).toString + d.getDate().toString + d.getHours().toString + d.getMinutes().toString + d.getSeconds().toString;

//    timeStr = d._format('yyyyMMddHHmmss');

    response.success(moment().format('YYYMMDDHHmmss'));

    var authorizationStr = 'aaf98f894032b237014047963bb9009d'+':'+timeStr;

    var authorization64 = authorizationStr.toString('base64');


//    var md5 = crypto.createHash('md5');

    var sig = md5('aaf98f894032b237014047963bb9009d') + md5('bbc381b9a024443da462307cec93ce0b')+md5(timeStr);

    var body ='123';
//<SubAccount><appId>aaf98f894032b2370140479684b0009f</appId><friendlyName>123456@qq.com</friendlyName><accountSid>aaf98f894032b237014047963bb9009d</accountSid></SubAccount>'


                                   //+ authorization64 + sig + body
    //注册云通信
//    AV.Cloud.httpRequest({
//        method: 'POST',
//        url: 'https://app.cloopen.com:8883/2013-03-22/Accounts/aaf98f894032b237014047963bb9009d/SubAccounts?sig='+sig.toUpperCase(),
//        headers: {
//            'Content-Type': 'application/xml',
//            'Accept': 'application/xml',
//            'charset': 'utf-8',
//            'Authorization': authorization64
//        },
//        body: {
//            body: body
//        },
//        success: function(httpResponse) {
//            console.log(httpResponse.text);
//        },
//        error: function(httpResponse) {
//            console.error('Request failed with response code ' + httpResponse.status);
//        }
//    });

});

