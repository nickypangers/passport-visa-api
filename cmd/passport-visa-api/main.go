package main

import (
	"fmt"
	"log"
	"time"

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

	log.Println(memory.GetCountryList())

	go func() {
		for {
			time.Sleep(24 * time.Hour)
			memory.UpdateVisaData()
		}
	}()

	server.NewAPIServer()
}
