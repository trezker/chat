module application.sockets;

import vibe.http.server;
import vibe.core.log;
import vibe.http.websockets : WebSocket;
import std.conv : to;
import std.algorithm : remove;
import vibe.http.websockets : handleWebSocket;

class Chat {
	string description;
	int max_users;
	string[] participants;
	string[] banned_users;

}

class Socket_context {
	Sockets sockets;
	string user_id;

	this(Sockets s, string u) {
		sockets = s;
		user_id = u;
	}

	void socket_thread(scope WebSocket socket) {
		while (socket.waitForData()) {
			auto txt = socket.receiveText;
			logInfo("Received: %s", txt);
			socket.send("counter.to!string");
		}
		sockets.remove_socket(this);
	}
}

class Sockets {
	Socket_context[][string] user_sockets;
	Chat[] chats;

	void new_socket(HTTPServerRequest req, HTTPServerResponse res) {
		auto id = req.session.get!string("id");
		Socket_context sc = new Socket_context(this, id);
		logInfo("Got new web socket connection userid: %s", id);
		user_sockets[id] ~= sc;
		logInfo("%s", to!string(user_sockets[id].length));
		handleWebSocket(&sc.socket_thread, req, res);
	}

	void remove_socket(Socket_context sc) {
		auto id = sc.user_id;
		logInfo("Socket disconnected userid: %s", id);
		user_sockets[id] = remove!(a => a is sc)(user_sockets[id]);
		logInfo("%s", to!string(user_sockets[id].length));
	}
}