var connect = require('connect');
var login = require('./login');

var app = connect();

app.use(connect.json()); // Parse JSON request body into `request.body`
app.use(connect.urlencoded()); // Parse form in request body into `request.body`
app.use(connect.cookieParser()); // Parse cookies in the request headers into `request.cookies`
app.use(connect.query()); // Parse query string into `request.query`

app.use('/', main);

function main(request, response, next) {
	switch (request.method) {
		case 'GET': get(request, response); break;
		case 'POST': post(request, response); break;
		case 'DELETE': del(request, response); break;
		case 'PUT': put(request, response); break;
	}
};

function get(request, response) {
	var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) {
		var sid = cookies['session_id'];
		if ( login.isLoggedIn(sid) ) {
			response.setHeader('Set-Cookie', 'session_id=' + sid);
			response.end(login.hello(sid));	
		} else {
			response.end("Invalid session_id! Please login again\n");
		}
	} else {
		response.end("Please login via HTTP POST\n");
	}
};

function post(request, response) {
	var name=request.body.name;
	var email=request.body.email;
	var newSessionId=login.login(name,email);
	response.end("\nLogged In....\n welcome="+name+" with email id ="+email+"\n\n New session_id="+response.end(login.hello(newSessionId)));
};

function del(request, response) {
	console.log("DELETE:: Logout from the server");
	// Taking cookies from response	
	var cookies=request.cookies;
	// Get session id from cookies
	var sessionId=cookies.session_id;
	// Performed logout process	
	login.logout(sessionId);
  	response.end('Logged out from the server\n');
};

function put(request, response) {
	console.log("PUT:: Re-generate new seesion_id for the same user");
	var cookies=request.cookies;
	var sessionId=cookies.session_id;
	// Taking data from sessionId from sessionMap	
	var OldName=login.getName(sessionId);
	var OldEmail=login.getEmail(sessionId);
	console.log("PUT:: Re-generate new session_id for the same user");
	// Generate New Session ID and store New Session ID	
	var newSessionId = login.login(OldName, OldEmail);
	response.setHeader('Set-Cookie', 'session_id=' + newSessionId);
	// Remove Old Session ID from sessionMap
        var temp=login.RefreshSession(sessionId);
	response.end("Re-freshed session id\n");
};

app.listen(8000);

console.log("Node.JS server running at 8000...");
