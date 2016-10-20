# ltngbase

The goal of this project is make lightning component development easier.  I hope all of these are eventually replaced by standard components/events and I can retire all this :)

<a href="https://githubsfdeploy.herokuapp.com?owner=mshanemc&repo=ltngbase">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

## Streamer	
component that you set a topic for.  It connects to the streaming api and subscribes to that topic.  

## SingleFieldDisplayer
Pass in any record, and the corresponding describe for that object (use the describe method in Ora).

This component will handle all the field types and properly display itself.  If the field is editable, it'll have two options--either emit a **fieldChangeEvent** that can be handled upstream, OR directly update the record in Salesforce.

Errors are handled by the LightningErrorHandler component--install that in your outermost component that's using SingleFieldDisplayer

## SingleFieldDisplayerReadOnly
Faster, simpler, more performant version of SFD for when there isn't any update that'll happen.

## LightningErrorHandler

displays errors from apex callbacks.  Simply pass in the errors object from `.getErrors` to a handleCallbackError event and it'll handle the rest.  You can optionally name the ErrorHandler and put that name in the handleCallbackError event 

Install like this:
``` html
<aura:registerEvent name="handleCallbackError" type="c:handleCallbackError"/>
<c:LightningErrorHandler />
```
example of callback (where `a` is the callback response)


``` javascript
if (state === "SUCCESS") {
    //do your happy path logic
}  else if (state === "ERROR") {                    
    var appEvent = $A.get("e.c:handleCallbackError");
    appEvent.setParams({
        "errors" : a.getError()
    });
    appEvent.fire();   
```

If you have multiple of these on the page, you can also scope errors to a specific instance of LightningErrorHanlder like this:

``` html
<aura:registerEvent name="handleCallbackError" type="c:handleCallbackError"/>
<c:LightningErrorHandler errorHandlerName="specificName"/>

```
Then pass that LEH's name when you fire the error event:

``` javascript
if (state === "SUCCESS") {
    //do your happy path logic
}  else if (state === "ERROR") {                    
    var appEvent = $A.get("e.c:handleCallbackError");
    appEvent.setParams({
        "errors" : a.getError(),
        "errorComponentName" : "specificName"
    });
    appEvent.fire();   
```
## LightningDataTable

pass in an array of records (presumably from a parent component) and which fields you want shown/editable.  It'll get the necessary describe info to properly label the columns and then implements SFD/SFDRO for the cells as appropriate. 