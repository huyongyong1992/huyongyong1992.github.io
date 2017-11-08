<template>
  <div class="homePage">
    {{msg}}
  </div>
</template>

<script>
  import { getMovieList } from '../service/getData'
  export default {
    data() {
      return {
        msg:'haha'
      }
    },
    created() {
      getMovieList().then(data => {
        console.log(data)
      })
    },
    methods:{

    }
  }
</script>

<style lang="scss">
  .homePage{
    color:#000;
  }
</style>
