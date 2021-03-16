<template>
<div>
    <ul v-for="(order, index) in datapacket[0]" :key="index">
        <p>{{order.name}} : {{order.count}}</p>
        <input id=index placeholder=0 type="number" min=0 v-model=order.count>
    </ul>
    <button v-on:click="updateOrders()">Update Order</button> 
</div>
</template>

<script>
import database from "../firebase.js"

  export default {
    props: ["update_id"],
    data() {
        return {
            datapacket: [],
        }
    },
    methods: {
        fetchItems: function(){
          database.collection('orders').get(this.update_id).then((querySnapShot)=>{
          var order = {}
          querySnapShot.docs.forEach(doc=>{
            order=doc.data()
            //order.show=true
            order.id=doc.id
            this.datapacket.push(doc.data().items) 
            })   })     
        },
        updateOrders: function() {
            //this.newCount.push({count:""});
            //var datacopy = this.datapacket;
            for (let i = 0; i < this.datapacket[0].length; i++) {
                var currentOrder = this.datapacket[0][i];
                currentOrder.count = Number.parseInt(currentOrder.count, 10)
            }
            var updated_orders = {
                "items" : this.datapacket[0]
            }
            console.log(this.datapacket)
            database.collection('orders').doc(this.update_id).set(updated_orders).then(() => this.$router.push("orders"))
        }
    },
    created(){
      this.fetchItems()    
    },
  }
</script>

<style>
</style>
