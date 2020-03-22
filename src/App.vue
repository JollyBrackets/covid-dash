<template>
  <div id="app">
    <p>Pick a country</p>
    <select v-model="country">
      <option
        v-for="country in countries"
        :value="country"
        :key="country"
        v-html="country"
      />
    </select>

    <p>Confirmed</p>
    <apexchart :height="300" type="line" :options="confirmed.options" :series="confirmed.series"></apexchart>
    <p>Recovered</p>
    <apexchart :height="300" type="line" :options="recovered.options" :series="recovered.series"></apexchart>
    <p>Deaths</p>
    <apexchart :height="300" type="line" :options="deaths.options" :series="deaths.series"></apexchart>
  </div>
</template>

<script>
import countries from '../public/countries.json'
import confirmed from '../public/confirmed.json'
import deaths from '../public/deaths.json'
import recovered from '../public/recovered.json'

const rawData = {
  confirmed,
  deaths,
  recovered
}

export default {
  name: 'App',
  data () {
    return {
      country: 'Switzerland',
      countries
    }
  },
  methods: {
    constructChartData (name) {
      return {
        options: {
          xaxis: {
           categories: rawData[name][this.country]['header']
         }
        },
        series: [{
          name: this.country,
          data: rawData[name][this.country]['data']
        }]
      }
    }
  },
  computed: {
    confirmed () {
      return this.constructChartData('confirmed')
    },
    deaths () {
      return this.constructChartData('deaths')
    },
    recovered () {
      return this.constructChartData('recovered')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
