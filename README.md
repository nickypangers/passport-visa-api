# Passport Visa API

[![Test](https://github.com/nickypangers/passport-visa-api/actions/workflows/test.yaml/badge.svg)](https://github.com/nickypangers/passport-visa-api/actions/workflows/test.yaml)
![current version](https://img.shields.io/badge/current%20version-1.1.1-green)
![beta version](https://img.shields.io/badge/beta%20version-1.1.1-green)
[![Coverage Status](https://coveralls.io/repos/github/nickypangers/passport-visa-api/badge.svg?branch=master)](https://coveralls.io/github/nickypangers/passport-visa-api?branch=master)

This is an API for showing the visa requirements between two countries, method based on: https://github.com/ilyankou/passport-index-dataset

The API retrieves data from [Passport Index](https://www.passportindex.org/) every day for the most up-to-date visa information.

## Instructions

To GET the visa requirement between two countries, <pre>https<nolink>://rough-sun-2523.fly.dev/api/{passport country}/{destination country}</pre>

To GET the visa stats of a country, <pre>https<nolink>://rough-sun-2523.fly.dev/api/{passport country}</pre>

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
    "passport": String,
    "destination": String,
    "dur": String,
    "status": String,
    "category": String,
    "last_updated": String,
    "error": Error,
}
</pre>

### Visa information of a specific country

<pre>
{
    "passport": String,
    "VR": Category,
    "VOA": Category,
    "VF": Category,
    "CB": Category,
    "NA": Category,
    "last_updated": String,
    "error": Error,
}
</pre>

### List of Countries

<pre>
{
    "list": Array < Country >,
    "last_updated": String,
    "error": Error,
}
</pre>

### Country

<pre>
{
    "name": String,
    "code": String,
}
</pre>

### Category

<pre>
{
    "data": Array (or null if empty),
    "length": Number,
}
</pre>

### Error

<pre>
{
    "status": Boolean,
    "error": String,
}
</pre>

## Examples

### Get visa requirement between two countries

Passport Country: Hong Kong, Destination Country: United Kingdom

Query:

<pre>https<nolink>://rough-sun-2523.fly.dev/api/HK/GB</pre>

Result:

<pre>{"passport":"HK","destination":"GB","dur":"180","status":"VF","category":"visa-free","last_updated":"2023-05-30T00:16:18.440137","error":{"status":false,"error":""}}</pre>

### Get list of countries sorted by visa requirements of a passport

Passport Country: Russia

Query:

<pre>https<nolink>://rough-sun-2523.fly.dev/api/RU</pre>

Result:

<pre>{"passport":"RU","last_updated":"2023-05-30T00:22:02.975059","vr":{"data":["AF","DZ","AD","AT","BE","BZ","BG","CA","CF","TD","CN","CG","HR","CY","CZ","DK","GQ","ER","EE","FI","FR","DE","GH","GR","GW","HU","IS","IE","IT","JP","KI","XK","KW","LV","LR","LY","LI","LT","LU","ML","MT","MC","NL","NZ","NE","KP","MK","NO","PL","PT","RO","SM","SK","SI","SB","ES","SD","SE","CH","SY","TW","TM","UA","GB","US","VA","YE"],"length":67},"voa":{"data":["AO","BH","BD","BI","KH","KM","CI","EG","ID","IQ","JO","LB","MG","MH","MR","MX","NR","NP","NG","OM","PK","QA","RW","SA","SN","SC","SL","SO","KR","LK","TZ","TL","TG","TO","TV","ZM","ZW"],"length":37},"vf":{"data":["AL","AG","AR","AM","AU","AZ","BS","BB","BY","BJ","BT","BO","BA","BW","BR","BN","BF","CM","CV","CL","CO","CD","CR","CU","DJ","DM","DO","EC","SV","SZ","ET","FJ","GA","GM","GE","GD","GT","GN","GY","HT","HN","HK","IN","IR","IL","JM","KZ","KE","KG","LA","LS","MO","MW","MY","MV","MU","FM","MD","MN","ME","MA","MZ","MM","NA","NI","PW","PS","PA","PG","PY","PE","PH","KN","LC","WS","ST","RS","SG","ZA","SS","VC","SR","TJ","TH","TT","TN","TR","UG","AE","UY","UZ","VU","VE","VN"],"length":94},"cb":{"data":[],"length":0},"na":{"data":[],"length":0},"error":{"status":false,"error":""}}</pre>

## Category Definition

| Category | Definition                      |
| -------- | ------------------------------- |
| VF       | Visa Free                       |
| VOA      | Visa On Arrival (including eTA) |
| VR       | Visa Required                   |
| CB       | Covid Ban                       |
| NA       | No Admission                    |

## Future Work

This project will be maintained and improve over time. Feel free to contribute.
