const fs = require('fs')
const csv = require('csvtojson')
const request = require('request')

function transformData (data) {
    return data.reduce((output, row) => {
        const country = row['Country/Region'] + (row['Province/State'] && ' - ' + row['Province/State'])

        output[country] = {
            header: [],
            data: []
        }
        // console.log(Object.keys(row))
        for (let key of Object.keys(row)) {
            if (['Province/State', 'Country/Region', 'Lat', 'Long'].includes(key) === false) {
                output[country].header.push(key)
                output[country].data.push(row[key])
            }
        }
        return output
    }, {})
}

async function createFile (name) {
    const csvFilePath= `./data/time_series_covid_19_${name}.csv`
    const data = await csv().fromFile(csvFilePath)

    const transformedData = transformData(data)

    const countries = Object.keys(transformedData)
    fs.writeFileSync(`./public/countries.json`, JSON.stringify(countries), 'utf8')

    const json = JSON.stringify(transformedData)
    fs.writeFileSync(`./public/${name}.json`, json, 'utf8')
}

async function makeData() {
    const files =  [
        'confirmed',
        'deaths',
        'recovered'
    ]

    for (let file of files) {
        await createFile(file)
    }
}

makeData()
