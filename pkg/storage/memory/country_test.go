package memory

import "testing"

func TestCountryListBeforeInit(t *testing.T) {
	length := len(countryList)
	if length != 0 {
		t.Fatalf("country list before init = %q, want match for 0", length)
	}
}

func TestLoadData(t *testing.T) {
	err := loadCountryData(fileDir)
	length := len(countryList)
	if length != 199 || err != nil {
		t.Fatalf("loadData() = %q, %v, want match for 199, nil", length, err)
	}
}
