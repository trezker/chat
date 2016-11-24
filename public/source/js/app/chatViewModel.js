var Chat = function(title, messages) {
    this.title = title;
    this.messages = ko.observableArray(messages);
 
    this.addMessage = function(message) {
        this.messages.push({
        	content: message
        });
    }.bind(this);
}

function ChatViewModel() {
    var self = this;

    var wsurl = "ws://" + document.location.host + "/ws";
    console.log(wsurl);
	var connection = new WebSocket(wsurl);    
	connection.onerror = function (error) {
		console.log('WebSocket Error ' + error);
	};
	connection.onmessage = function (e) {
		console.log('Server: ' + e.data);
	};

    self.currentmessage = ko.observable("");
    self.chosenChat = ko.observable();
	self.chats = [
		new Chat("random1", [
			{
				sender: "me",
				content: "Hello",
				timestamp: "2016-11-19 19:54:00"
			},
			{
				sender: "random1",
				content: "Hi",
				timestamp: "2016-11-19 19:55:00"
			}
		]),
		new Chat("match1", [
			{
				sender: "me",
				content: "Woop",
				timestamp: "2016-11-19 19:54:00"
			},
			{
				sender: "random1",
				content: "Moop",
				timestamp: "2016-11-19 19:55:00"
			}
		])
	];
    self.goToChat = function(chat) {
    	self.chosenChat(chat);
		var c = $("#chats .history:not(.hidden)");
		c.scrollTop(c[0].scrollHeight);
    };
	self.onEnter = function(d, e){
		if(e.keyCode === 13) {
			if(self.currentmessage() != "") {
				connection.send(self.currentmessage());

				//Only scroll to bottom if the user isn't bus reading some history
				var c = $("#chats .history:not(.hidden)");
				var scrollToBottom = false;
				if(c.scrollTop()+c.height() == c[0].scrollHeight) {
					scrollToBottom = true;
				}
				//Add message
				self.chosenChat().addMessage(self.currentmessage());
				self.currentmessage("");
				if(scrollToBottom) {
					c.scrollTop(c[0].scrollHeight);
				}

			}
		}
		return true;
	};
	self.goToChat(self.chats[0]);
};

var chatViewModel = new ChatViewModel();
ko.applyBindings(chatViewModel, $("#chatlist")[0]);
ko.applyBindings(chatViewModel, $("#chats")[0]);

function resizeChatHistory() {
	var h = $("#chats .history").position().top + $("#chats .history").offset().top + $("#chats .history").outerHeight() - 100;
	$("#chats .history").css("max-height", h+"px");
}

$( window ).resize(function() {
	resizeChatHistory();
});

resizeChatHistory();
