var constants = require('../custom_modules/constants');
var URLS = constants.URLS;
var Requester = require('./requester');

var OKCupid = function() {
    this.requester = new Requester()
};

OKCupid.prototype.login = function(username, password, callback){
    var data = {
        username: username,
        password: password
    };
    this.requester.postRequest(URLS.login, data, callback)
};

OKCupid.prototype.visitUser =  function(username, callback){
    var user_profile_url = URLS.visit_user.replace('{username}', username)
    this.requester.getRequest(user_profile_url, callback)
};

OKCupid.prototype.rate = function(target_userid, score, callback){
    var data = {
        okc_api: 1,
        score: score,
        vote_type: 'personality',
        target_userid: target_userid
    };
    this.requester.postRequest(URLS.rate, data, callback)
};

OKCupid.prototype.getQuickmatch = function(callback){
    this.requester.getRequest(URLS.quickmatch, callback)
};

OKCupid.prototype.getUserProfile = function(username, callback){
    var user_profile_url = URLS.user_profile.replace('{username}', username);
    this.requester.getRequest(user_profile_url, callback)
};

OKCupid.prototype.getUserAnswers = function(username, offset, callback){
    var user_answers_url = URLS.user_answers.replace('{username}', username);
    user_answers_url = user_answers_url.replace('{offset}', offset);
    this.requester.getRequest(user_answers_url, callback)
};

OKCupid.prototype.getVisitors = function(callback){
    this.requester.getRequest(URLS.get_visitors, callback)
};

OKCupid.prototype.getConversations = function(callback, offset) {
    var that = this;
    var MESSAGES_PER_REQUEST = 30;
    if(!offset) {
        offset = 1;
        OKCupid.gatheredMessages = [];
    }
    var messagesUrl = URLS.conversations.replace('{offset}', offset);
    this.requester.getRequest(messagesUrl, function(error, response, body) {
        if(body.messages.length > 0) {
            OKCupid.gatheredMessages = OKCupid.gatheredMessages.concat(body.messages);
            that.getConversations(callback, offset + MESSAGES_PER_REQUEST)
        }
        else {
            body.messages = OKCupid.gatheredMessages;
            callback(error, response, body);
        }
    });
};

OKCupid.prototype.getConversation = function(conversationId, callback) {
    var conversationUrl = URLS.conversation.replace('{conversation}', conversationId);
    return this.requester.getRequest(conversationUrl, callback);
};

OKCupid.prototype.sendMessage = function(receiverId, threadId, body,access_token, callback) {
    var sendMessageUrl = URLS.sendMessage.replace('{access_token}', access_token);
    var data = {
        body: body,
        receiverid: receiverId,
        reply: "1",
        source: "desktop_messages",
        threadid: threadId
    };
    console.log(data);
    return this.requester.postRequest(sendMessageUrl, JSON.stringify(data), callback)
}

module.exports = OKCupid;
