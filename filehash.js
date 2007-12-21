var file = _chooseFile('file', '', null);
if (!file) return;


var fileStream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
fileStream.init(file, 0x01, 0644, 0);
try {
	var hash = Components.classes["@mozilla.org/security/hash;1"].
				createInstance(Components.interfaces.nsICryptoHash);
	hash.init(Components.interfaces.nsICryptoHash.SHA1);
	hash.updateFromStream(fileStream, -1);
	var digest = hash.finish(false).split('').map(function(aInput) {
		var hex = aInput.charCodeAt(0).toString(16);
		if (hex.length == 1) hex = '0' + hex;
		return hex;
	});
}
catch (e) {
alert(e);
}
fileStream.close();

alert(digest.join(''));
