var chat = function(title, messages) {
    this.title = title;
    this.messages = ko.observableArray(messages);
 
    this.addMessage = function() {
        this.messages.push("New message");
    }.bind(this);
}

var chatViewModel = {
	chats: [
		new chat("random1", [
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
		new chat("match1", [
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
	]
};

ko.applyBindings(chatViewModel, $("#chatlist")[0]);
ko.applyBindings(chatViewModel, $("#chats")[0]);
