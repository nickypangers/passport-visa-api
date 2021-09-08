package main

import (
	"fmt"

	"github.com/nickypangers/passport-visa-api/pkg/server"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

func main() {

	// pwd, _ := os.Getwd()
	// fmt.Println(pwd)

	err := memory.InitCountryData()
	if err != nil {
		fmt.Println(err)
	}

	memory.InitVisaData()

	server.NewAPIServer()

	// result, err := visa.GetVisaBetweenCountry("HK", "HK")
	// if err != nil {
	// 	fmt.Println(err)
	// }

	// jsonData, _ := json.Marshal(result)

	// fmt.Println(string(jsonData))

}
