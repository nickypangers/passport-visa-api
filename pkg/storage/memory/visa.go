package memory

import (
	"encoding/json"
	"errors"
	"io/ioutil"
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
	if len(visaData) > 0 {
		return errors.New("visa data already initialized")
	}

	err := updateVisaData()
	if err != nil {
		return err
	}

	return nil
}

func updateVisaData() error {
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

	err = json.Unmarshal(respBody, &visaData)
	if err != nil {
		return err
	}

	timeVisaDataUpdated = time.Now().UTC()

	return nil
}

func GetVisaData() VisaData {
	return visaData
}

func GetTimeVisaDataUpdated() string {
	return timeVisaDataUpdated.Format(http.TimeFormat)
}
