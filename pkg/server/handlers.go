package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	storageJson "github.com/nickypangers/passport-visa-api/pkg/storage/json"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
	"github.com/nickypangers/passport-visa-api/pkg/visa"
)

func getVisaBetweenCountryHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	passport := strings.ToUpper(params["p"])
	destination := strings.ToUpper(params["d"])

	result := storageJson.Visa{}

	visaResult, err := visa.GetVisaBetweenCountry(passport, destination)
	if err != nil {
		result.Error = storageJson.Error{Status: true, Error: err.Error()}
	} else {
		result = storageJson.Visa{
			Passport:    passport,
			Destination: destination,
			Duration:    visaResult.Duration,
			Status:      visaResult.Status,
			LastUpdated: memory.GetTimeVisaDataUpdated(),
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)

}
