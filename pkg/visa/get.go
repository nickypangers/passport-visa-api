package visa

import (
	"errors"

	"github.com/nickypangers/passport-visa-api/pkg/storage/json"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

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

func GetCountryVisaList(passport string) (json.Country, error) {

	visaData := memory.GetVisaData()
	if len(visaData) == 0 {
		return json.Country{}, errors.New("visa data is empty")
	}

	countryData := visaData[passport]
	if len(countryData.Destinations) == 0 {
		return json.Country{}, errors.New("country data is empty")
	}

	country := json.Country{Passport: passport}

	for _, v := range countryData.Destinations {
		switch v.Category {
		case "VR":
			country.VR = append(country.VR, v.Code)
		case "VOA":
			country.VOA = append(country.VOA, v.Code)
		case "VF":
			country.VF = append(country.VF, v.Code)
		case "CB":
			country.CB = append(country.CB, v.Code)
		case "NA":
			country.NA = append(country.NA, v.Code)
		default:
		}
	}

	return country, nil
}
