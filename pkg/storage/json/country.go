package json

type CountryInfo struct {
	Passport    string       `json:"Passport"`
	VF          CategoryData `json:"VF"`
	VOA         CategoryData `json:"VOA"`
	VR          CategoryData `json:"VR"`
	CB          CategoryData `json:"CB"`
	NA          CategoryData `json:"NA"`
	LastUpdated string       `json:"last_updated"`
	Error       Error        `json:"error"`
}

// type Country struct {
// 	Passport    string   `json:"Passport"`
// 	VF          []string `json:"VF"`
// 	VOA         []string `json:"VOA"`
// 	VR          []string `json:"VR"`
// 	CB          []string `json:"CB"`
// 	NA          []string `json:"NA"`
// 	LastUpdated string   `json:"last_updated"`
// 	Error       Error    `json:"error"`
// }

type CategoryData struct {
	Data   []string `json:"data"`
	Length int      `json:"length"`
}

// type CountryList struct {
// 	Countries []string `json:"countries"`
// }

type Country struct {
	Name string `json:"name"`
	Code string `json:"code"`
}

type CountryList struct {
	List        []Country `json:"list"`
	LastUpdated string    `json:"last_updated"`
	Error       Error     `json:"error"`
}
