({
	execute: function(component, action, callback){
		return new Promise(function(resolve, reject) {
			action.setCallback(this, function(response) {
				if (response.getState() === "SUCCESS") {
					let retVal=JSON.parse(response.getReturnValue());
					console.log(retVal);
					resolve(retVal);
				}
				else if (response.getState() === "ERROR") {
					let appEvent = $A.get("e.c:handleCallbackError");
					appEvent.setParams({
						"errors" : response.getError()
					});
					appEvent.fire();
					reject(Error(("An error occurred.")));
				}
			});
			$A.enqueueAction(action);
		});
	},

	getDescribe:  function (component, objectName, whereToPut){
		let action = component.get("c.describe");
		action.setParams({"objtype": objectName});
		action.setCallback(this, function (a){
			if (component.isValid()){
				//console.log("describe for: " + objectName);
				//console.log(JSON.parse(a.getReturnValue()));
				component.set("v."+whereToPut, JSON.parse(a.getReturnValue()));
			} else {
				console.log("component wasn't valid, so describe callback for "+objectName+" skipped.");
			}

		});

		action.setStorable();
		$A.enqueueAction(action);
	},

	getPlural: function(component){
		let action = component.get("c.whatsMyPlural");
		//public static String whatsMyPlural(string objtype){
		action.setParams({"objtype" : component.get("v.objectName")});
		action.setCallback(undefined, function (a){
			//console.log("plural returned!")
			//console.log(a)
			//console.log(a.getReturnValue);
			component.set("v.pluralLabel", a.getReturnValue());
		});
		$A.enqueueAction(action);
	},

	CSL2Array: function (CSL){
		try{
			let outputArray = CSL.split(",");
			_.forEach(outputArray, function (value, key){
				outputArray[key] = _.trim(value);
			});
			return outputArray;
		} catch(err){
			//intended to handle the "CSL is null scenario"
			return null;
		}
	}
})