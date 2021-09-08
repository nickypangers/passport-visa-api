package memory

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type Destination struct {
	Code     string `json:"code"`
	Category string `json:"category"`
	Duration string `json:"dur"`
	Status   string `json:"text"`
}

type CountryInfo struct {
	Destinations []Destination `json:"destination"`
}

type VisaData map[string]CountryInfo

const apiUrl = "https://www.passportindex.org/incl/compare2.php"

var (
	visaData            VisaData
	timeVisaDataUpdated time.Time
)

func InitVisaData() error {

	log.Println("initializing visa data")

	if len(visaData) > 0 {
		return errors.New("visa data already initialized")
	}

	err := UpdateVisaData()
	if err != nil {
		return err
	}

	log.Println("initializing visa data done")

	return nil
}

func UpdateVisaData() error {

	log.Println("updating visa data")

	client := &http.Client{}

	// data := []byte(`{"compare":"1"}`)
	data := url.Values{}
	data.Add("compare", "1")

	req, err := http.NewRequest("POST", apiUrl, strings.NewReader(data.Encode()))
	if err != nil {
		return err
	}

	req.Header.Set("X-Requested-With", "XMLHttpRequest")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	tempVisaData := VisaData{}

	err = json.Unmarshal(respBody, &tempVisaData)
	if err != nil {
		return err
	}

	err = addVisaCategory(&tempVisaData)
	if err != nil {
		return err
	}

	visaData = tempVisaData

	timeVisaDataUpdated = time.Now().UTC()

	log.Println("updating visa data done")

	return nil
}

func addVisaCategory(vd *VisaData) error {

	if len(*vd) == 0 {
		return errors.New("visa data is empty")
	}

	for _, v := range countryList {
		for j, d := range (*vd)[v].Destinations {
			(*vd)[v].Destinations[j].Category = sortVisaCategory(d)
		}
	}

	return nil
}

func sortVisaCategory(d Destination) string {

	if d.Status == "visa required" {
		return "VR"
	}
	// if d.Status == "pre-visa on arrival" {
	// 	return "VR"
	// }
	if strings.Contains(d.Status, "eVisa") {
		if d.Duration == "" {
			return "VR"
		} else {
			return "VOA"
		}
	}

	if d.Status == "pre-enrollment" {
		return "VOA"
	}
	if d.Status == "eTA" {
		return "VOA"
	}
	if d.Status == "pre-visa on arrival" {
		return "VOA"
	}
	if strings.Contains(d.Status, "visa on arrival") {
		return "VOA"
	}
	if d.Status == "eTourist card" {
		return "VOA"
	}
	if d.Status == "tourist registration" {
		return "VOA"
	}

	if d.Status == "COVID-19 ban" {
		return "CB"
	}

	return "VF"

}

func GetVisaData() VisaData {
	return visaData
}

func GetTimeVisaDataUpdated() string {
	return timeVisaDataUpdated.Format(http.TimeFormat)
}
