package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

type Visa struct {
	Passport    string `json:"Passport"`
	Destination string `json:"Destination"`
	Code        string `json:"Code"`
}

var visaResult Visa

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
	visa := ""
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

func checkVisa(w http.ResponseWriter, r *http.Request) {

	// t, err := template.ParseFiles("api.html")
	// if err != nil {
	// 	fmt.Println(err)
	// }

	params := mux.Vars(r)
	passport := params["p"]
	destination := params["d"]

	result := getVisa(readVisa("clients.csv"), passport, destination)

	visaResult = Visa{Passport: passport, Destination: destination, Code: result}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(visaResult)

	// fmt.Print(t.Execute(w, p))

}

func main() {
	fmt.Println(getVisa(readVisa("clients.csv"), "HK", "GB"))

	r := mux.NewRouter()
	r.HandleFunc("/api/{p}/{d}", checkVisa)
	http.Handle("/", r)
	log.Println(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
}
