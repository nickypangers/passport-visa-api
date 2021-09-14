package country

import (
	"github.com/nickypangers/passport-visa-api/pkg/storage/json"
	"github.com/nickypangers/passport-visa-api/pkg/storage/memory"
)

func GetCountryList() []json.Country {

	return memory.GetCountryList()
}
