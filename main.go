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

	err = memory.InitVisaData()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}

	// fmt.Println(memory.GetVisaData())

	go func() {
		for {
			time.Sleep(24 * time.Hour)
			err := memory.UpdateVisaData()
			if err != nil {
				log.Println(err)
			}
			continue
		}
	}()

	server.NewAPIServer()
}
