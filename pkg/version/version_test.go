package version

import "testing"

func TestGetVersion(t *testing.T) {
	version := APIVersion.String()
	if version != "Version: 1.1.0" {
		t.Fatalf("get version = %q, want match for Version: 1.1.0", version)
	}

}
