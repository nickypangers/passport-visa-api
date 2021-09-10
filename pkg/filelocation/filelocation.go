package filelocation

import (
	"os"
	"path/filepath"
)

func GetParentDir() string {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	return filepath.Dir(filepath.Dir(wd))
}

func IsFileExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}
