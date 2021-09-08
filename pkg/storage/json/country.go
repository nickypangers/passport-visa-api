package json

type Country struct {
	Passport    string   `json:"Passport"`
	VF          []string `json:"VF"`
	VOA         []string `json:"VOA"`
	VR          []string `json:"VR"`
	CB          []string `json:"CB"`
	NA          []string `json:"NA"`
	LastUpdated string   `json:"last_updated"`
	Error       Error    `json:"error"`
}

// type CountryList struct {
// 	Countries []string `json:"countries"`
// }