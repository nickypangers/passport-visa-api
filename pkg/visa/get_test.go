package visa

import (
	"testing"

	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

func TestGetVisabetweenCountry(t *testing.T) {
	err := memory.InitCountryData()
	if err != nil {
		t.Fatalf("%v", err)
	}

	err = memory.InitVisaData()
	if err != nil {
		t.Fatalf("%v", err)
	}

	result, err := GetVisaBetweenCountry("HK", "GB")
	if result == (memory.Destination{}) || err != nil {
		t.Fatalf("GetVisaBetweenCountry() = %v, %v, want match to not empty, nil", result, err)
	}
}
