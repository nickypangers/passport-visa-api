package memory

import (
	"encoding/csv"
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/nickypangers/passport-visa-api/pkg/filelocation"
)

// const fileDir = "/data/country-code.csv"
const fileDir = "/data/country-code.csv"

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
		return err
	}

	log.Println("initializing country data done")

	return nil

}

func loadCountryData(filePath string) error {

	log.Println("loading country data")

	isFileExist := filelocation.IsFileExist(filelocation.GetParentDir() + filePath)
	if !isFileExist {
		return errors.New("file does not exist: " + filelocation.GetParentDir() + filePath)
	}

	absFilePath, err := filepath.Abs(filelocation.GetParentDir() + filePath)
	if err != nil {
		return errors.New("cannot get absolute file path: " + filePath)
	}

	f, err := os.Open(absFilePath)
	if err != nil {
		return errors.New("unable to open file: " + absFilePath)
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
