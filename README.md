# Passport Visa API

[![Build Status](https://travis-ci.com/nickypangers/passport-visa-api.svg?branch=master)](https://travis-ci.com/nickypangers/passport-visa-api)

This is an API for showing the visa requirements between two countries, based on: https://github.com/ilyankou/passport-index-dataset

The API retrieves data from [Passport Index](https://www.passportindex.org/) every day for the most up-to-date visa information.

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

<pre>{"passport":"HK","destination":"GB","dur":"180","status":"visa-free","category":"VF","last_updated":"Wed, 08 Sep 2021 17:37:25 GMT","error":{"status":false,"error":""}}</pre>

<!-- ### Get overall visa stats of a passport

Scenario: I want to see how many visa free countries Hong Kong passport has. The correct API call will be:

<pre>https<nolink>://passportvisa-api.herokuapp.com/api/HK</pre>

The return will be something like this:

<pre>{"Passport":"HK","VF":"112","VOA":"43","VR":"43"}</pre> -->

### Get list of countries sorted by visa requirements of a passport

Scenario: I want to see a list of countries sorted by visa requirements of United Arab Emirates passport. The correct API call will be:

<pre>https<nolink>://passportvisa-api.herokuapp.com/list/api/HK</pre>

The return will be something like this:

<pre>{"Passport":"HK","VF":["AL","AD","AG","AM","AT","BS","BB","BY","BE","BZ","BJ","BA","BW","BR","BG","CV","CO","HR","CU","CY","CZ","DM","DO","EC","EG","EE","FI","FR","DE","GD","GY","HT","IS","IR","IE","IT","KI","XK","LV","LS","LI","LT","LU","MO","MW","MT","MU","MX","MD","MC","MN","ME","MA","NA","NL","NI","NE","MK","NO","PS","PA","PE","PT","QA","RO","KN","LC","SM","RS","SK","SI","ZA","ES","VC","SR","SE","CH","TZ","TH","TT","TN","TR","UG","UA","GB","UY","UZ","VA","VE","YE","ZM","ZW"],"VOA":["AO","BH","BO","BF","CA","KM","CI","GN","GW","JO","KE","LB","MG","MV","MR","MZ","NG","OM","PW","RW","WS","SC","SO","LK","TL","TG","TO","TV","AE"],"VR":["AF","DZ","BT","BI","CF","TD","CN","CG","CD","CR","DJ","SV","GQ","ER","SZ","ET","GA","GM","GE","GH","GT","HN","IQ","JM","KG","LR","LY","ML","NR","KP","PK","PY","ST","SN","SL","SS","SD","SY","TJ","TM","US","VU"],"CB":["AR","AU","AZ","BD","BN","KH","CM","CL","DK","FJ","GR","HU","IN","ID","IL","JP","KZ","KW","LA","MY","MH","FM","MM","NP","NZ","PG","PH","PL","RU","SA","SG","SB","KR","TW","VN"],"NA":null,"last_updated":"Wed, 08 Sep 2021 17:32:30 GMT","error":{"status":false,"error":""}}</pre>

| Code | Definition                      |
| ---- | ------------------------------- |
| VF   | Visa Free                       |
| VOA  | Visa On Arrival (including ETA) |
| VR   | Visa Required                   |
| CB   | Covid Ban                       |
| NA   | No Admission                    |

## Future Work

This project will be maintained and improve over time. Feel free to contribute.
