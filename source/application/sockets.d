module application.sockets;

import vibe.http.server;
import vibe.core.log;
import vibe.http.websockets : WebSocket;
import std.conv : to;
import std.algorithm : remove;

class Sockets {
	WebSocket[][string] user_sockets;

	void new_socket(scope WebSocket socket) {
		/* Casting off const only to get the userid. Don't fuck with the const object! */
		HTTPServerRequest req = cast(HTTPServerRequest)(socket.request);
		auto id = req.session.get!string("id");
		/**/
		logInfo("Got new web socket connection userid: %s", id);
		user_sockets[id] ~= socket;

		while (socket.waitForData()) {
			auto txt = socket.receiveText;
			logInfo("Received: %s", txt);
			socket.send("counter.to!string");
		}
		logInfo("Client disconnected.");
		user_sockets[id] = remove!(a => a is socket)(user_sockets[id]);
	}
}