var constants = require('../custom_modules/constants')
var URLS = constants.URLS
var Requester = require('./requester')

var OKCupid = function(){
    this.requester = new Requester()
}

OKCupid.prototype.login = function(username, password, callback){
    var data = {
        username: username,
        password: password,
    }
    this.requester.postRequest(URLS.login, data, callback)
}

OKCupid.prototype.visitUser =  function(username, callback){
  var user_profile_url = URLS.visit_user.replace('{username}', username)
  this.requester.getRequest(user_profile_url, callback)
}

OKCupid.prototype.rate = function(target_userid, score, callback){
    var data = {
        okc_api: 1,
        score: score,
        vote_type: 'personality', 
        target_userid: target_userid
    }
    this.requester.postRequest(URLS.rate, data, callback)
}

OKCupid.prototype.getQuickmatch = function(callback){
    this.requester.getRequest(URLS.quickmatch, callback)
}

OKCupid.prototype.getUserProfile = function(username, callback){
    var user_profile_url = URLS.user_profile.replace('{username}', username)
    this.requester.getRequest(user_profile_url, callback)
}

OKCupid.prototype.getUserAnswers = function(username, offset, callback){
    var user_answers_url = URLS.user_answers.replace('{username}', username)
    user_answers_url = user_answers_url.replace('{offset}', offset)
    this.requester.getRequest(user_answers_url, callback)
}

OKCupid.prototype.getVisitors = function(callback){
    this.requester.getRequest(URLS.get_visitors, callback)
}

OKCupid.prototype.getMessages = function(callback) {
    this.requester.getRequest(URLS.messages, callback);
}

module.exports = OKCupid
