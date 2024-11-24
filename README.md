# Passport Visa API

![current version](https://img.shields.io/badge/current%20version-2.0.0-green)
![beta version](https://img.shields.io/badge/beta%20version-2.0.0-green)

This is an API for showing the visa requirements between two countries.

The API retrieves data from a postgresql database which is contributed by the community and from [Passport Index](https://www.passportindex.org/).

Feel free to open an issue for inaccurate data, so that I can update the database

## OpenAPI Docs
<pre>https<nolink>://rough-sun-2523.fly.dev/doc</pre>

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
    "passport": Detail,
    "destination": Detail,
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

### Detail

<pre>
{
    "name": String,
    "code": String,
}
</pre>

### Country

<pre>
{
    "name": String,
    "code": String,
    "duration": Number,
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

Passport Country: United Kingdom

Query:

<pre>https<nolink>://rough-sun-2523.fly.dev/country/GB</pre>

Result:

<pre>{
"name": "United Kingdom",
"code": "GB",
"VR": [
{
"name": "Algeria",
"code": "DZ",
"duration": null
},
{
"name": "Belize",
"code": "BZ",
"duration": null
},
{
"name": "Central African Republic",
"code": "CF",
"duration": null
},
{
"name": "Chad",
"code": "TD",
"duration": null
},
{
"name": "China",
"code": "CN",
"duration": null
},
{
"name": "Congo",
"code": "CG",
"duration": null
},
{
"name": "Dominican Republic",
"code": "DO",
"duration": null
},
{
"name": "Eritrea",
"code": "ER",
"duration": null
},
{
"name": "Ghana",
"code": "GH",
"duration": null
},
{
"name": "Honduras",
"code": "HN",
"duration": null
},
{
"name": "Iran",
"code": "IR",
"duration": null
},
{
"name": "Ireland",
"code": "IE",
"duration": null
},
{
"name": "Jamaica",
"code": "JM",
"duration": null
},
{
"name": "Lesotho",
"code": "LS",
"duration": null
},
{
"name": "Liberia",
"code": "LR",
"duration": null
},
{
"name": "Malaysia",
"code": "MY",
"duration": null
},
{
"name": "Mali",
"code": "ML",
"duration": null
},
{
"name": "Nauru",
"code": "NR",
"duration": null
},
{
"name": "Niger",
"code": "NE",
"duration": null
},
{
"name": "North Korea",
"code": "KP",
"duration": null
},
{
"name": "Palestine",
"code": "PS",
"duration": null
},
{
"name": "Russia",
"code": "RU",
"duration": null
},
{
"name": "Singapore",
"code": "SG",
"duration": null
},
{
"name": "Sudan",
"code": "SD",
"duration": null
},
{
"name": "Suriname",
"code": "SR",
"duration": null
},
{
"name": "Trinidad and Tobago",
"code": "TT",
"duration": null
},
{
"name": "Turkmenistan",
"code": "TM",
"duration": null
},
{
"name": "Yemen",
"code": "YE",
"duration": null
},
{
"name": "Afghanistan",
"code": "AF",
"duration": null
}
],
"VOA": [
{
"name": "Bahrain",
"code": "BH",
"duration": null
},
{
"name": "Bangladesh",
"code": "BD",
"duration": null
},
{
"name": "Burkina Faso",
"code": "BF",
"duration": null
},
{
"name": "Burundi",
"code": "BI",
"duration": null
},
{
"name": "Cambodia",
"code": "KH",
"duration": null
},
{
"name": "Comoros",
"code": "KM",
"duration": null
},
{
"name": "Djibouti",
"code": "DJ",
"duration": null
},
{
"name": "Egypt",
"code": "EG",
"duration": null
},
{
"name": "Ethiopia",
"code": "ET",
"duration": null
},
{
"name": "Guinea-Bissau",
"code": "GW",
"duration": null
},
{
"name": "Indonesia",
"code": "ID",
"duration": null
},
{
"name": "Iraq",
"code": "IQ",
"duration": null
},
{
"name": "Jordan",
"code": "JO",
"duration": null
},
{
"name": "Kuwait",
"code": "KW",
"duration": null
},
{
"name": "Laos",
"code": "LA",
"duration": null
},
{
"name": "Lebanon",
"code": "LB",
"duration": null
},
{
"name": "Madagascar",
"code": "MG",
"duration": null
},
{
"name": "Maldives",
"code": "MV",
"duration": null
},
{
"name": "Mauritania",
"code": "MR",
"duration": null
},
{
"name": "Nepal",
"code": "NP",
"duration": null
},
{
"name": "Oman",
"code": "OM",
"duration": null
},
{
"name": "Palau",
"code": "PW",
"duration": null
},
{
"name": "Qatar",
"code": "QA",
"duration": null
},
{
"name": "Samoa",
"code": "WS",
"duration": null
},
{
"name": "Saudi Arabia",
"code": "SA",
"duration": null
},
{
"name": "Sierra Leone",
"code": "SL",
"duration": null
},
{
"name": "Solomon Islands",
"code": "SB",
"duration": null
},
{
"name": "Somalia",
"code": "SO",
"duration": null
},
{
"name": "Sri Lanka",
"code": "LK",
"duration": null
},
{
"name": "Tajikistan",
"code": "TJ",
"duration": null
},
{
"name": "Tanzania",
"code": "TZ",
"duration": null
},
{
"name": "Timor-Leste",
"code": "TL",
"duration": null
},
{
"name": "Tonga",
"code": "TO",
"duration": null
},
{
"name": "Tuvalu",
"code": "TV",
"duration": null
},
{
"name": "Zimbabwe",
"code": "ZW",
"duration": null
}
],
"VF": [
{
"name": "Albania",
"code": "AL",
"duration": 90
},
{
"name": "Andorra",
"code": "AD",
"duration": 90
},
{
"name": "Angola",
"code": "AO",
"duration": 30
},
{
"name": "Antigua and Barbuda",
"code": "AG",
"duration": 180
},
{
"name": "Argentina",
"code": "AR",
"duration": 90
},
{
"name": "Armenia",
"code": "AM",
"duration": 180
},
{
"name": "Austria",
"code": "AT",
"duration": 90
},
{
"name": "Bahamas",
"code": "BS",
"duration": 240
},
{
"name": "Barbados",
"code": "BB",
"duration": 180
},
{
"name": "Belarus",
"code": "BY",
"duration": 30
},
{
"name": "Belgium",
"code": "BE",
"duration": 90
},
{
"name": "Bolivia",
"code": "BO",
"duration": 90
},
{
"name": "Bosnia and Herzegovina",
"code": "BA",
"duration": 90
},
{
"name": "Botswana",
"code": "BW",
"duration": 90
},
{
"name": "Brazil",
"code": "BR",
"duration": 90
},
{
"name": "Brunei",
"code": "BN",
"duration": 90
},
{
"name": "Bulgaria",
"code": "BG",
"duration": 90
},
{
"name": "Cape Verde",
"code": "CV",
"duration": 30
},
{
"name": "Chile",
"code": "CL",
"duration": 90
},
{
"name": "Colombia",
"code": "CO",
"duration": 90
},
{
"name": "Costa Rica",
"code": "CR",
"duration": 180
},
{
"name": "Croatia",
"code": "HR",
"duration": 90
},
{
"name": "Cyprus",
"code": "CY",
"duration": 90
},
{
"name": "Czech Republic",
"code": "CZ",
"duration": 90
},
{
"name": "Denmark",
"code": "DK",
"duration": 90
},
{
"name": "Dominica",
"code": "DM",
"duration": 180
},
{
"name": "Ecuador",
"code": "EC",
"duration": 90
},
{
"name": "El Salvador",
"code": "SV",
"duration": 180
},
{
"name": "Estonia",
"code": "EE",
"duration": 90
},
{
"name": "Swaziland",
"code": "SZ",
"duration": 30
},
{
"name": "Fiji",
"code": "FJ",
"duration": 120
},
{
"name": "Finland",
"code": "FI",
"duration": 90
},
{
"name": "France",
"code": "FR",
"duration": 90
},
{
"name": "Gambia",
"code": "GM",
"duration": 90
},
{
"name": "Georgia",
"code": "GE",
"duration": 360
},
{
"name": "Germany",
"code": "DE",
"duration": 90
},
{
"name": "Greece",
"code": "GR",
"duration": 90
},
{
"name": "Grenada",
"code": "GD",
"duration": 90
},
{
"name": "Guatemala",
"code": "GT",
"duration": 90
},
{
"name": "Guyana",
"code": "GY",
"duration": 90
},
{
"name": "Haiti",
"code": "HT",
"duration": 90
},
{
"name": "Hong Kong",
"code": "HK",
"duration": 180
},
{
"name": "Hungary",
"code": "HU",
"duration": 90
},
{
"name": "Iceland",
"code": "IS",
"duration": 90
},
{
"name": "Israel",
"code": "IL",
"duration": 90
},
{
"name": "Italy",
"code": "IT",
"duration": 90
},
{
"name": "Japan",
"code": "JP",
"duration": 90
},
{
"name": "Kazakhstan",
"code": "KZ",
"duration": 30
},
{
"name": "Kiribati",
"code": "KI",
"duration": 90
},
{
"name": "Kosovo",
"code": "XK",
"duration": 90
},
{
"name": "Kyrgyzstan",
"code": "KG",
"duration": 60
},
{
"name": "Latvia",
"code": "LV",
"duration": 90
},
{
"name": "Liechtenstein",
"code": "LI",
"duration": 90
},
{
"name": "Lithuania",
"code": "LT",
"duration": 90
},
{
"name": "Luxembourg",
"code": "LU",
"duration": 90
},
{
"name": "Macao",
"code": "MO",
"duration": 180
},
{
"name": "Malawi",
"code": "MW",
"duration": 30
},
{
"name": "Malta",
"code": "MT",
"duration": 90
},
{
"name": "Marshall Islands",
"code": "MH",
"duration": 90
},
{
"name": "Mauritius",
"code": "MU",
"duration": 90
},
{
"name": "Mexico",
"code": "MX",
"duration": 180
},
{
"name": "Micronesia",
"code": "FM",
"duration": 30
},
{
"name": "Moldova",
"code": "MD",
"duration": 90
},
{
"name": "Monaco",
"code": "MC",
"duration": 90
},
{
"name": "Mongolia",
"code": "MN",
"duration": 30
},
{
"name": "Montenegro",
"code": "ME",
"duration": 90
},
{
"name": "Morocco",
"code": "MA",
"duration": 90
},
{
"name": "Mozambique",
"code": "MZ",
"duration": 30
},
{
"name": "Namibia",
"code": "NA",
"duration": 90
},
{
"name": "Netherlands",
"code": "NL",
"duration": 90
},
{
"name": "Nicaragua",
"code": "NI",
"duration": 90
},
{
"name": "North Macedonia",
"code": "MK",
"duration": 90
},
{
"name": "Norway",
"code": "NO",
"duration": 90
},
{
"name": "Panama",
"code": "PA",
"duration": 90
},
{
"name": "Paraguay",
"code": "PY",
"duration": 90
},
{
"name": "Peru",
"code": "PE",
"duration": 180
},
{
"name": "Philippines",
"code": "PH",
"duration": 30
},
{
"name": "Poland",
"code": "PL",
"duration": 90
},
{
"name": "Portugal",
"code": "PT",
"duration": 90
},
{
"name": "Romania",
"code": "RO",
"duration": 90
},
{
"name": "Rwanda",
"code": "RW",
"duration": 30
},
{
"name": "Saint Kitts and Nevis",
"code": "KN",
"duration": 180
},
{
"name": "Saint Lucia",
"code": "LC",
"duration": 42
},
{
"name": "San Marino",
"code": "SM",
"duration": 90
},
{
"name": "Sao Tome and Principe",
"code": "ST",
"duration": 15
},
{
"name": "Senegal",
"code": "SN",
"duration": 90
},
{
"name": "Serbia",
"code": "RS",
"duration": 90
},
{
"name": "Seychelles",
"code": "SC",
"duration": 90
},
{
"name": "Slovakia",
"code": "SK",
"duration": 90
},
{
"name": "Slovenia",
"code": "SI",
"duration": 90
},
{
"name": "South Africa",
"code": "ZA",
"duration": 90
},
{
"name": "South Korea",
"code": "KR",
"duration": 90
},
{
"name": "Spain",
"code": "ES",
"duration": 90
},
{
"name": "Saint Vincent and the Grenadines",
"code": "VC",
"duration": 180
},
{
"name": "Sweden",
"code": "SE",
"duration": 90
},
{
"name": "Switzerland",
"code": "CH",
"duration": 90
},
{
"name": "Taiwan",
"code": "TW",
"duration": 90
},
{
"name": "Thailand",
"code": "TH",
"duration": 60
},
{
"name": "Tunisia",
"code": "TN",
"duration": 90
},
{
"name": "Turkey",
"code": "TR",
"duration": 90
},
{
"name": "Ukraine",
"code": "UA",
"duration": 90
},
{
"name": "United Arab Emirates",
"code": "AE",
"duration": 30
},
{
"name": "Uruguay",
"code": "UY",
"duration": 90
},
{
"name": "Uzbekistan",
"code": "UZ",
"duration": 30
},
{
"name": "Vanuatu",
"code": "VU",
"duration": 120
},
{
"name": "Vatican",
"code": "VA",
"duration": 90
},
{
"name": "Venezuela",
"code": "VE",
"duration": 90
},
{
"name": "Vietnam",
"code": "VN",
"duration": 45
},
{
"name": "Zambia",
"code": "ZM",
"duration": 90
}
],
"EV": [
{
"name": "Australia",
"code": "AU",
"duration": null
},
{
"name": "Azerbaijan",
"code": "AZ",
"duration": null
},
{
"name": "Benin",
"code": "BJ",
"duration": null
},
{
"name": "Bhutan",
"code": "BT",
"duration": null
},
{
"name": "Cameroon",
"code": "CM",
"duration": null
},
{
"name": "Canada",
"code": "CA",
"duration": null
},
{
"name": "DR Congo",
"code": "CD",
"duration": null
},
{
"name": "Ivory Coast",
"code": "CI",
"duration": null
},
{
"name": "Cuba",
"code": "CU",
"duration": null
},
{
"name": "Equatorial Guinea",
"code": "GQ",
"duration": null
},
{
"name": "Gabon",
"code": "GA",
"duration": null
},
{
"name": "Guinea",
"code": "GN",
"duration": null
},
{
"name": "India",
"code": "IN",
"duration": null
},
{
"name": "Kenya",
"code": "KE",
"duration": null
},
{
"name": "Libya",
"code": "LY",
"duration": null
},
{
"name": "Myanmar",
"code": "MM",
"duration": null
},
{
"name": "New Zealand",
"code": "NZ",
"duration": null
},
{
"name": "Nigeria",
"code": "NG",
"duration": null
},
{
"name": "Pakistan",
"code": "PK",
"duration": null
},
{
"name": "Papua New Guinea",
"code": "PG",
"duration": null
},
{
"name": "South Sudan",
"code": "SS",
"duration": null
},
{
"name": "Syria",
"code": "SY",
"duration": null
},
{
"name": "Togo",
"code": "TG",
"duration": null
},
{
"name": "Uganda",
"code": "UG",
"duration": null
},
{
"name": "United States",
"code": "US",
"duration": null
}
],
"NA": [],
"last_updated": "2024-11-12T18:17:29.489Z"
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
