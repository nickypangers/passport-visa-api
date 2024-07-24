# Passport Visa API

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
    "EV": Category,
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

<pre>{"passport":"RU","last_updated":"2024-07-25T01:23:02.993904","vr":{"data":["AF","AL","DZ","AD","AR","AM","AT","BS","BE","BZ","BT","BO","BA","BW","BR","BN","BG","BF","BI","CM","CA","CF","TD","CL","CN","CO","CG","CD","CR","HR","CU","CY","CZ","DK","DM","GQ","ER","EE","SZ","FJ","FI","FR","GE","DE","GH","GR","HN","HK","HU","IS","ID","IQ","IE","IL","IT","JM","JP","KZ","KI","XK","KW","LA","LV","LR","LY","LI","LT","LU","MO","MY","ML","MT","MH","MU","MD","MC","MN","ME","NL","NZ","NE","KP","NO","OM","PA","PY","PE","PH","PL","PT","QA","RO","SM","SK","SI","SB","KR","SS","ES","LK","SD","SR","SE","CH","SY","TW","TL","TM","UA","AE","GB","US","UY","VA","VN","YE"],"length":116},"voa":{"data":["AO","AZ","BD","KH","CV","KM","CI","EG","ET","GA","GW","IR","JO","KE","LB","MG","MR","MX","MZ","MM","NR","NP","NG","RW","SA","SN","SC","SL","SO","TZ","TG","TO","TV","UG","ZM","ZW"],"length":36},"vf":{"data":["AG","BB","BY","DO","EC","SV","GM","GD","GT","GY","HT","KG","MV","FM","MA","NA","NI","MK","PW","PS","KN","LC","WS","ST","RS","ZA","VC","TJ","TH","TT","TN","TR","UZ","VU","VE"],"length":35},"ev":{"data":["AU","BH","BJ","DJ","GN","IN","LS","MW","PK","PG","SG"],"length":11},"cb":{"data":[],"length":0},"na":{"data":[],"length":0},"error":{"status":false,"error":""}}</pre>

## Category Definition

| Category | Definition                      |
| -------- | ------------------------------- |
| VF       | Visa Free                       |
| VOA      | Visa On Arrival (including eTA) |
| EV       | eVisa                           |
| VR       | Visa Required                   |
| CB       | Covid Ban                       |
| NA       | No Admission                    |

## Future Work

This project will be maintained and improve over time. Feel free to contribute.
