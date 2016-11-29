module application.application;

import vibe.http.server;
import vibe.core.log;

import mondo;
import boiler.model;

import application.user;
import application.sockets;

class Application {
	Mongo mongo;
	User_model user_model;
	Sockets sockets;

	bool initialize() {
		try {
			mongo = new Mongo("mongodb://localhost");
			user_model = new User_model;
			sockets = new Sockets;
		}
		catch(Exception e) {
			logInfo(e.msg);
			return false;
		}
	    return true;
	}

	void setup_models(ref Model_method[string][string] models) {
		user_model.setup(mongo, models);
	}

	string rewrite_path(HTTPServerRequest req) {
		if(!req.session) {
			return "/login";
		}
		return req.path;
	}

	void websocket(HTTPServerRequest req, HTTPServerResponse res) {
		sockets.new_socket(req, res);
	}
}
