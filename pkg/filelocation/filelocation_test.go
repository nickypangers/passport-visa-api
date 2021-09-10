package filelocation

import (
	"path/filepath"
	"testing"
)

func TestGetParentDir(t *testing.T) {
	path := GetParentDir("pkg")
	t.Log(filepath.Abs(path))
}

func TestIsFileExist(t *testing.T) {
	path := GetParentDir("pkg")
	t.Log(IsFileExist(path + "/data/country-code.csv"))
}
