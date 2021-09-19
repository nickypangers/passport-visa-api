package server

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/nickypangers/passport-visa-api/pkg/constants"
)

func NewAPIServer() {
	log.Println("starting api server")

	r := mux.NewRouter()
	r.HandleFunc("/api/{p}/{d}", getVisaBetweenCountryHandler)
	r.HandleFunc("/api/{p}", getCountryVisaListHandler)
	r.HandleFunc("/countryList", getCountryListHandler)
	r.HandleFunc("/raw", getRawVisaDataHandler)

	if constants.GetManualUpdate() {
		r.HandleFunc("/updateVisaData", updateVisaDataHandler)
	}

	http.Handle("/", r)

	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	log.Println(http.ListenAndServe(":"+port, nil))

}
