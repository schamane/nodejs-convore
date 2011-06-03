/*
 * Connection Manager wrapper for https connections
 * @class ConnectionManager
 * @author Nazar Kulyk
 * @version 1.0
 */
var ConnectionManager = function(options) {
    this.transport = require('https');
    this.options = options || null;
};

ConnectionManager.VERSION = "1.0";

/*
 * Catch data sended as response from http connection
 * @method _onGetResponse
 * @private
 * @param {Object} res http response
 * @param {Function} callback that should be called after response
 */
ConnectionManager.prototype._onGetResponse = function(res, callback) {
    var data = "";
    res.on('data', function(chunk) {
        data += chunk;
    });
    res.on('end', function() {
        if(res.statusCode === 200) {
            var obj = null;
            try{
                obj = JSON.parse(data);
            }catch(e) {
                console.log(e);
            }
            process.nextTick(function() {
                callback(obj);
            });
        } else throw new Error("Transport return code that is not ok : " + res.statusCode + "\n" + data);
    });
};

/*
 * Change http options, see nodejs doc for more info about options
 * @method setOptions
 * @param {Object} options http options object
 */
ConnectionManager.prototype.setOptions = function(options) {
    this.options = options;
};

/*
 * Start request and pass response to callback
 * @method get
 * @param {String} path relative url used for request
 * @param {Object} args
 * @param {Function} callback should be called if everything goes as expected
 * @param {Boolean} post make post request
 */
ConnectionManager.prototype.get = function(path, args, callback, post) {
    var options = this.options,
        req, reqString;
    if(!options)
        throw new Error("Transport options has to be filled.");
    if(post)
        options.method = "POST";
    if(!post && args) {
        reqString = require('querystring').stringify(args);
    }
    options.path = reqString ? path + "?" + reqString: path;
    console.log(options.path);
    options.headers["Content-Length"] = 0;
    req = this.transport.request(options, function(res) {
        this._onGetResponse(res, callback);
    }.bind(this)).on('error', function(e){
        throw e;
    });
    req.end();
};

/*
 * Start request and pass response to callback
 * @method get
 * @param {String} path relative url used for request
 * @param {Object} args
 * @param {Function} callback should be called if everything goes as expected
 */
ConnectionManager.prototype.post = function(path, args, callback) {
    this.get(path, args, callback, true);
};

/*
 * Return string for debug and trace
 * @method toString
 * @return {String} ID of the class
 */
ConnectionManager.prototype.toString = function() {
    return "ConnectionManager v."+ConnectionManager.VERSION;
};

module.exports = ConnectionManager;
