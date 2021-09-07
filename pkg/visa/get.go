package visa

import storage "github.com/nickypangers/passport-visa-api/pkg/storage/json"

func getCountryVisaInfo(rows [][]string, passport string) storage.VisaCountryInfo {
	var vf, voa, vr, cb, na []string

	vf = make([]string, 0)
	voa = make([]string, 0)
	vr = make([]string, 0)
	cb = make([]string, 0)
	na = make([]string, 0)

	for i := range rows {
		p := rows[i][0]

		if p == passport {
			if rows[i][2] == "visa required" {
				vr = append(vr, rows[i][1])
			} else if rows[i][2] == "visa on arrival" || rows[i][2] == "e-visa" {
				voa = append(voa, rows[i][1])
			} else if rows[i][2] == "covid ban" {
				cb = append(cb, rows[i][1])
			} else if rows[i][2] == "no admission" {
				na = append(na, rows[i][1])
			} else if rows[i][2] != "-1" {
				vf = append(vf, rows[i][1])
			}
		}
	}

	return storage.VisaCountryInfo{VF: vf, VOA: voa, VR: vr, CB: cb, NA: na}
}

func getVisaInfo(rows [][]string, passport, destination string) string {

	for i := range rows {
		p := rows[i][0]
		d := rows[i][1]

		if p == passport && d == destination {
			return rows[i][2]
		}
	}

	return ""
}
