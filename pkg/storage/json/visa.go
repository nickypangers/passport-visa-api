package json

type Visa struct {
	Passport    string `json:"passport"`
	Destination string `json:"destination"`
	Duration    string `json:"dur"`
	Status      string `json:"text"`
	LastUpdated string `json:"last_updated"`
	Error       Error  `json:"error"`
}

type Error struct {
	Status bool   `json:"status"`
	Error  string `json:"error"`
}

type VisaCountryInfo struct {
	VF  []string `json:"VF"`
	VOA []string `json:"VOA"`
	VR  []string `json:"VR"`
	CB  []string `json:"CB"`
	NA  []string `json:"NA"`
}
