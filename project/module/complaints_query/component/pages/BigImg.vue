<template>
  <!--<transition name="fade">-->
  <div class="overlay-style" @click="$emit('clickBigImg')" >
    <slot></slot>
  </div>
  <!--</transition>-->

</template>
<script>
  export default{
    props: [
//      'imgSrc'
    ],
  }
</script>
<style lang="less" scoped>
  .fade-enter-active {
    transition: all 0.3s ease;
    opacity: 1;
  }

  .fade-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
    /*transform: translate3D(0, 0, 0);*/
    /*transform: scale(1);*/
  }

  .fade-enter-to {
    -webkit-transform: scale3D(100%, 100%, 100%);
    -moz-transform: scale3D(100%, 100%, 100%);
    -ms-transform: scale3D(100%, 100%, 100%);
    -o-transform: scale3D(100%, 100%, 100%);
    transform: scale3D(100%, 100%, 100%);
  }

  .fade-enter {
    opacity: 0;
    -webkit-transform: scale3D(0, 0, 0);
    -moz-transform: scale3D(0, 0, 0);
    -ms-transform: scale3D(0, 0, 0);
    -o-transform: scale3D(0, 0, 0);
    transform: scale3D(0, 0, 0);
  }

  .fade-leave-active {
    transform: scale3D(0, 0, 0);
  }

  .fade-leave-to {
    -webkit-transform: scale3D(0, 0, 0);
    -moz-transform: scale3D(0, 0, 0);
    -ms-transform: scale3D(0, 0, 0);
    -o-transform: scale3D(0, 0, 0);
    transform: scale3D(0, 0, 0);
  }

  @-webkit-keyframes enter {
    0% {
      -webkit-transform: scale3D(0, 0, 0);
      -moz-transform: scale3D(0, 0, 0);
      -ms-transform: scale3D(0, 0, 0);
      -o-transform: scale3D(0, 0, 0);
      transform: scale3D(0, 0, 0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      -webkit-transform: scale3D(100%, 100%, 100%);
      -moz-transform: scale3D(100%, 100%, 100%);
      -ms-transform: scale3D(100%, 100%, 100%);
      -o-transform: scale3D(100%, 100%, 100%);
      transform: scale3D(100%, 100%, 100%);
    }
  }

  @-moz-keyframes enter {
    0% {
      -webkit-transform: scale3D(0, 0, 0);
      -moz-transform: scale3D(0, 0, 0);
      -ms-transform: scale3D(0, 0, 0);
      -o-transform: scale3D(0, 0, 0);
      transform: scale3D(0, 0, 0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      -webkit-transform: scale3D(100%, 100%, 100%);
      -moz-transform: scale3D(100%, 100%, 100%);
      -ms-transform: scale3D(100%, 100%, 100%);
      -o-transform: scale3D(100%, 100%, 100%);
      transform: scale3D(100%, 100%, 100%);
    }
  }

  @-ms-keyframes enter {
    0% {
      -webkit-transform: scale3D(0, 0, 0);
      -moz-transform: scale3D(0, 0, 0);
      -ms-transform: scale3D(0, 0, 0);
      -o-transform: scale3D(0, 0, 0);
      transform: scale3D(0, 0, 0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      -webkit-transform: scale3D(100%, 100%, 100%);
      -moz-transform: scale3D(100%, 100%, 100%);
      -ms-transform: scale3D(100%, 100%, 100%);
      -o-transform: scale3D(100%, 100%, 100%);
      transform: scale3D(100%, 100%, 100%);
    }
  }

  @-o-keyframes enter {
    0% {
      -webkit-transform: scale3D(0, 0, 0);
      -moz-transform: scale3D(0, 0, 0);
      -ms-transform: scale3D(0, 0, 0);
      -o-transform: scale3D(0, 0, 0);
      transform: scale3D(0, 0, 0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      -webkit-transform: scale3D(100%, 100%, 100%);
      -moz-transform: scale3D(100%, 100%, 100%);
      -ms-transform: scale3D(100%, 100%, 100%);
      -o-transform: scale3D(100%, 100%, 100%);
      transform: scale3D(100%, 100%, 100%);
    }
  }

  @keyframes enter {
    0% {
      -webkit-transform: scale3D(0, 0, 0);
      -moz-transform: scale3D(0, 0, 0);
      -ms-transform: scale3D(0, 0, 0);
      -o-transform: scale3D(0, 0, 0);
      transform: scale3D(0, 0, 0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      -webkit-transform: scale3D(100%, 100%, 100%);
      -moz-transform: scale3D(100%, 100%, 100%);
      -ms-transform: scale3D(100%, 100%, 100%);
      -o-transform: scale3D(100%, 100%, 100%);
      transform: scale3D(100%, 100%, 100%);
    }
  }

  .overlay-style {
    -moz-animation: enter 0.3s ease;
    -webkit-animation: enter 0.3s ease;
    -o-animation: enter 0.3s ease;
    animation: enter 0.4s ease;
    display: flex;
    align-items: center;
    background-color: #000000;
    position: fixed;
    z-index: 999;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
