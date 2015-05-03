var request = require('request')
var constants = require('../custom_modules/constants')

var HEADERS = constants.HEADERS


var Requester = function(){
    var cookie_jar = request.jar()
    this.request = request.defaults({jar: cookie_jar, strictSSL: false})
}

Requester.prototype.postRequest = function(endpoint, data, callback){
    this.request({
        method: 'POST', 
        url: endpoint, 
        form: data, 
        headers: HEADERS, 
        json: true
        },
        callback)
}

Requester.prototype.getRequest = function(endpoint, callback){
    this.request({
        method: 'GET', 
        url: endpoint, 
        headers: HEADERS, 
        json: true
        }, 
        callback)
}

module.exports = Requester