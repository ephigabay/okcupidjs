var request = require('request')
var constants = require('../custom_modules/constants')
var Q = require('q');

var HEADERS = constants.HEADERS


var Requester = function(){
    var cookie_jar = request.jar()
    this.request = request.defaults({jar: cookie_jar, strictSSL: false})
}

Requester.prototype.postRequest = function(endpoint, data){
    var deferred = Q.defer();
    this.request({
        method: 'POST', 
        url: endpoint, 
        form: data, 
        headers: HEADERS, 
        json: true
        },
        function(error, response, body) {
            if(error) {
                deferred.reject(error, response, body);
            }
            else {
                deferred.resolve({response: response, body: body})
            }
        });
    return deferred.promise;
}

Requester.prototype.getRequest = function(endpoint){
    var deferred = Q.defer();
    this.request({
        method: 'GET',
        url: endpoint,
        headers: HEADERS,
        json: true
        },
        function(error, response, body) {
            if(error) {
                deferred.reject(error, response, body);
            }
            else {
                deferred.resolve({response: response, body: body})
            }
        });
    return deferred.promise;
}

module.exports = Requester