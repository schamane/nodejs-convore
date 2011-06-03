var testCase = require('nodeunit').testCase;

var myTestCase = testCase({
    
    setUp: function(callback) {
        this.Convore = require('../convore');
        var auth = this.auth = require('../auth');
        this.convore = new this.Convore(auth.username, auth.password);
        callback();
    },
    
    tearDown: function(callback) {
        delete this.convore;
        delete this.Convore;
        callback();
    },

    testLoginApi: function(test) {
        test.expect(1);
        this.convore.verifyCredentials(function(result) {
            test.ok(result, "Authentefication result from convore api was negative");
            test.done();
        }.bind(this));
    },
    
    testUserInfoApi: function(test) {
        test.expect(1);
        var username = this.auth.username;
        this.convore.getUserInfo(function(userInfo) {
            test.equals(userInfo.username, username, "Authentefication username doesnt match");
            test.done();
        }.bind(this));
    }
});

module.exports = myTestCase;
