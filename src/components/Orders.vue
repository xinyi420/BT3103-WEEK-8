<template>
<div>
    <ul id="ul" v-for="singleOrder in orders" v-bind:key="singleOrder">
        <ul v-for="(order, index) in singleOrder[1]" :key="index">
        <p>{{order.name}} : {{order.count}}</p>
        </ul>
        <button v-on:click="deleteItems($event)" v-bind:id="singleOrder[0]">Delete</button>
        <button v-on:click="route($event)" v-bind:id="singleOrder[0]">Modify</button>
    </ul>
</div>
</template>

<script>
import database from "../firebase.js"

  export default {
    data() {
        return {
            orders: []
        }
    },
    methods: {
        fetchItems: function(){
          database.collection('orders').get().then((querySnapShot)=>{
          var order = {}
          querySnapShot.docs.forEach(doc=>{
            order=doc.data()
            //order.show=true
            order.id=doc.id
            this.orders.push([doc.id, doc.data().items]) 
            })   })     
        },
        deleteItems: function(event) {
            let doc_id = event.target.getAttribute("id")
            console.log(doc_id)
            database.collection('orders').doc(doc_id).delete().then(() =>{
                var filteredOrdersList = this.orders.filter((itemf)=>itemf.id!==doc_id);
                console.log(filteredOrdersList)
                this.orders = filteredOrdersList; });
        },
        route: function(event) {
            let new_id = event.target.getAttribute("id");
            this.$router.push({ path: "/modify:update_id", name: "modify_page", params: {update_id: new_id} })
        }
    },
    created(){
      this.fetchItems()    
    },
  }
</script>

<style scoped>
#ul {
    width: 50%;
    border: 1px solid #222;
}
ul {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 1px;
  text-align: center;
  padding: 1px;
  margin: 1px;
}
button {
  text-align: center;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
