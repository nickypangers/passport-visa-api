package main

import (
	"log"
	"os"
	"time"

	"github.com/nickypangers/passport-visa-api/pkg/server"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

func main() {

	// pwd, _ := os.Getwd()
	// fmt.Println(pwd)

	err := memory.InitCountryData()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}

	memory.InitVisaData()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}

	go func() {
		for {
			time.Sleep(24 * time.Hour)
			memory.UpdateVisaData()
		}
	}()

	server.NewAPIServer()
}
