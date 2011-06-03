/* nodejs-convore */

/*
 * Convore Class to work with convore api
 * @class Convore
 * @version 0.1
 * @author Nazar Kulyk
 */
var Convore = function(username, password) {
    var ConnectionManager = require('./connectionManager'),
        options = this._getHttpOptions(username, password);
    this.connectionManager = new ConnectionManager(options);
    this.urls = require('./paths');
};

Convore.VERSION = "0.1";
Convore.HTTP_OPTIONS = {
  host: 'convore.com',
  port: 443,
  method: 'GET',
  headers: null
};

/*
 * Create string for authentification on convore.com from account credentials
 * @method _createAuthString
 * @private
 * @param {String} username string for the account
 * @param {String} password string password
 * @return {String} authentification string
 */
Convore.prototype._createAuthString = function(username, password) {
    return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
};

/*
 * Create http options object for convore connection
 * @method _getHttpOptions
 * @private
 * @param {String} username string for the account
 * @param {String} password string password
 * @return {Object} http option object with credential headers
 */
Convore.prototype._getHttpOptions = function(username, password) {
    var result = Convore.HTTP_OPTIONS;
    result.headers = {
        'Host': Convore.HTTP_OPTIONS.host,
        'Referer': Convore.HTTP_OPTIONS.host,
        'DEBUG': 'true',
        'Authorization': this._createAuthString(username, password)
    };
    return result;
};

/*
 * Verify credentials over convore api and pass boolean as verifying result,
 * second param is userInfo object
 * @method verifyCredentials
 * @param {Function} callback to be called after api result
 */
Convore.prototype.verifyCredentials = function(callback) {
    this.connectionManager.get(this.urls.verify, null, function(res){
        var result = res ? true : false;
        callback(result);
    });
};

/*
 * Get user info data over convore api and pass userInfo object to callback
 * @method getUserInfo
 * @param {Function} callback to be called after api result
 */
Convore.prototype.getUserInfo = function(callback) {
    this.connectionManager.get(this.urls.verify, null, callback);
};

/*
 *
 * @method markAllAsRead
 */
Convore.prototype.markAllAsRead = function(callback) {
    this.connectionManager.post(this.urls.markRead, null, callback);
};

/*
 *
 * @method getMembersOnline
 */
Convore.prototype.getMembersOnline = function(callback) {
    this.connectionManager.get(this.urls.getMembersOnline , null, callback);
};

/*
 *
 * @method getMentions
 */
Convore.prototype.getMentions = function(callback) {
    this.connectionManager.get(this.urls.getMentions, null, callback);
};

/*
 *
 * @method getGroups
 */
Convore.prototype.getGroups = function(callback) {
    this.connectionManager.get(this.urls.getGroups, null, callback);
};

/*
 *
 * @method getGroupInfo
 */
Convore.prototype.getGroupInfo = function(groupId, callback) {
    var url = this.urls.getGroupInfo.replace(/\:group_id/, groupId);
    //this.connectionManager.get(url, {group_id: groupId}, callback);
    this.connectionManager.get(url, null, callback);
};

/*
 * Returns string to identify module for debuging
 * @method toString
 *
 */
Convore.prototype.toString = function() {
    return "Convore API Client v."+Convore.VERSION;
};

module.exports = Convore;
