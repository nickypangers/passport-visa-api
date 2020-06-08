# Passport Visa API

This is an API for showing the visa requirements between two countries. The data is provided by this: https://github.com/ilyankou/passport-index-dataset

## Instructions

To GET the visa requirement API, <pre>https<nolink>://passportvisa-api.herokuapp.com/api/{passport country}/{destination country}</pre>

To GET the visa stats VPI, <pre>https<nolink>://passportvisa-api.herokuapp.com/api/{passport country}</pre>

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

| Code| Meaning                         |
|-----|---------------------------------|
| VF  | Visa Free                       |
| VOA | Visa On Arrival (including ETA) |
| VR  | Visa Required                   |

## Future Work

Features to be added:
- Read csv directly online.
