package server

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/nickypangers/passport-visa-api/pkg/constants"
	"github.com/nickypangers/passport-visa-api/pkg/country"
	storageJson "github.com/nickypangers/passport-visa-api/pkg/storage/json"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
	"github.com/nickypangers/passport-visa-api/pkg/visa"
)

func getCountryListHandler(w http.ResponseWriter, r *http.Request) {
	countryList := country.GetCountryList()

	countryListObject := storageJson.CountryList{List: countryList, LastUpdated: memory.GetTimeVisaDataUpdated()}

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(countryListObject)
	if err != nil {
		http.Error(w, err.Error(), http.StatusFailedDependency)
		return
	}
}

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
			Category:    visaResult.Category,
			LastUpdated: memory.GetTimeVisaDataUpdated(),
		}
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusFailedDependency)
		return
	}

}

func getCountryVisaListHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	passport := strings.ToUpper(params["p"])

	result, err := visa.GetCountryVisaList(passport)
	if err != nil {
		result.Error = storageJson.Error{Status: true, Error: err.Error()}
	} else {
		// result = storageJson.Visa{
		// 	Passport:    passport,
		// 	Destination: destination,
		// 	Duration:    visaResult.Duration,
		// 	Status:      visaResult.Status,
		// 	Category:    visaResult.Category,
		// 	LastUpdated: memory.GetTimeVisaDataUpdated(),
		// }
		result.LastUpdated = memory.GetTimeVisaDataUpdated()
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusFailedDependency)
		return
	}
}

func updateVisaDataHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if constants.GetTokenOnly() {
		authToken := r.FormValue("authToken")
		if authToken != constants.GetAuthToken() {
			http.Error(w, "401 Unauthorized", http.StatusUnauthorized)
			return
		}
	}

	result := storageJson.Error{}

	err := memory.UpdateVisaData()
	if err != nil {
		result.Status = false
		result.Error = err.Error()
	} else {
		result.Status = true
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}
