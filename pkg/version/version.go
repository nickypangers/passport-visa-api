package version

import "fmt"

type Version struct {
	Major    string
	Minor    string
	Patch    string
	Metadata string
	Build    string
}

var (
	APIVersion = Version{Major: "1", Minor: "1", Patch: "0", Metadata: "", Build: ""}
)

// func Version() string {
// 	return version
// }

func (v Version) String() string {
	ver := fmt.Sprintf("Version: %s.%s.%s", v.Major, v.Minor, v.Patch)

	if v.Metadata != "" {
		ver += "-" + v.Metadata
	}

	return fmt.Sprint(ver)
}
