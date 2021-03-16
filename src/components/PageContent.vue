<template>
<div>
  <ul style="width: 70%; float: left" id="itemsList">
    <li id="olist" v-for="(item, index) in items" :key="index">
        <p id="itemName">{{item.name}}</p><br>
        <img v-bind:src="item.imageURL"><br>
        <p id="price"> Price: ${{item.price}} </p>
        <qtCounter v-bind:item = "item" v-on:counter="onCounter"></qtCounter>
    </li>
  </ul>
  <basket v-bind:itemsSelected = "itemsSelected" style="width: 30%; float: left" id="ShoppingBasket"></basket>
</div>
</template>

<script>
import Vue from 'vue'
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'

Vue.component('qtCounter', QuantityCounter)

  export default {
    components: {
        qtCounter: QuantityCounter,
        basket: Basket,
    },
    data() {
        return {
            itemsSelected: [],
            items: []
        }
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
             } else {
                // Loop through everything to check what is not in the basket
                var triggered = false
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name == item.name && count > 0) {
                      curr_item[1] = count;
                      //this.itemsSelected[i][2] = curr_item[2]
                      triggered = true
                      console.log(this.itemsSelected)
                    } else if  (item_name == item.name && count == 0) {
                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                      this.itemsSelected.splice(i, 1)
                    } else if (triggered == false && i == this.itemsSelected.length - 1) {
                    // Only Trigger when ALL ITEM NAME DOESNT MATCH
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                      this.itemsSelected.push([item.name, count, item.price]);
                    }
                }
             }
        },
        fetchItems: function(){
          database.collection('menu').get().then((querySnapShot)=>{
          let item={}
          querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=true
            item.id=doc.id
            this.items.push(item) 
            })   })     
        },
    },
    created(){
      this.fetchItems()    
    }
  }
</script>

<style>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

#olist {
  flex-grow: 1;
  flex-basis: 250px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
