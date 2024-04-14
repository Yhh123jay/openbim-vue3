<!-- TopRight -->
<template>
  <div class="TopRight">
    <div class="header-right" >
      <div class="tool">
      <div>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="UI显隐"
          placement="bottom"
        >
          <el-button :icon="Search" size="large" circle />
        </el-tooltip>
      </div>
        <div>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="图层树"
            placement="bottom"
          >
            <el-button :icon="Search" size="large" circle />
          </el-tooltip>
        </div>
        <div>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="导览"
            placement="bottom"
          >
            <el-button :icon="Search" size="large" circle />
          </el-tooltip>
        </div>
        <div>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="气象"
            placement="bottom"
          >
            <el-button :icon="Search" size="large" circle />
          </el-tooltip>
        </div>
      </div>
      <div class="time">
        <span>
          {{ time }}
        </span>
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { onMounted, onUnmounted, ref } from 'vue'

// 获取当前时间
const date: any = ref("");
const time: any = ref("");
const get_Date_Time = () => {
  let date_time = dayjs().format("YYYY-MM-DD/HH:mm:ss").split("/");
  date.value = date_time[0];
  time.value = date_time[1];
};
let timer = ref();
onMounted(async () => {
  get_Date_Time();

  timer.value = setInterval(() => {
    get_Date_Time();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer.value);
});

</script>
<style lang="scss" scoped>
.el-button {
  background-color: transparent;
}

.TopRight {
  position: relative;
  display: flex;
  width: 100%;
  @include wHeight(80);
  top: 0;
  left: 0;
  @include FontSize(12);
  z-index: 99999;
  pointer-events: none;

  // background-image: url("~@/assets/images/headerTitle/top_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  .header-logoClick {
    position: absolute;
    top: 8px;
    left: 20px;
    cursor: pointer;
    @include Width(110);
    @include wHeight(43);
    pointer-events: auto;
  }
  .TopRight-left {
    @include FontSize(14);
    // @include wHeight(40);
    //height: 100%;
    @include Width(370);
    @include wHeight(76);
    position: absolute;
    z-index: 10;
    @include Left(0);
    @include Top(0);
    z-index: 100;
    display: flex;
    //background: url('~@/assets/images/基础/top_left @2x.png') no-repeat;
    background-size: 100% 100%;
    @include PaddingLeft(28);
    @include PaddingTop(12.56);
    display: none;

    .box {
      @include MarginRight(36.49);
    }
  }

  .TopRight-right {
    @include FontSize(14);

    @include Width(370);
    @include wHeight(76);
    position: absolute;
    z-index: 10;
    @include Right(0);
    @include Top(0);
    z-index: 100;
    display: flex;

    justify-content: flex-end;
    align-items: center;
    //background: url('~@/assets/images/基础/top_right@2x.png') no-repeat;
    //background-size: 100% 100%;
    pointer-events: auto;
  }

  .title {
    @include Width(305);
    @include wHeight(52);
    position: absolute;
    @include Left(25);
    right: 0;
    @include Top(3);
    //margin: auto;
    background: url("@/assets/images/基础/top_logo@2x.png") no-repeat;
    background-size: 100% 100%;
  }

  .logo {
    @include Width(400);
    @include wHeight(46);
    @include LineHeight(46);
    text-align: center;
    // background-size: 100% 100%;
    position: absolute;
    // @include Left(350);
    @include Left(0);
    right: 0;
    top: 0;
    // background: #000;
    margin: auto;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    // @include PaddingTop(12);
    cursor: pointer;
    z-index: 100;

    .tit {
      @include FontSize(24);
      @include LetterSpacing(3);
      @include wHeight(40);
      font-family: Oppo, serif;

      @include MarginBottom(5);
      font-weight: 600;
      //text-shadow: 0 0 5px #98deff;
    }

    .titeng {
      @include FontSize(14);
    }
  }

  .tool {
    position: absolute;
    @include wHeight(70);
    top: 0;
    z-index: 10;
    //@include Right(35);
    @include Left(-50);
    width: 80%;
    @include Top(0);
    font-family: fangsong, serif;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @include FontSize(20);
    cursor: pointer;

    img {
      @include Width(48);
      @include wHeight(48);
      transition: transform 0.3s;
    }

    img:hover {
      transform: scale(1.2);
    }
  }

  .time {
    position: absolute;
    @include wHeight(55);
    @include Top(0);

    @include Right(10);
    @include FontSize(16);
    font-family: SJyunhei, serif;
    //字体颜色
    color: #faad14;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    @include Padding(20, 0, 20, 0);

    span:nth-of-type(1) {
      display: inline-block;
      @include MarginRight(10);
    }
  }

  .link {
    position: absolute;
    @include wHeight(75);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @include Right(20);
    z-index: 100;
    top: 0;

    img {
      @include Width(54);
      transition: transform 0.3s;

      &:hover {
        transform: scale(2.5);
        transform-origin: 100% 0;
      }

      // margin-right: 3px;
      @include MarginRight(3);
    }
  }

  .rightbg {
    position: absolute;
    right: 0;
    @include Width(400);
    height: 100%;
    background: linear-gradient(
      to left,
      #000000d8 0%,
      #000000b6 20%,
      #00000098 40%,
      #00000077 60%,
      #00000054 80%,
      #00000000 100%
    );
  }

  .header-right {
    @include FontSize(14);

    @include Width(250);
    @include wHeight(70);
    position: absolute;
    @include Right(0);
    @include Top(0);
    z-index: 100000;
    display: flex;
    pointer-events: auto;
    justify-content: flex-end;
    align-items: center;
    //background: url('~@/assets/images/基础/top_right@2x.png') no-repeat;
    //background-size: 100% 100%;
  }
}

.choose {
  display: flex;
  width: 230px;
  height: 60px;
  margin: auto;
  border-bottom: 1px solid rgba(237, 249, 255, 0.2);
  justify-content: space-around;

  .el-button {
    margin-top: 10px;
    @include Width(40);
    @include wHeight(30);
    @include LineHeight(30);
    @include Padding(5, 0, 0, 0);
    text-align: center;
    background-color: transparent;

    .svg-icon {
      @include Width(25);
      @include wHeight(25);
      vertical-align: center;
      fill: currentColor;
      overflow: hidden;
      color: #fff;
      // cursor: pointer;
    }
  }

  .active {
    .svg-icon {
      color: #7afafe;
    }
  }
}

.content {
  width: 230px;
  height: 120px;
  margin: auto;
  border-bottom: 1px solid rgba(237, 249, 255, 0.2);
  overflow: auto;
}

.clear {
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #7afafe;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
</style>
