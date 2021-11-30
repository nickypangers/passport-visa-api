package constants

const (
	manualUpdate = false      // enable/disable /api/updateVisaData endpoint
	tokenOnly    = true       // enable/disable token holders access to update visa data only
	authToken    = "password" // authentication token
	appVersion   = "2.0.1"
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

func GetAppVersion() string {
	return appVersion
}
