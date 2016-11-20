var Chat = function(title, messages) {
    this.title = title;
    this.messages = ko.observableArray(messages);
 
    this.addMessage = function() {
        this.messages.push("New message");
    }.bind(this);
}

function ChatViewModel() {
    var self = this;
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
    self.chosenChatId = ko.observable();
    self.goToChat = function(chat) {
    	console.log("goto " + chat);
    	self.chosenChatId(chat);
    };
};

var chatViewModel = new ChatViewModel();
ko.applyBindings(chatViewModel, $("#chatlist")[0]);
ko.applyBindings(chatViewModel, $("#chats")[0]);
