<template>
  <transition name="actionsheet-float">
    <div v-show="currentValue" class="mint-actionsheet">
      <ul class="mint-actionsheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
        <li class="mint-actionsheet-listitem sheet-title">{{actions[0]?actions[0].title:''}}</li>
        <li v-for="( item, index ) in actions" class="mint-actionsheet-listitem" @click.stop="itemClick(item, index)">
          <i class="icon iconfont" :class="item.icon" :style="{color: item.iconColor}"></i>
          <span class="item-class">{{ item.name }}</span>
        </li>
      </ul>
      <a class="mint-actionsheet-button" @click.stop="currentValue = false" v-if="cancelText">{{ cancelText }}</a>
    </div>
  </transition>
</template>

<style>
  @component-namespace mint {
    @component actionsheet {
      position: fixed;
      background: #e0e0e0;
      width: 100%;
      text-align: left;
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      backface-visibility: hidden;
      transition: transform .3s ease-out;

      @descendent list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      @descendent listitem {
        border-bottom: solid 1px #e0e0e0;
      }

      @descendent listitem, button {
        display: block;
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        color: #333;
        background-color: #fff;
        &:active {
           background-color: #f0f0f0;
        }
      }
    }
  }

  .actionsheet-float-enter,
  .actionsheet-float-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
/* 以下为自己添加的样式 */
.mint-actionsheet ul{
  text-align: left;
}
.mint-actionsheet-listitem .item-class {
  font-size: 15px;
}
.mint-actionsheet-listitem.sheet-title {
  font-size: 13px;
}
.mint-actionsheet-listitem, .mint-actionsheet-button {
  padding-left: 10px;
}
.iconfont.icon {
  color: #26a2ff;
  font-size: 18px;
  margin-right: 10px;
}
</style>

<script type="text/babel">
  import Popup from 'mint-ui/src/utils/popup';
  import 'mint-ui/src/style/popup.css';

  export default {
    name: 'mt-actionsheet',

    mixins: [Popup],

    props: {
      modal: {
        default: true
      },

      modalFade: {
        default: false
      },

      lockScroll: {
        default: false
      },

      closeOnClickModal: {
        default: true
      },

      cancelText: {
        type: String,
        default: '取消'
      },

      actions: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        currentValue: false
      };
    },

    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },

      value(val) {
        this.currentValue = val;
      }
    },

    methods: {
      itemClick(item, index) {
        if (item.method && typeof item.method === 'function') {
          item.method(item, index);
        }
        this.currentValue = false;
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.open();
      }
    }
  };
</script>
