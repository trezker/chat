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
    	console.log("goto " + chat);
    	self.chosenChat(chat);
    };
	self.onEnter = function(d, e){
		if(e.keyCode === 13) {
			if(self.currentmessage() != "") {
				self.chosenChat().addMessage(self.currentmessage());
				self.currentmessage("");
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
