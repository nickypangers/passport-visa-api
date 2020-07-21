# Passport Visa API

[![Build Status](https://travis-ci.com/nickypangers/passport-visa-api.svg?branch=master)](https://travis-ci.com/nickypangers/passport-visa-api)

This is an API for showing the visa requirements between two countries. The data is provided by this: https://github.com/ilyankou/passport-index-dataset

## Instructions

To GET the visa requirement between two countries, <pre>https<nolink>://passportvisa-api.herokuapp.com/api/{passport country}/{destination country}</pre>

To GET the visa stats of a country, <pre>https<nolink>://passportvisa-api.herokuapp.com/api/{passport country}</pre>

To GET the list of countries sorted by the visa requirements of a country, <pre>https<nolink>://passportvisa-api-herokuapp.com/list/api/{passport country}</pre>

where the passport country and destination country are in ISO 2 Country code format. To see all the ISO 2 Country codes, visit [here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

For the explanation of the Code result, please see:

https://github.com/ilyankou/passport-index-dataset (see Dataset Values section)

## Examples

### Get visa requirement between two countries

Scenario: I want to get the visa requirement of a Hong Kong passport to United Kingdom. The correct API call will be:

<pre>https<nolink>://passportvisa-api.herokuapp.com/api/HK/GB</pre>

The return will be something like this:

<pre>{"Passport":"HK","Destination":"GB","Code":"180"}</pre>

### Get overall visa stats of a passport

Scenario: I want to see how many visa free countries Hong Kong passport has. The correct API call will be:

<pre>https<nolink>://passportvisa-api.herokuapp.com/api/HK</pre>

The return will be something like this:

<pre>{"Passport":"HK","VF":"112","VOA":"43","VR":"43"}</pre>

### Get list of countries sorted by visa requirements of a passport

Scenario: I want to see a list of countries sorted by visa requirements of United Arab Emirates passport. The correct API call will be:

<pre>https<nolink>://passportvisa-api.herokuapp.com/list/api/AE</pre>

The return will be something like this:

<pre>{"VF":["AL","AD","AG","AR","AM","AT","BS","BH","BB","BY","BE","BA","BW","BR","BN","BG","BF","TD","CL","CN","CO","CR","HR","CU","CY","CZ","DK","DM","DO","EC","EG","SV","EE","SZ","FJ","FI","FR","GM","GE","DE","GR","GD","GT","HT","HN","HK","HU","IS","ID","IE","IT","JP","JO","KZ","XK","KW","KG","LV","LB","LI","LT","LU","MY","ML","MT","MU","MX","FM","MD","MC","ME","MA","NR","NL","NI","MK","NO","OM","PS","PA","PY","PH","PL","PT","QA","RO","RU","KN","LC","SM","ST","SA","RS","SG","SK","SI","SB","ZA","KR","SS","ES","VC","SD","SE","CH","SY","TH","TO","TN","UA","UY","UZ","VU","VA"],"VOA":["AO","AU","AZ","BD","BJ","BO","BI","KH","CA","CV","CF","KM","CG","CD","CI","DJ","GQ","ET","GA","GN","GW","GY","IN","IR","KE","LA","LS","LR","MO","MG","MW","MV","MH","MR","MN","MZ","NA","NP","NZ","NE","NG","PK","PW","RW","WS","SN","SC","SL","SO","LK","SR","TW","TJ","TZ","TL","TG","TR","TV","UG","GB","VN","YE","ZM","ZW"],"VR":["AF","DZ","BZ","BT","CM","ER","GH","IQ","IL","JM","KI","LY","MM","KP","PG","PE","TT","TM","US","VE"]}</pre>

| Code| Meaning                         |
|-----|---------------------------------|
| VF  | Visa Free                       |
| VOA | Visa On Arrival (including ETA) |
| VR  | Visa Required                   |

## Future Work

This project will be maintained and improve over time.
