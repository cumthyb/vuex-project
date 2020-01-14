<template>
  <div id="app">
    <h1>小黄今年{{$store.state.age}}</h1> 
    <h1>小黄他爸今年{{$store.getters.myAge}}</h1> 
    
    
    <button @click="changeName">点我更改</button>
    <button @click="asyncChangeName">点我异步更改</button>
    
    </div>
</template>

<script>
export default {
  mounted() {
    console.log('$store',this.$store);
    setInterval(() => {
      this.$store.state.name=Date.now()
    }, 1000);
  },
  methods: {
    changeName(){
      this.$store.commit('syncAdd',10)
    },
    asyncChangeName(){
      this.$store.dispatch('asyncMinus',5)
    }
  },
};
</script>

