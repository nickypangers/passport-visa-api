package memory

import (
	"encoding/csv"
	"errors"
	"os"
)

const fileDir = "/Users/nixon.p/Documents/Personal/passport-visa-api/data/country-code.csv"

var (
	countryList []string
)

func InitCountryData() error {
	if len(countryList) > 0 {
		return errors.New("country list already initilized")
	}

	err := loadCountryData(fileDir)
	if err != nil {
		return errors.New("unable to load data")
	}

	return nil

}

func loadCountryData(file string) error {

	f, err := os.Open(file)
	if err != nil {
		return errors.New("unable to open file")
	}

	defer f.Close()

	lines, err := csv.NewReader(f).ReadAll()
	if err != nil {
		return errors.New("unable to read file")
	}

	// var list []string
	countryList = make([]string, 0)

	for _, v := range lines {
		countryList = append(countryList, v[1])
	}

	return nil
}

func GetCountryList() []string {
	return countryList
}
