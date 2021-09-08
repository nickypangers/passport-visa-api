package memory

import "testing"

func TestVisaDataBeforeInit(t *testing.T) {
	length := len(visaData)
	if length != 0 {
		t.Fatalf("visa data before init = %q, want match for 0", length)
	}
}

func TestInitVisaData(t *testing.T) {
	err := InitVisaData()
	length := len(visaData)
	if length != 199 || err != nil {
		t.Fatalf("InitVisaData() = %q, %v, want match for 199, nil", length, err)
	}
}

func TestUpdateVisaData(t *testing.T) {
	err := updateVisaData()
	length := len(visaData)
	if length != 199 || err != nil {
		t.Fatalf("updateVisaData() = %q, %v, want match for 199, nil", length, err)
	}
}
