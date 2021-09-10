package filelocation

import "testing"

func TestGetParentDir(t *testing.T) {
	path := GetParentDir()
	t.Log(path)
}

func TestIsFileExist(t *testing.T) {
	path := GetParentDir()
	t.Log(IsFileExist(path + "/data/country-code.csv"))
}
