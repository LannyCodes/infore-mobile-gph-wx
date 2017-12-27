<template>
  <!--<transition name="fade">-->
    <div class="overlay" @click="$emit('clickBigImg')">
      <img :src="imgSrc" class="big-img"/>
    </div>
  <!--</transition>-->

</template>
<script>
  export default{
    props: [
      'imgSrc'
    ],
    methods: {}
  }
</script>
<style lang="less" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s linear;
    transform: translate3D(0, 0, 0);
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3D(100%, 0, 0);
  }

  .overlay {
    /*justify-content: center;*/
    /*align-items: center;*/
    background-color: #000000;
    opacity: 2;
    position: fixed;
    z-index: 999;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

  }

  .big-img {
    position: absolute;
    z-index: 1000;
    left: 0;
    right: 0;
    margin: auto;
    display: block;
    max-width: 100%;
  }
</style>
