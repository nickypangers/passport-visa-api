package memory

import (
	"encoding/csv"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
)

// const fileDir = "/data/country-code.csv"
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

// func openCountryDataSource() ([][]string, error) {
// 	resp, err := http.Get(rawFile)
// 	if err != nil {
// 		return [][]string{}, nil
// 	}

// 	defer resp.Body.Close()
// }

func loadCountryData() error {

	log.Println("loading country data")

	// filePath = filelocation.GetParentDir("bin") + filePath

	// log.Println("file path:", filePath)

	// isFileExist := filelocation.IsFileExist(filePath)
	// if !isFileExist {
	// 	return errors.New("file does not exist: " + filePath)
	// }

	// absFilePath, err := filepath.Abs(filePath)
	// if err != nil {
	// 	return errors.New("cannot get absolute file path: " + absFilePath)
	// }

	// f, err := os.Open()
	// if err != nil {
	// 	return errors.New("unable to open file: " + filePath)
	// }

	// defer f.Close()

	// lines, err := csv.NewReader(f).ReadAll()
	// if err != nil {
	// 	return errors.New("unable to read file")
	// }

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
