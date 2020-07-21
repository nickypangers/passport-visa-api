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

Scenario: I want to see a list of countries sorted by visa requirements of Hong Kong passport. The correct API call will be:

<pre>https<nolink>://passportvisa-api.herokuapp.com/list/api/HK</pre>

The return will be something like this:

<pre>{"VF":"[AL,AD,AG,AR,AM,AT,BS,BB,BY,BE,BZ,BJ,BA,BW,BR,BN,BG,CV,CL,CO,HR,CY,CZ,DK,DM,DO,EC,EG,EE,FJ,FI,FR,DE,GR,GD,GY,HT,HU,IS,ID,IR,IE,IL,IT,JM,JP,KZ,KI,XK,LV,LS,LI,LT,LU,MO,MW,MY,MT,MU,MX,FM,MD,MC,MN,ME,MA,MM,NA,NL,NI,NE,MK,NO,PS,PA,PE,PH,PL,PT,QA,RO,RU,KN,LC,SM,RS,SG,SK,SI,KR,ES,VC,SR,SE,CH,TZ,TH,TT,TN,TR,UG,UA,AE,GB,UY,UZ,VU,VA,VE,YE,ZM,ZW]","VOA":"[AU,AZ,BH,BO,BF,KH,CA,KM,CI,CU,DJ,ET,GA,GN,GW,IN,JO,KE,KW,LA,LB,MG,MV,MR,MZ,NP,NZ,NG,OM,PW,PG,RW,WS,SA,SC,SO,LK,TW,TL,TG,TO,TV,VN]","VR":"[AF,DZ,AO,BD,BT,BI,CM,CF,TD,CN,CG,CD,CR,SV,GQ,ER,SZ,GM,GE,GH,GT,HN,IQ,KG,LR,LY,ML,MH,NR,KP,PK,PY,ST,SN,SL,SB,ZA,SS,SD,SY,TJ,TM,US]"}</pre>

| Code| Meaning                         |
|-----|---------------------------------|
| VF  | Visa Free                       |
| VOA | Visa On Arrival (including ETA) |
| VR  | Visa Required                   |

## Future Work

This project will be maintained and improve over time.
