package visa

import (
	"errors"

	storage "github.com/nickypangers/passport-visa-api/pkg/storage/json"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

// func getCountryVisaInfo(rows [][]string, passport string) storage.VisaCountryInfo {
// 	var vf, voa, vr, cb, na []string

// 	vf = make([]string, 0)
// 	voa = make([]string, 0)
// 	vr = make([]string, 0)
// 	cb = make([]string, 0)
// 	na = make([]string, 0)

// 	for i := range rows {
// 		p := rows[i][0]

// 		if p == passport {
// 			if rows[i][2] == "visa required" {
// 				vr = append(vr, rows[i][1])
// 			} else if rows[i][2] == "visa on arrival" || rows[i][2] == "e-visa" {
// 				voa = append(voa, rows[i][1])
// 			} else if rows[i][2] == "covid ban" {
// 				cb = append(cb, rows[i][1])
// 			} else if rows[i][2] == "no admission" {
// 				na = append(na, rows[i][1])
// 			} else if rows[i][2] != "-1" {
// 				vf = append(vf, rows[i][1])
// 			}
// 		}
// 	}

// 	return storage.VisaCountryInfo{VF: vf, VOA: voa, VR: vr, CB: cb, NA: na}
// }

func GetVisaBetweenCountry(passport, destination string) (storage.Visa, error) {

	if passport == destination {
		return storage.Visa{
			Passport:    passport,
			Destination: destination,
			Status:      "-1",
			LastUpdated: memory.GetTimeVisaDataUpdated(),
		}, nil
	}

	visaData := memory.GetVisaData()

	countryData := visaData[passport]

	for _, v := range countryData.Destinations {
		if v.Code == destination {

			return storage.Visa{
				Passport:    passport,
				Destination: destination,
				Duration:    v.Duration,
				Status:      v.Status,
				LastUpdated: memory.GetTimeVisaDataUpdated(),
			}, nil
		}
	}

	return storage.Visa{}, errors.New("unable to find result: passport: " + passport + "destination: " + destination)
}
