import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "number of dishes",
                backgroundColor: ["blue", "purple", "green", "yellow", "red", "orange"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            scales: {
                yAxes: [{ 
                  ticks: {
                      min: 0
                  }
                }]
              },  
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },

  methods: {
    getTotalCount: function() {
        const chartData = {}
        database.collection('orders').get().then(querySnapShot => {
            querySnapShot.forEach(doc => { 
                var items = doc.data().items;
                for (let i = 0; i < Object.keys(items).length; i++) {
                    if (items[i].name in chartData) {
                        chartData[items[i].name] += items[i].count;
                    } else {
                        chartData[items[i].name] = items[i].count;
                    }
                }
            })
            var keys = Object.keys(chartData)
            //console.log(keys)
            for(var j=0; j<keys.length;j++){
                var value = chartData[keys[j]];
                //console.log(keys[j], value);
                this.datacollection.labels.push(keys[j]);
                this.datacollection.datasets[0].data.push(value);
            }
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.getTotalCount();
    //console.log(this.chartData)
    //console.log(this.chartData["Mapo Tofu"])
    //console.log(this.chartData);
    //this.fetchItems();
  }
}