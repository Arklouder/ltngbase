({
	doInit : function(component){
	  //	public static String describe(String objtype) {
	  let action = component.get("c.describe");

	  let done = component.get("v.onComplete");

	  action.setStorable({
    	"ignoreExisting": component.get("v.skipCache")
		});

	  action.setParams({"objtype" : component.get("v.object") });
	  action.setCallback(this, function (a){
	  		console.log("objectDescribe for " + component.get("v.object"));
	  		console.log(JSON.parse(a.getReturnValue()));
	  		component.set("v.target", JSON.parse(a.getReturnValue()));
	  		$A.enqueueAction(done);
		});
	  $A.enqueueAction(action);

  }
})