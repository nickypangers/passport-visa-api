package memory

import (
	"encoding/csv"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
)

const rawFile = "https://gist.githubusercontent.com/nickypangers/bedd1dafe84a97d163e157575843346e/raw/b2ff15d9df8ed76b3285660b54bfe6a0ae055bce/country-code.csv"

var (
	countryList []string
)

func InitCountryData() error {
	log.Println("initializing country data")

	if len(countryList) > 0 {
		return errors.New("country list already initilized")
	}

	err := loadCountryData()
	if err != nil {
		return err
	}

	log.Println("initializing country data done")

	return nil

}

func loadCountryData() error {

	log.Println("loading country data")

	resp, err := http.Get(rawFile)
	if err != nil {
		return nil
	}

	defer resp.Body.Close()

	r := csv.NewReader(resp.Body)

	lines, err := r.ReadAll()
	if err != nil {
		return errors.New("unable to read file")
	}

	// var list []string
	countryList = make([]string, 0)

	for _, v := range lines {
		countryList = append(countryList, strings.ToUpper(v[1]))
	}

	if len(GetCountryList()) != 199 {
		errorStr := fmt.Sprintf("loading country data failed: length: %v", len(GetCountryList()))

		return errors.New(errorStr)
	}

	log.Println("loading country data done")

	return nil
}

func GetCountryList() []string {
	return countryList
}
