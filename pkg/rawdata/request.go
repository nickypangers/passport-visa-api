package rawdata

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

const url = "https://www.passportindex.org/incl/compare2.php"

type Destination struct {
	Code     string `json:"code"`
	Duration string `json:"dur"`
	Status   string `json:"text"`
}

type Info struct {
	Destinations []Destination `json:"destination"`
}

type Country map[string]Info

func getLatestData() {
	client := &http.Client{}

	data := []byte(`{"compare":"1"}`)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		log.Printf("Error: %s", err)
		return
	}

	req.Header.Set("X-Requested-With", "XMLHttpRequest")

	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error: %s", err)
	}

	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error: %s", err)
	}

	fmt.Println(string(respBody))

}
