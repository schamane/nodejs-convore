var testCase = require('nodeunit').testCase;

var initialTestCase = testCase({
    
    setUp: function(callback) {
        this.Convore = require('../convore');
        this.convore = new this.Convore('','');
        callback();
    },
    
    tearDown: function(callback) {
        delete this.convore;
        delete this.Convore;
        callback();
    },

    testInitial: function(test) {
        test.expect(2);
        var Convore = require('../convore'),
            convore;
        test.ok(Convore, "We dont have access to module");
        convore = new Convore('','');
        test.ok(convore, "Convore class cant be initialized");
        test.done();
    },
    
    testIdentString: function(test) {
        test.expect(1);
        test.equal("Convore API Client v."+this.Convore.VERSION, this.convore.toString(), "identification string doesnt match");
        test.done();
    },
    
    testAuthString: function(test) {
        test.expect(1);
        var auth = this.convore._createAuthString('testlogin', 'testpassword');
        test.equal("Basic dGVzdGxvZ2luOnRlc3RwYXNzd29yZA==", auth, "authentefication string doesnt match");
        test.done();
    }
});

module.exports = initialTestCase;
