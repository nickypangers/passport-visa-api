package main

import (
	"fmt"

	"github.com/nickypangers/passport-visa-api/pkg/rawdata"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

func main() {

	countryList := memory.CountryList{}

	err := countryList.InitData()
	if err != nil {
		fmt.Println(countryList)
	}

	rawdata.Update()

}
