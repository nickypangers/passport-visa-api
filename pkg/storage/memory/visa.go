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

	err := updateVisaData()
	if err != nil {
		return err
	}

	log.Println("initializing visa data done")

	return nil
}

func UpdateDataset() {

}

func updateVisaData() error {

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

	visaData = tempVisaData

	timeVisaDataUpdated = time.Now().UTC()

	log.Println("updating visa data done")

	return nil
}

func GetVisaData() VisaData {
	return visaData
}

func GetTimeVisaDataUpdated() string {
	return timeVisaDataUpdated.Format(http.TimeFormat)
}
