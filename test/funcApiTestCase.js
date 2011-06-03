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

    /* exclude it for development
    testMarkAllAsReadApi: function(test) {
        test.expect(1);
        this.convore.markAllAsRead(function(result) {
            test.ok(result.message, "Return message was expected");
            test.done();
        }.bind(this));
    },
    
    testGetMembersOnlineApi: function(test) {
        test.expect(1);
        this.convore.getMembersOnline(function(result) {
            test.ok(result, "User list is expected");
            test.done();
        }.bind(this));
    },
    
    testGetMentionsApi: function(test) {
        test.expect(1);
        this.convore.getMentions(function(result) {
            test.ok(result.mentions, "Mentions expected");
            test.done();
        }.bind(this));
    },
    
    testGetGroupsApi: function(test) {
        test.expect(1);
        this.convore.getGroups(function(result) {
            console.log(result.groups);
            test.ok(result.groups, "Group list expected");
            test.done();
        }.bind(this));
    },
    */
    testGetGroupInfoApi: function(test) {
        test.expect(1);
        this.convore.getGroupInfo(1, function(result) {
            test.ok(result.group, "Group info expected");
            test.done();
        }.bind(this));
    }
    
});

module.exports = myTestCase;
