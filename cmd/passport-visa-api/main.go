package main

import (
	"fmt"

	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

func main() {

	err := memory.InitCountryData()
	if err != nil {
		fmt.Println(err)
	}

	// fmt.Println(memory.ReadData())

	memory.InitVisaData()

	visaData := memory.ReadVisaData()

	hkData := visaData["HK"].Destinations

	for _, v := range hkData {
		if v.Code == "VN" {
			fmt.Println(v)
		}
	}

}
