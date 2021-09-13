# Constants

This folder is used for storing your authentication token used when requesting an update of the visa data.

## Instructions

Create a _constants.go_ file with the following content:

<pre>
package constants

const (
	tokenOnly = true
	authToken = "testing"
)

func GetTokenOnly() bool {
	return tokenOnly
}

func GetAuthToken() string {
	return authToken
}
</pre>

## Constant Definitions

| Constant  | Definition                                                          |
| --------- | ------------------------------------------------------------------- |
| TokenOnly | Allow (TRUE) / PREVENT (FALSE) update request for non-token holders |
| AuthToken | Authentication token                                                |
