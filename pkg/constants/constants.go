package constants

const (
	manualUpdate = false      // enable/disable /api/updateVisaData endpoint
	tokenOnly    = true       // enable/disable token holders access to update visa data only
	authToken    = "password" // authentication token
)

func GetManualUpdate() bool {
	return manualUpdate
}

func GetTokenOnly() bool {
	return tokenOnly
}

func GetAuthToken() string {
	return authToken
}
