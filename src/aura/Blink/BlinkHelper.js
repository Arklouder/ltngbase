({
	blink : function(component) {
		var body = component.find("blinkThis");
		$A.util.toggleClass(body, "blinkoff");
	}
})