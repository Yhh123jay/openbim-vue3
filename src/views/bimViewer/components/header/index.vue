<!-- header 页面切换组件-->
<template>
    <div class="header">
        <div class="titleName">BIM模型展示</div>
        <div
            class="linkItem"
            :class="{
                linkItemActive: item.path == PagePath,
                MenuActive: item.path == PagePath
            }"
            v-for="item in linkList"
            :key="item.id"
            @click="handleLinkClick(item)"
        >
<!--          <div class="LinkIcon">-->
<!--            <img :src="item.active" alt="" v-if="item.path == PagePath" />-->
<!--            <img :src="item.icon" alt="" v-else />-->
<!--          </div>-->
            <div class="point"></div>
            <div class="linkName">{{ item.linkName }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const Router = useRouter()

const url = ref(window.location.pathname)
const linkList: any = ref([
    {
        id: 1,
        linkName: '首页',
        active: '/assets/images/link/menu3_游客分析2.png',
        icon: '/assets/images/link/menu3_游客分析@2x.png',
        path: '/home'
    },
    {
        id: 2,
        linkName: '总体概况',
        active: '/assets/images/link/menu3_游客分析2.png',
        icon: '/assets/images/link/menu3_游客分析@2x.png',
        path: '/bimViewer/viewer1'
    },
    {
        id: 3,
        linkName: '施工阶段',
        active: '/assets/images/link/menu3_游客分析2.png',
        icon: '/assets/images/link/menu3_游客分析@2x.png',
        path: '/bimViewer/viewer2'
    },
    {
        id: 4,
        linkName: '养护阶段',
        active: '/assets/images/link/menu3_游客分析2.png',
        icon: '/assets/images/link/menu3_游客分析@2x.png',
        path: '/bimViewer/viewer3'
    }
])
//从localStorage中获取当前页面的路径，如果没有则默认为首页
const pathValue = localStorage.getItem('pathName') ? localStorage.getItem('pathName') : '/home'
const PagePath = ref(pathValue)
const handleLinkClick = (item: typeof linkList.value[0]) => {
    url.value = item.path
    Router.push({
        path: item.path
    })
    PagePath.value = item.path
    localStorage.setItem('pathName', PagePath.value as string)
}

</script>
<style lang="scss" scoped>
.header {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    @include Width(1920);
    @include wHeight(80);
    background: url('@/assets/images/watershed/top_bg@2x.png') no-repeat center/cover;
  //设置透明度
    opacity: 1;
    top: 0;
    left: 0;
    @include FontSize(12);
    z-index: 10;
    pointer-events: none;
    .titleName {
        cursor: pointer;
        position: absolute;
        top: 0;
        @include Left(20);
        @include wHeight(80);
        @include FontSize(28);
        @include LetterSpacing(0.8);
        font-weight: bold;
        display: flex;
        align-items: center;
        background: linear-gradient(to bottom, #c5f1ff, #3b78ff);
        color: transparent;
        -webkit-background-clip: text;
    }
    .linkItem {
        display: flex;
        z-index: 9999;
        align-items: center;
        justify-content: center;
        pointer-events: fill;
        @include MarginLeft(20);
        .point {
            @include Width(8);
            @include wHeight(8);
            border-radius: 50%;
            background-color: #fff;
        }
        .linkName {
            overflow: hidden;
            // @include MarginTop(5);
            text-align: center;
            font-family: HYb3gj;
            @include FontSize(22);
            //color: #fff;
            color: #ffffff;
            display: flex;
            align-items: center;
            cursor: pointer;
            @include MarginLeft(10);
        }

        transition: all 0.3s;
    }

    .linkItemActive {
        .point {
            // background-color: #86cdff;
        }
        .linkName {
            // color: #86cdff;
        }
        @include FontSize(28);
        transform: scale(1.2) translateY(-9%);
    }
}

.MenuActive {
    @include Padding(0, 0, 8, 0);
    @include BorderBottom(3, solid, #c5f1ff);
}
</style>
