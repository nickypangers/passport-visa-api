# Passport Visa API

![current version](https://img.shields.io/badge/current%20version-2.0.0-green)
![beta version](https://img.shields.io/badge/beta%20version-2.0.0-green)

This is an API for showing the visa requirements between two countries.

The API retrieves data from a postgresql database which is contributed by the community and from [Passport Index](https://www.passportindex.org/).

Feel free to open an issue for inaccurate data, so that I can update the database

## OpenAPI Docs
<pre>https<nolink>://rough-sun-2523.fly.io/doc</pre>

## Instructions

To GET the visa requirement between two countries, <pre>https<nolink>://rough-sun-2523.fly.dev/visa/{passport country}/{destination country}</pre>

To GET the visa stats of a country, <pre>https<nolink>://rough-sun-2523.fly.dev/country/{passport country}</pre>

<!-- To GET the list of countries sorted by the visa requirements of a country, <pre>https<nolink>://rough-sun-2523.fly.dev/list/api/{passport country}</pre> -->

<!-- To GET the list of countries,

<pre>https<nolink>://rough-sun-2523.fly.dev/countryList</pre> -->

where the passport country and destination country are in ISO 2 Country code format. To see all the ISO 2 Country codes, visit [here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

For the explanation of the Code result, please see:

https://github.com/ilyankou/passport-index-dataset (see Dataset Values section)

## Data Object Type

### Visa requirement between two countries

<pre>
{
    "id": Int,
    "passport": Country,
    "destination": Country,
    "dur": Number | null,
    "category": Category,
    last_updated: String
}
</pre>

### Visa information of a specific country

<pre>
{
    "name": String,
    "code": String,
    "VR": Country[],
    "VOA": Country[],
    "EV": Country[],
    "VF": Country[],
    "NA": Country[],
    "last_updated": String
}
</pre>

### Country

<pre>
{
    "name": String,
    "code": String
}
</pre>

### Category

<pre>
{
    "name": String,
    "code": String
}
</pre>

### Error

<pre>
{
    "status": Boolean,
    "error": String,
    "last_updated": String
}
</pre>

## Examples

### Get visa requirement between two countries

Passport Country: Hong Kong, Destination Country: United Kingdom

Query:

<pre>https<nolink>://rough-sun-2523.fly.dev/visa/HK/GB</pre>

Result:

<pre>{
"id": 58073,
"passport": {
"name": "Hong Kong",
"code": "HK"
},
"destination": {
"name": "United Kingdom",
"code": "GB"
},
"dur": null,
"category": {
"name": "Visa Free",
"code": "VF"
},
"last_updated": "2024-11-03T18:07:48.198Z"
}</pre>

### Get list of countries sorted by visa requirements of a passport

Passport Country: Hong Kong

Query:

<pre>https<nolink>://rough-sun-2523.fly.dev/api/HK</pre>

Result:

<pre>{
"name": "Hong Kong",
"code": "HK",
"VR": [
{
"name": "Afghanistan",
"duration": "AF"
},
{
"name": "Algeria",
"duration": "DZ"
},
{
"name": "Andorra",
"duration": "AD"
},
{
"name": "Argentina",
"duration": "AR"
},
{
"name": "Armenia",
"duration": "AM"
},
{
"name": "Australia",
"duration": "AU"
},
{
"name": "Austria",
"duration": "AT"
},
{
"name": "Bahamas",
"duration": "BS"
},
{
"name": "Bangladesh",
"duration": "BD"
},
{
"name": "Belgium",
"duration": "BE"
},
{
"name": "Belize",
"duration": "BZ"
},
{
"name": "Bhutan",
"duration": "BT"
},
{
"name": "Bosnia and Herzegovina",
"duration": "BA"
},
{
"name": "Botswana",
"duration": "BW"
},
{
"name": "Brazil",
"duration": "BR"
},
{
"name": "Brunei",
"duration": "BN"
},
{
"name": "Bulgaria",
"duration": "BG"
},
{
"name": "Burundi",
"duration": "BI"
},
{
"name": "Cameroon",
"duration": "CM"
},
{
"name": "Canada",
"duration": "CA"
},
{
"name": "Central African Republic",
"duration": "CF"
},
{
"name": "Chad",
"duration": "TD"
},
{
"name": "Chile",
"duration": "CL"
},
{
"name": "China",
"duration": "CN"
},
{
"name": "Colombia",
"duration": "CO"
},
{
"name": "Congo",
"duration": "CG"
},
{
"name": "DR Congo",
"duration": "CD"
},
{
"name": "Costa Rica",
"duration": "CR"
},
{
"name": "Croatia",
"duration": "HR"
},
{
"name": "Cyprus",
"duration": "CY"
},
{
"name": "Czech Republic",
"duration": "CZ"
},
{
"name": "Denmark",
"duration": "DK"
},
{
"name": "Dominica",
"duration": "DM"
},
{
"name": "El Salvador",
"duration": "SV"
},
{
"name": "Equatorial Guinea",
"duration": "GQ"
},
{
"name": "Eritrea",
"duration": "ER"
},
{
"name": "Estonia",
"duration": "EE"
},
{
"name": "Swaziland",
"duration": "SZ"
},
{
"name": "Fiji",
"duration": "FJ"
},
{
"name": "Finland",
"duration": "FI"
},
{
"name": "France",
"duration": "FR"
},
{
"name": "Gambia",
"duration": "GM"
},
{
"name": "Georgia",
"duration": "GE"
},
{
"name": "Germany",
"duration": "DE"
},
{
"name": "Ghana",
"duration": "GH"
},
{
"name": "Greece",
"duration": "GR"
},
{
"name": "Guatemala",
"duration": "GT"
},
{
"name": "Honduras",
"duration": "HN"
},
{
"name": "Hungary",
"duration": "HU"
},
{
"name": "Iceland",
"duration": "IS"
},
{
"name": "Indonesia",
"duration": "ID"
},
{
"name": "Iraq",
"duration": "IQ"
},
{
"name": "Israel",
"duration": "IL"
},
{
"name": "Italy",
"duration": "IT"
},
{
"name": "Jamaica",
"duration": "JM"
},
{
"name": "Japan",
"duration": "JP"
},
{
"name": "Kazakhstan",
"duration": "KZ"
},
{
"name": "Kosovo",
"duration": "XK"
},
{
"name": "Laos",
"duration": "LA"
},
{
"name": "Latvia",
"duration": "LV"
},
{
"name": "Liberia",
"duration": "LR"
},
{
"name": "Libya",
"duration": "LY"
},
{
"name": "Liechtenstein",
"duration": "LI"
},
{
"name": "Lithuania",
"duration": "LT"
},
{
"name": "Luxembourg",
"duration": "LU"
},
{
"name": "Malawi",
"duration": "MW"
},
{
"name": "Malaysia",
"duration": "MY"
},
{
"name": "Maldives",
"duration": "MV"
},
{
"name": "Mali",
"duration": "ML"
},
{
"name": "Malta",
"duration": "MT"
},
{
"name": "Marshall Islands",
"duration": "MH"
},
{
"name": "Mauritius",
"duration": "MU"
},
{
"name": "Moldova",
"duration": "MD"
},
{
"name": "Monaco",
"duration": "MC"
},
{
"name": "Mongolia",
"duration": "MN"
},
{
"name": "Montenegro",
"duration": "ME"
},
{
"name": "Nauru",
"duration": "NR"
},
{
"name": "Netherlands",
"duration": "NL"
},
{
"name": "New Zealand",
"duration": "NZ"
},
{
"name": "North Korea",
"duration": "KP"
},
{
"name": "Norway",
"duration": "NO"
},
{
"name": "Oman",
"duration": "OM"
},
{
"name": "Pakistan",
"duration": "PK"
},
{
"name": "Panama",
"duration": "PA"
},
{
"name": "Paraguay",
"duration": "PY"
},
{
"name": "Peru",
"duration": "PE"
},
{
"name": "Philippines",
"duration": "PH"
},
{
"name": "Poland",
"duration": "PL"
},
{
"name": "Portugal",
"duration": "PT"
},
{
"name": "Qatar",
"duration": "QA"
},
{
"name": "Romania",
"duration": "RO"
},
{
"name": "Russia",
"duration": "RU"
},
{
"name": "San Marino",
"duration": "SM"
},
{
"name": "Senegal",
"duration": "SN"
},
{
"name": "Sierra Leone",
"duration": "SL"
},
{
"name": "Slovakia",
"duration": "SK"
},
{
"name": "Slovenia",
"duration": "SI"
},
{
"name": "Solomon Islands",
"duration": "SB"
},
{
"name": "South Africa",
"duration": "ZA"
},
{
"name": "South Korea",
"duration": "KR"
},
{
"name": "South Sudan",
"duration": "SS"
},
{
"name": "Spain",
"duration": "ES"
},
{
"name": "Sri Lanka",
"duration": "LK"
},
{
"name": "Sudan",
"duration": "SD"
},
{
"name": "Sweden",
"duration": "SE"
},
{
"name": "Switzerland",
"duration": "CH"
},
{
"name": "Syria",
"duration": "SY"
},
{
"name": "Timor-Leste",
"duration": "TL"
},
{
"name": "Turkmenistan",
"duration": "TM"
},
{
"name": "Ukraine",
"duration": "UA"
},
{
"name": "United Arab Emirates",
"duration": "AE"
},
{
"name": "United States",
"duration": "US"
},
{
"name": "Uruguay",
"duration": "UY"
},
{
"name": "Vatican",
"duration": "VA"
},
{
"name": "Vietnam",
"duration": "VN"
}
],
"VOA": [
{
"name": "Angola",
"duration": "AO"
},
{
"name": "Azerbaijan",
"duration": "AZ"
},
{
"name": "Bolivia",
"duration": "BO"
},
{
"name": "Burkina Faso",
"duration": "BF"
},
{
"name": "Cambodia",
"duration": "KH"
},
{
"name": "Comoros",
"duration": "KM"
},
{
"name": "Ivory Coast",
"duration": "CI"
},
{
"name": "Cuba",
"duration": "CU"
},
{
"name": "Ethiopia",
"duration": "ET"
},
{
"name": "Guinea-Bissau",
"duration": "GW"
},
{
"name": "Jordan",
"duration": "JO"
},
{
"name": "Kenya",
"duration": "KE"
},
{
"name": "Kuwait",
"duration": "KW"
},
{
"name": "Lebanon",
"duration": "LB"
},
{
"name": "Madagascar",
"duration": "MG"
},
{
"name": "Mauritania",
"duration": "MR"
},
{
"name": "Mozambique",
"duration": "MZ"
},
{
"name": "Nepal",
"duration": "NP"
},
{
"name": "Nigeria",
"duration": "NG"
},
{
"name": "Palau",
"duration": "PW"
},
{
"name": "Papua New Guinea",
"duration": "PG"
},
{
"name": "Rwanda",
"duration": "RW"
},
{
"name": "Samoa",
"duration": "WS"
},
{
"name": "Saudi Arabia",
"duration": "SA"
},
{
"name": "Seychelles",
"duration": "SC"
},
{
"name": "Somalia",
"duration": "SO"
},
{
"name": "Togo",
"duration": "TG"
},
{
"name": "Tonga",
"duration": "TO"
},
{
"name": "Tuvalu",
"duration": "TV"
}
],
"VF": [
{
"name": "Albania",
"duration": "AL"
},
{
"name": "Antigua and Barbuda",
"duration": "AG"
},
{
"name": "Barbados",
"duration": "BB"
},
{
"name": "Belarus",
"duration": "BY"
},
{
"name": "Benin",
"duration": "BJ"
},
{
"name": "Cape Verde",
"duration": "CV"
},
{
"name": "Dominican Republic",
"duration": "DO"
},
{
"name": "Ecuador",
"duration": "EC"
},
{
"name": "Egypt",
"duration": "EG"
},
{
"name": "Grenada",
"duration": "GD"
},
{
"name": "Guyana",
"duration": "GY"
},
{
"name": "Haiti",
"duration": "HT"
},
{
"name": "Iran",
"duration": "IR"
},
{
"name": "Ireland",
"duration": "IE"
},
{
"name": "Kiribati",
"duration": "KI"
},
{
"name": "Lesotho",
"duration": "LS"
},
{
"name": "Macao",
"duration": "MO"
},
{
"name": "Mexico",
"duration": "MX"
},
{
"name": "Micronesia",
"duration": "FM"
},
{
"name": "Morocco",
"duration": "MA"
},
{
"name": "Myanmar",
"duration": "MM"
},
{
"name": "Namibia",
"duration": "NA"
},
{
"name": "Nicaragua",
"duration": "NI"
},
{
"name": "Niger",
"duration": "NE"
},
{
"name": "North Macedonia",
"duration": "MK"
},
{
"name": "Palestine",
"duration": "PS"
},
{
"name": "Saint Kitts and Nevis",
"duration": "KN"
},
{
"name": "Saint Lucia",
"duration": "LC"
},
{
"name": "Serbia",
"duration": "RS"
},
{
"name": "Singapore",
"duration": "SG"
},
{
"name": "Saint Vincent and the Grenadines",
"duration": "VC"
},
{
"name": "Suriname",
"duration": "SR"
},
{
"name": "Tanzania",
"duration": "TZ"
},
{
"name": "Thailand",
"duration": "TH"
},
{
"name": "Trinidad and Tobago",
"duration": "TT"
},
{
"name": "Tunisia",
"duration": "TN"
},
{
"name": "Turkey",
"duration": "TR"
},
{
"name": "Uganda",
"duration": "UG"
},
{
"name": "United Kingdom",
"duration": "GB"
},
{
"name": "Uzbekistan",
"duration": "UZ"
},
{
"name": "Vanuatu",
"duration": "VU"
},
{
"name": "Venezuela",
"duration": "VE"
},
{
"name": "Yemen",
"duration": "YE"
},
{
"name": "Zambia",
"duration": "ZM"
},
{
"name": "Zimbabwe",
"duration": "ZW"
}
],
"EV": [
{
"name": "Bahrain",
"duration": "BH"
},
{
"name": "Djibouti",
"duration": "DJ"
},
{
"name": "Gabon",
"duration": "GA"
},
{
"name": "Guinea",
"duration": "GN"
},
{
"name": "India",
"duration": "IN"
},
{
"name": "Kyrgyzstan",
"duration": "KG"
},
{
"name": "Sao Tome and Principe",
"duration": "ST"
},
{
"name": "Taiwan",
"duration": "TW"
},
{
"name": "Tajikistan",
"duration": "TJ"
}
],
"NA": [],
"last_updated": "2024-11-03T18:10:09.506Z"
}</pre>

## Category Definition

| Category | Definition                      |
| -------- | ------------------------------- |
| VF       | Visa Free                       |
| VOA      | Visa On Arrival (including eTA) |
| EV       | eVisa                           |
| VR       | Visa Required                   |
| NA       | No Admission                    |

## Future Work

This project will be maintained and improve over time. Feel free to contribute.
