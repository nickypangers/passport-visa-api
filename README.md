# Passport Visa API

This is an API for showing the visa requirements between two countries. The data is provided by this: https://github.com/ilyankou/passport-index-dataset

## Instructions

To call the API, <pre>https<nolink>://passportvisa-api.herokuapp.com/api/{passport country}/{destination country}</pre>

where the passport country and destination country are in ISO 2 Country code format. To see all the ISO 2 Country codes, visit [here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

For the explanation of the Code result, please see

https://github.com/ilyankou/passport-index-dataset (see Dataset Values section)

## Example

Scenario: I want to get the visa requirement of a Hong Kong passport to United Kingdom. The correct API call will be:

<pre>https<nolink>://passportvisa-api.herokuapp.com/api/HK/GB</pre>

The return will be something like this:

<pre>{"Passport":"HK","Destination":"GB","Code":"180"}</pre>

## Future Work

Features to be added:

- Get number of visa-free, visa on arrival, visa required destinations for the requested country.
