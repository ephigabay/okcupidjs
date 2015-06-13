var constants = require('../custom_modules/constants');
var URLS = constants.URLS;
var Requester = require('./requester');
var Q = require('q');

var OKCupid = function() {
    this.requester = new Requester();
    this.accessToken = null;
};

OKCupid.prototype.login = function(username, password){
    var data = {
        username: username,
        password: password
    };
    return this.requester.postRequest(URLS.login, data)
};

OKCupid.prototype.loadAccessToken = function() {
    var that = this;
    return this.getConversations().then(function(data) {
        if(data.body && data.body.authcode) {
            that.accessToken = data.body.authcode;
        }
    })
}

OKCupid.prototype.visitUser =  function(username){
    var user_profile_url = URLS.visit_user.replace('{username}', username)
    return this.requester.getRequest(user_profile_url)
};

OKCupid.prototype.rate = function(target_userid, score){
    var data = {
        okc_api: 1,
        score: score,
        vote_type: 'personality',
        target_userid: target_userid
    };
    return this.requester.postRequest(URLS.rate, data)
};

OKCupid.prototype.getQuickmatch = function(){
    return this.requester.getRequest(URLS.quickmatch)
};

OKCupid.prototype.getUserProfile = function(username){
    var user_profile_url = URLS.user_profile.replace('{username}', username);
    return this.requester.getRequest(user_profile_url)
};

OKCupid.prototype.getUserAnswers = function(username, offset){
    var user_answers_url = URLS.user_answers.replace('{username}', username);
    user_answers_url = user_answers_url.replace('{offset}', offset);
    return this.requester.getRequest(user_answers_url)
};

OKCupid.prototype.getVisitors = function(){
    return this.requester.getRequest(URLS.get_visitors)
};

OKCupid.prototype.getConversations = function(offset) {
    var messagesUrl = URLS.conversations.replace('{offset}', offset || 1);
    return this.requester.getRequest(messagesUrl);
};

OKCupid.prototype.getConversation = function(conversationId) {
    var conversationUrl = URLS.conversation.replace('{conversation}', conversationId);
    return this.requester.getRequest(conversationUrl);
};

OKCupid.prototype.sendMessage = function(receiverId, threadId, body) {
    var sendMessageUrl = URLS.sendMessage.replace('{access_token}', this.accessToken);
    var data = {
        body: body,
        receiverid: receiverId,
        reply: "1",
        source: "desktop_messages",
        threadid: threadId
    };
    return this.requester.postRequest(sendMessageUrl, JSON.stringify(data))
};

OKCupid.prototype.deleteConversation = function(conversationId) {
    var deleteUrl = URLS.deleteConversation.replace('{conversation}', conversationId).replace('{access_token}', this.accessToken);
    return this.requester.getRequest(deleteUrl);
}

module.exports = OKCupid;