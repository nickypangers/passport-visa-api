package constants

const (
	_tokenOnly = true
	_authToken = "testing"
)

func GetTokenOnly_() bool {
	return _tokenOnly
}

func GetAuthToken_() string {
	return _authToken
}
