package memory

type VisaData struct {
	data [][]string
}

func (vd *VisaData) InitData() bool {
	// if len(vd.data) == 0 {
	// 	return false
	// }

	// return true
	return len(vd.data) == 0
}

func (vd *VisaData) LoadData() bool {
	return true
}
