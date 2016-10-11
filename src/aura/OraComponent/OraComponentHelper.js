({
	getDescribe:  function (component, objectName, whereToPut){
        var action = component.get("c.describe");
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
        var action = component.get("c.whatsMyPlural");
        //public static String whatsMyPlural(string objtype){
        action.setParams({"objtype" : component.get("v.objectName")});
        action.setCallback(self, function (a){
            //console.log("plural returned!")
            //console.log(a)
            //console.log(a.getReturnValue);           
            component.set("v.pluralLabel", a.getReturnValue());            
        });
        $A.enqueueAction(action);
    },
    
    CSL2Array: function (CSL){        
        try{
            var outputArray = CSL.split(",");
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