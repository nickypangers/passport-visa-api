package filelocation

import (
	"path/filepath"
	"testing"
)

func TestGetParentDir(t *testing.T) {
	path := GetParentDir()
	t.Log(filepath.Abs(path))
}

func TestIsFileExist(t *testing.T) {
	path := GetParentDir()
	t.Log(IsFileExist(path + "/data/country-code.csv"))
}
