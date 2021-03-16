<template>
  <div>
    <button v-on:click="decrement()">-</button>
    <span style="font-size: 20px">{{counter}}</span>
    <button v-on:click="increment()">+</button>
  </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
      return {
        counter: 0,
      }
    },
    methods: {
      increment:function(){
        if (this.counter == 10) {
          alert("You cannot buy more than 10 items")
        } else {
          this.counter += 1
        }
        this.$emit('counter', this.item, this.counter)
      },
      decrement:function(){
        if (this.counter > 0) {
          this.counter -= 1
        }
        this.$emit('counter', this.item, this.counter)
      }
    }
}

</script>

<style>
button {
  background-color: orange;
  border: none;
  color: white;
  padding: 15px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;;
}

button:hover {
  background-color: red;
  color: white;
}
</style>