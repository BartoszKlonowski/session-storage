browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	let id = '';
	let domain = '';
	console.log(`Received message: ${message}`);
	browser.notifications.create({
		"type": "basic",
		"iconUrl": "",
		"title": "You clicked a link!",
		"message": `${message}`
	  });
	  console.log(`Received message: ${message}`);
	  sendResponse({response: "Resposne from background script"});
});

