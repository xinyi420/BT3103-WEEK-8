<template>
<div>
<h2> Item Selected </h2>
<ul>
    <li v-for="item in itemsSelected" v-bind:key="item">
        <p>{{item[0]}} x {{item[1]}}</p>
    </li>
</ul>
<button v-on:click="findTotal()" v-on:click.prevent="sendOrder()">Calculate Total</button>
    <div>
    <p v-show="bought">Subtotal: ${{this.total}}</p>
    </div>
    <div>
    <p v-show="bought">Grand Total: ${{this.grand_total_fixed}}</p>
    </div>
</div>
</template>

<script>
import database from '../firebase.js'

  export default {
    props: ['itemsSelected'],
    data() {
      return {
        total: 0,
        grand_total: 0,
        grand_total_fixed: 0,
        bought: false
      }
    },
    methods: {
        findTotal:function(){
            this.bought = true
            this.total = 0
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.total += this.itemsSelected[i][2] * this.itemsSelected[i][1]
            }
            this.grand_total = this.total * 1.07
            this.grand_total_fixed = this.grand_total.toFixed(2)
        },

        sendOrder:function(){
          var orders = this.itemsSelected.map(function(x) { 
            return { 
            name: x[0], 
            count: x[1],
            price: x[2]
            }; 
          })
          var list_orders = {
            "items" : orders
          };
          database.collection('orders').add(list_orders).then(() => location.reload());
       },
    }
  }
    
</script>

<style> </style>
