package main

import (
	"encoding/csv"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

type Visa struct {
	Passport    string `json:"Passport"`
	Destination string `json:"Destination"`
	Code        string `json:"Code"`
}

type Country struct {
	Passport string `json:"Passport"`
	VF       string `json:"VF"`
	VOA      string `json:"VOA"`
	VR       string `json:"VR"`
}

var visaResult Visa
var countryResult Country

func readVisa(name string) [][]string {
	f, err := os.Open(name)
	if err != nil {
		log.Fatalf("Cannot open '%s;: %s\n", name, err.Error())
	}
	defer f.Close()
	r := csv.NewReader(f)

	rows, err := r.ReadAll()
	if err != nil {
		log.Fatalln("Cannot read csv data:", err.Error())
	}
	return rows
}

func getVisa(rows [][]string, passport, destination string) string {
	var visa string
	for i := range rows {
		p := rows[i][0]
		d := rows[i][1]

		if p == passport && d == destination {
			visa = rows[i][2]
			break
		}
	}
	return visa
}

func getCountry(rows [][]string, passport string) Country {

	vf := 0
	voa := 0
	vr := 0

	for i := range rows {
		p := rows[i][0]

		if p == passport {
			if rows[i][2] == "VR" {
				vr = vr + 1
			} else if rows[i][2] == "VOA" || rows[i][2] == "ETA" {
				voa = voa + 1
			} else {
				vf = vf + 1
			}
		}
	}

	return Country{Passport: passport, VF: strconv.Itoa(vf), VOA: strconv.Itoa(voa), VR: strconv.Itoa(vr)}

}

func checkVisa(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	passport := params["p"]
	destination := params["d"]

	result := getVisa(readVisa("clients.csv"), passport, destination)

	visaResult = Visa{Passport: passport, Destination: destination, Code: result}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(visaResult)

}

func checkCountry(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	passport := params["p"]

	result := getCountry(readVisa("clients.csv"), passport)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)

}

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/api/{p}/{d}", checkVisa)
	r.HandleFunc("/api/{p}", checkCountry)
	http.Handle("/", r)
	log.Println(http.ListenAndServe(":"+os.Getenv("PORT"), nil))

}
