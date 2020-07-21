package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
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

type List struct {
	VF  []string `json:"VF"`
	VOA []string `json:"VOA"`
	VR  []string `json:"VR"`
}

var visaResult Visa
var countryResult Country

func readVisa() [][]string {

	resp, err := http.Get("https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso2.csv")

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	if err != nil {
		panic(err)
	}

	r := csv.NewReader(resp.Body)

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
			} else if rows[i][2] != "-1" {
				vf = vf + 1
			}
		}
	}

	return Country{Passport: passport, VF: strconv.Itoa(vf), VOA: strconv.Itoa(voa), VR: strconv.Itoa(vr)}

}

func getList(rows [][]string, passport string) List {

	var vf, voa, vr []string

	for i := range rows {
		p := rows[i][0]

		if p == passport {
			if rows[i][2] == "VR" {
				vr = append(vr, rows[i][1])
			} else if rows[i][2] == "VOA" || rows[i][2] == "ETA" {
				voa = append(voa, rows[i][1])
			} else if rows[i][2] != "-1" {
				vf = append(vf, rows[i][1])
			}
		}
	}

	fmt.Println("VR: ", len(vr))
	fmt.Println("VOA: ", len(voa))
	fmt.Println("VF: ", len(vf))

	return List{VF: vf, VOA: voa, VR: vr}

}

func checkVisa(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	passport := params["p"]
	destination := params["d"]

	result := getVisa(readVisa(), passport, destination)

	visaResult = Visa{Passport: passport, Destination: destination, Code: result}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(visaResult)

}

func checkCountry(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	passport := params["p"]

	result := getCountry(readVisa(), passport)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)

}

func checkList(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	passport := params["p"]

	result := getList(readVisa(), passport)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)

}

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/api/{p}/{d}", checkVisa)
	r.HandleFunc("/api/{p}", checkCountry)
	r.HandleFunc("/list/api/{p}", checkList)
	http.Handle("/", r)
	log.Println(http.ListenAndServe(":"+os.Getenv("PORT"), nil))

}
