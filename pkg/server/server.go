package server

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func NewAPIServer() {
	log.Println("starting api server")

	r := mux.NewRouter()
	r.HandleFunc("/api/{p}/{d}", getVisaBetweenCountryHandler)
	r.HandleFunc("/api/{p}", getCountryVisaListHandler)

	r.HandleFunc("/updateVisaData", updateVisaDataHandler)

	http.Handle("/", r)
	log.Println(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
	// log.Println(http.ListenAndServe(":8080", nil))

}
