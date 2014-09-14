
/**
 * Login Class
 */
function Login() {
	// sessionId -> user map
	this.sessionMap = {
		99999 : { name: 'Foo', email: 'foo@bar.com' }
	};
}
/**
 * Say Hello {name} to the user
 */
Login.prototype.hello = function(sessionId) {
if(this.sessionMap[sessionId]==null)
{
	
	return 'Please Login.!';
}
else
{
	return 'Hello, Sir ' + this.sessionMap[sessionId].name + ' --- ' + this.sessionMap[sessionId].email;
}
};
/**
 * Get Current Session id user name 
 */
Login.prototype.getName = function(sessionId)
{
 return this.sessionMap[sessionId].name;
};

/**
 * Get Current Session id user email 
 */
Login.prototype.getEmail = function(sessionId)
{
 return this.sessionMap[sessionId].email;
};


/**
 * Check whether the given session id is valid (is in sessionMap) or not.
 */
Login.prototype.isLoggedIn = function(sessionId) {
	return sessionId in this.sessionMap;
};

/**
 * Create a new session id for the given user.
 */
Login.prototype.login = function(_name, _email) {
   /*
	* Generate unique session id and set it into sessionMap like foo@bar.com
	*/
	var sessionId = new Date().getTime();
	this.sessionMap[sessionId] = { name: _name, email: _email } 
	console.log("inside login functionwh ich take email \n")
	console.log('\n new session id ' + sessionId + ' for login::' + _email);
	return sessionId;
};

/**
 * Remove specific refreshed session
 **/
Login.prototype.RefreshSession = function(_sessionId)
{
	//this.sessionMap[_sessionId]=null;
console.log(_sessionId);
delete this.sessionMap[_sessionId];
//	this.cookies['+_sessionId+']=null;
	return "done";
};

/**
 * Logout from the server
 */ 
Login.prototype.logout = function(sessionId) {
	console.log('logout::' + sessionId);
console.log(sessionId);
delete this.sessionMap[sessionId];

   /*
	* TODO: Remove the given sessionId from the sessionMap
	*/
};

// Export the Login class
module.exports = new Login();
