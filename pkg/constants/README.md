# Constants

This folder is used for storing your authentication token used when requesting an update of the visa data.

## Instructions

Simply rename the _example.go_ file to _constants.go_, and edit and uncomment the content to your preference before compiling and running.

You can toggle whether to allow request for updating data without a token by changing the constant _TokenOnly_ to **FALSE**.

## Constant Definitions

| Constant  | Definition                                                          |
| --------- | ------------------------------------------------------------------- |
| TokenOnly | Allow (TRUE) / PREVENT (FALSE) update request for non-token holders |
| AuthToken | Authentication token                                                |
