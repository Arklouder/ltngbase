# ltngbase

The goal of this project is make lightning component development easier.  I hope all of these are eventually replaced by standard components/events and I can retire all this :)


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

## LightningDataTable

pass in an array of records (presumably from a parent component) and which fields you want shown/editable.  It'll get the necessary describe info to properly label the columns and then implements SFD/SFDRO for the cells as appropriate. 