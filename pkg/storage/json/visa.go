package json

type Visa struct {
	Passport    string `json:"Passport"`
	Destination string `json:"Destination"`
	Code        string `json:"code"`
}

type VisaCountryInfo struct {
	VF  []string `json:"VF"`
	VOA []string `json:"VOA"`
	VR  []string `json:"VR"`
	CB  []string `json:"CB"`
	NA  []string `json:"NA"`
}
