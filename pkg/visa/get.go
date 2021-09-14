package visa

import (
	"errors"

	"github.com/nickypangers/passport-visa-api/pkg/storage/json"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

// func getCategoryList() []string {
// 	return []string{"VR", "VOA", "VF", "CB", "NA"}
// }

func GetVisaBetweenCountry(passport, destination string) (memory.Destination, error) {

	if passport == destination {
		return memory.Destination{
			Code:   destination,
			Status: "-1",
		}, nil
	}

	visaData := memory.GetVisaData()
	countryData := visaData[passport]
	for _, v := range countryData.Destinations {
		if v.Code == destination {
			return v, nil
		}
	}

	return memory.Destination{}, errors.New("unable to find result for passport: " + passport + " destination: " + destination)
}

func GetCountryVisaList(passport string) (json.CountryInfo, error) {

	visaData := memory.GetVisaData()
	if len(visaData) == 0 {
		return json.CountryInfo{}, errors.New("visa data is empty")
	}

	countryData := visaData[passport]
	if len(countryData.Destinations) == 0 {
		return json.CountryInfo{}, errors.New("country data is empty")
	}

	country := json.CountryInfo{Passport: passport}

	for _, v := range countryData.Destinations {
		switch v.Category {
		case "VR":
			country.VR.Data = append(country.VR.Data, v.Code)
		case "VOA":
			country.VOA.Data = append(country.VOA.Data, v.Code)
		case "VF":
			country.VF.Data = append(country.VF.Data, v.Code)
		case "CB":
			country.CB.Data = append(country.CB.Data, v.Code)
		case "NA":
			country.NA.Data = append(country.NA.Data, v.Code)
		default:
		}
	}

	country.VR.Length = len(country.VR.Data)
	country.VOA.Length = len(country.VOA.Data)
	country.VF.Length = len(country.VF.Data)
	country.CB.Length = len(country.CB.Data)
	country.NA.Length = len(country.NA.Data)

	return country, nil
}
