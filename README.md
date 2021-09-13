# Passport Visa API

[![Test](https://github.com/nickypangers/passport-visa-api/actions/workflows/test.yaml/badge.svg)](https://github.com/nickypangers/passport-visa-api/actions/workflows/test.yaml)
![current version](https://img.shields.io/badge/current%20version-1.0.0-green)
![beta version](https://img.shields.io/badge/beta%20version-1.1.0-green)
[![Coverage Status](https://coveralls.io/repos/github/nickypangers/passport-visa-api/badge.svg?branch=master)](https://coveralls.io/github/nickypangers/passport-visa-api?branch=master)

This is an API for showing the visa requirements between two countries, method based on: https://github.com/ilyankou/passport-index-dataset

The API retrieves data from [Passport Index](https://www.passportindex.org/) every day for the most up-to-date visa information.

## Instructions

To GET the visa requirement between two countries, <pre>https<nolink>://passportvisa-api.herokuapp.com/api/{passport country}/{destination country}</pre>

To GET the visa stats of a country, <pre>https<nolink>://passportvisa-api.herokuapp.com/api/{passport country}</pre>

To GET the list of countries sorted by the visa requirements of a country, <pre>https<nolink>://passportvisa-api-herokuapp.com/list/api/{passport country}</pre>

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

<pre>https<nolink>://passportvisa-api.herokuapp.com/api/HK/GB</pre>

Result:

<pre>{"passport":"HK","destination":"GB","dur":"180","status":"visa-free","category":"VF","last_updated":"Wed, 08 Sep 2021 17:37:25 GMT","error":{"status":false,"error":""}}</pre>

### Get list of countries sorted by visa requirements of a passport

Passport Country: Russia

Query:

<pre>https<nolink>://passportvisa-api.herokuapp.com/list/api/RU</pre>

Result:

<pre>{"Passport":"RU","VF":{"data":["AL","AG","AM","AZ","BS","BB","BY","BO","BA","BW","BR","CV","CO","CR","CU","DM","DO","EC","SV","SZ","GM","GE","GD","GT","GY","HT","HN","HK","KZ","KG","MV","MU","MD","MN","ME","MA","NA","NI","MK","PW","PS","PA","PY","PE","QA","KN","LC","WS","ST","RS","ZA","VC","SR","TJ","TH","TT","TN","TR","UA","AE","UY","UZ","VE"],"length":63},"VOA":{"data":["AO","BH","KM","CI","EG","GA","GN","GW","IR","IQ","JM","JO","KE","LB","LS","MG","MW","MR","MX","MZ","NR","NG","OM","RW","SN","SC","SL","SO","LK","TL","TG","TO","TV","ZM","ZW"],"length":35},"VR":{"data":["AF","DZ","AD","AT","BZ","BJ","BT","BG","BF","BI","CF","TD","CN","CG","CD","HR","DJ","GQ","ER","EE","ET","FI","FR","DE","GH","IS","IE","KI","XK","LV","LR","LY","LI","LT","ML","MC","NL","NE","KP","NO","PK","RO","SK","SI","SS","ES","SD","CH","SY","TZ","TM","UG","GB","US","VU","YE"],"length":56},"CB":{"data":["AR","AU","BD","BE","BN","KH","CM","CA","CL","CY","CZ","DK","FJ","GR","HU","IN","ID","IL","IT","JP","KW","LA","LU","MO","MY","MT","MH","FM","MM","NP","NZ","PG","PH","PL","PT","SM","SA","SG","SB","KR","SE","TW","VA","VN"],"length":44},"NA":{"data":null,"length":0},"last_updated":"Thu, 09 Sep 2021 06:49:28 GMT","error":{"status":false,"error":""}}</pre>

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
