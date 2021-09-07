package memory

import (
	"encoding/csv"
	"errors"
	"os"
)

type CountryList struct {
	data []string
}

func (cl *CountryList) InitData() error {
	if cl.data != nil {
		return errors.New("country list already initilized")
	}

	err := loadData(cl)
	if err != nil {
		return errors.New("unable to load data")
	}

	return nil

}

func loadData(cl *CountryList) error {

	f, err := os.Open("data/country-code.csv")
	if err != nil {
		return errors.New("unable to open file")
	}

	defer f.Close()

	lines, err := csv.NewReader(f).ReadAll()
	if err != nil {
		return errors.New("unable to read file")
	}

	// var list []string

	for _, v := range lines {
		cl.data = append(cl.data, v[1])
	}

	return nil
}
