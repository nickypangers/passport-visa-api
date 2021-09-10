package filelocation

import (
	"fmt"
	"os"
	"strings"
)

func getIndexOfElement(array []string, elem string) int {
	for i, v := range array {
		if v == elem {
			return i
		}
	}
	return -1
}

func GetParentDir() string {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	splitArray := strings.Split(wd, "/")
	pkgIndex := getIndexOfElement(splitArray, "pkg")

	splitArray = splitArray[:pkgIndex]

	fmt.Println(splitArray)

	parentDir := strings.Join(splitArray, "/")

	// fmt.Println(wd)
	return parentDir

	// log.Println("parent dir:", filepath.Dir(filepath.Dir(wd)))

	// return filepath.Dir(filepath.Dir(wd))
}

func IsFileExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}
