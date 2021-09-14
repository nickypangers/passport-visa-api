package country

import (
	"testing"

	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

func TestGetCountryList(t *testing.T) {
	err := memory.InitCountryData()
	if err != nil {
		t.Fatalf("%v", err.Error())
	}
	countryList := GetCountryList()
	t.Log(countryList)
}
