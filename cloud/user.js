// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
//
var crypto = require('crypto');
var moment = require('moment');
var Buffer = require('buffer').Buffer;



function md5 (text) {

    return crypto.createHash('md5').update(text).digest('hex');
};

function base64 (text){
    return new Buffer("text").toString('base64');
}

AV.Cloud.define('testCloopen', function(request, response)
{
    var timeStr = moment().format('YYYMMDDHHmmss');

    var authorizationStr = 'aaf98f894032b237014047963bb9009d'+':'+timeStr;

    var authorization64 = base64(authorizationStr);
    
    var sigstr = 'aaf98f894032b237014047963bb9009d'+'bbc381b9a024443da462307cec93ce0b'+timeStr;

    var sig = md5(sigstr);
    
    var bodyxml ='<SubAccount><appId>aaf98f894032b2370140482ac6dc00a8</appId><friendlyName>qq24556@qq.com</friendlyName><accountSid>aaf98f894032b237014047963bb9009d</accountSid></SubAccount>';

    // response.success('body:'+bodyxml);
    // response.success('https://sandboxapp.cloopen.com:8883/2013-03-22/Accounts/aaf98f894032b237014047963bb9009d/SubAccounts?sig='+sig.toUpperCase()),
    AV.Cloud.httpRequest({
        method: 'POST',
        url: 'https://app.cloopen.com:8883/2013-03-22/Accounts/aaf98f894032b237014047963bb9009d/SubAccounts?sig='+sig.toUpperCase(),
        headers: {
            'Content-Type': 'application/xml;charset=utf-8',
            'Accept': 'application/xml',
            'Authorization': authorization64
        },
        body: bodyxml,
        success:function(httpResponse) {
            console.log(httpResponse.text);
            response.success(httpResponse.text);
        },
        error:function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status+url+headers+bodyxml);
            response.error('Request failed with response code ' + httpResponse.status);
        }
    });
    
});

