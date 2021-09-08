package server

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func NewAPIServer() {
	log.Println("starting api server")

	r := mux.NewRouter()
	r.HandleFunc("/api/{p}/{d}", getVisaBetweenCountryHandler)

	http.Handle("/", r)
	// log.Println(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
	log.Println(http.ListenAndServe(":8080", nil))

}
