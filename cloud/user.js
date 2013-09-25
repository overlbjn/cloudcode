// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
//
var crypto = require('crypto');
var moment = require('moment');
var Buffer = require('buffer').Buffer;
var http = require('http');



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
    
    var bodyxml ='<SubAccount><appId>aaf98f894032b2370140479684b0009f</appId><friendlyName>1234556@qq.com</friendlyName><accountSid>aaf98f894032b237014047963bb9009d</accountSid></SubAccount>';

    // response.success(sig.toUpperCase());
    var options = {
        hostname:'https://app.cloopen.com',
        port:8883,
        path:'/2013-03-22/Accounts/aaf98f894032b237014047963bb9009d/SubAccounts?sig='+sig.toUpperCase(),
        method:'POST',
        headers:{
            'Content-Type': 'application/xml',
            'Accept': 'application/xml',
            'charset': 'utf-8',
            'Authorization': authorization64
        }
    };
    
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            if (res.statusCode == '200') {	//HTTP相应的status
                var xmlDoc = libxmljs.parseXml(chunk);  //解析HTTP响应的body
                //chunk 中含有html实体，这里多做1次解析
                var massSend = xmlDoc.get('//massSend');
                var xmlDoc2 = libxmljs.parseXml(massSend.text());
                var sendStatus = xmlDoc2.get('//replyCode').text();
               // var timestmp = new Date().getTime();
                var empplog = {phone:cellPhone, content:smsContent, status:sendStatus};
                var query = connection.query('INSERT INTO empplog SET ?', empplog, function (err, result) {
                    if(err) throw err;
                });
                if (sendStatus == '001') {
                    httpRes.write('1');
                    httpRes.end();
                } else {
                    httpRes.write('-8');
                    httpRes.end();
                }
            }
        });
    });

    req.on('error', function (httpResponse) {
        //throw e.message;
        respose.error('Request failed with response code ' + httpResponse.status);
    });

// write data to request body
    req.write(bodyxml);
    req.end();
    response.success(httpResponse.text);

    // AV.Cloud.httpRequest({
    //     method: 'POST',
    //     url: 'https://app.cloopen.com:8883/2013-03-22/Accounts/aaf98f894032b237014047963bb9009d/SubAccounts?sig='+sig.toUpperCase(),
    //     headers: {
    //         'Content-Type': 'application/xml',
    //         'Accept': 'application/xml',
    //         'charset': 'utf-8',
    //         'Authorization': authorization64
    //     },
    //     body: bodyxml,
    //     success:function(httpResponse) {
    //         response.success(httpResponse.text);
    //     },
    //     error:function(httpResponse) {
    //         respose.error('Request failed with response code ' + httpResponse.status);
    //     }
    // });
    
});

