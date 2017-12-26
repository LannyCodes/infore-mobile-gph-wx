<template>
  <div>
    <div class="char-list-border" :style="charTop">
      <i class="fa fa-search" aria-hidden="true"></i>
      <ul
        class="char-list"
        ref="letterBar"
        @touchstart="e => touchStart(e)"
        @touchmove="e => touchMove(e)"
        @touchend="e => touchEnd(e)"
      >
        <li
          class="char-item"
          v-for="(char,index) in letters"
          :key="index"
        >
          <div :style="getLiStyle(char)">{{char}}</div>
        </li>
      </ul>
    </div>
    <div class="char-tip" v-show="isTouching">{{lastChar}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      letters: {
        type: Array,
        required: true,
        default: [],
      }
    },
    data() {
      return {
        isTouching: false,
        lastChar: '',
        liStyle: ''
      };
    },

    computed: {
      // 通过letterHeight来控制top
      boxClientTop: function () {
        console.log((document.body.clientHeight - ((this.letters.length) * 10 + (this.letters.length) * 10)) / 2);
        return (document.body.clientHeight - ((this.letters.length + 1) * 10 + (this.letters.length + 1) * 6)) / 2;
      },
      charTop: function () {
        const top = this.boxClientTop - 10;
        return `top:${top}px`
      },
    },
    methods: {
      getLiStyle(char) {
        if (this.lastChar === char) {
          return "background-color:#4379CE;color:white"
        } else {
          return ""
        }
      },
      touchStart(e) {
        e.preventDefault();
        this.isTouching = true;
        const char = this.getChar(e.touches[0].clientY);
        this.gotoChar(char);
      },
      touchMove(e) {
        e.preventDefault();
        const char = this.getChar(e.touches[0].clientY);
        this.gotoChar(char);
      },
      touchEnd(e) {
        e.preventDefault();
        this.isTouching = false;
      },
      getChar(clientY) {
        const charHeight = this.$refs.letterBar.offsetHeight / this.letters.length;
        const index = Math.floor((clientY - this.boxClientTop) / charHeight);
        return this.letters[index];
      },
      gotoChar(char) {
        if (char === undefined || char === this.lastChar) {
          return false;
        }
        this.lastChar = char;
        this.$emit('onCurrentLetter', this.lastChar)
      }
    }
  }
</script>

<style lang="less" scoped>
  .char-list-border {
    color:#666;
    font-size: 10px;
    padding: 3px 0 3px 0;
    background-color: #F7F8FA;
    border-radius: 25px;
    border: 1px solid #E3E4E5;
    position: fixed;
    right: 5px;
    width: 20px;
    margin: 0;
    box-sizing: border-box;
    text-align: center;
  }

  .char-list {
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    box-sizing: border-box;
  }

  .char-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      text-align: center;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 16px;
      height: 16px;
    }
  }

  .char-tip {
    position: fixed;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background-color: gray;
    border-radius: 6px;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
  }
</style>
