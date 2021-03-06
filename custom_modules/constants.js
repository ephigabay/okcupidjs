module.exports = {
    URLS: {
        login: 'https://www.okcupid.com/login?okc_api=1',
        rate: 'http://www.okcupid.com/quickmatch',
        visit_user: 'http://www.okcupid.com/profile/{username}',
        user_profile: 'http://www.okcupid.com/profile/{username}?okc_api=1',
        user_answers: 'http://www.okcupid.com/profile/{username}/questions?okc_api=1&n=10&low={offset}',
        get_visitors: 'http://www.okcupid.com/visitors?okc_api=1',
        quickmatch: 'http://www.okcupid.com/quickmatch?okc_api=1',
        conversations: 'http://www.okcupid.com/messages?low={offset}&okc_api=1',
        conversation: 'http://www.okcupid.com/messages?readmsg=true&threadid={conversation}&okc_api=1',
        sendMessage: 'http://www.okcupid.com/apitun/messages/send?&access_token={access_token}',
        deleteConversation: 'http://www.okcupid.com/apitun/messages/{conversation}?&access_token={access_token}&_method=DELETE'
    },
    HEADERS: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'}
}
