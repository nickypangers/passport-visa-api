package memory

import (
	"encoding/csv"
	"errors"
	"log"
	"os"
	"strings"
)

const fileDir = "../../data/country-code.csv"

// const fileDir = "../../../data/country-code.csv"

var (
	countryList []string
)

func InitCountryData() error {
	log.Println("initializing country data")

	if len(countryList) > 0 {
		return errors.New("country list already initilized")
	}

	err := loadCountryData(fileDir)
	if err != nil {
		return errors.New("unable to load data")
	}

	log.Println("initializing country data done")

	return nil

}

func loadCountryData(file string) error {

	log.Println("loading country data")

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
		countryList = append(countryList, strings.ToUpper(v[1]))
	}

	log.Println("loading country data done")

	return nil
}

func GetCountryList() []string {
	return countryList
}
