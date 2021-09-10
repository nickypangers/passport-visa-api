package filelocation

import (
	"log"
	"os"
	"path/filepath"
)

func GetParentDir() string {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	log.Println("parent dir:", filepath.Dir(filepath.Dir(wd)))

	return filepath.Dir(filepath.Dir(wd))
}

func IsFileExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}
