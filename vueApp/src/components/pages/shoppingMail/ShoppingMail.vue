<template>
    <div class="home">
        <div class="search-bar">
            <van-row>
                <van-col span="3"><img src="../../../assets/images/home/location.png" alt="定位logo" class="location-img"></van-col>
                <van-col span="16">
                    <input type="text" class="search-input" placeholder="请输入搜索内容">
                </van-col>
                <van-col span="5"><van-button size="mini" class="search-btn">搜索</van-button></van-col>
            </van-row>
        </div>
        <!-- swipe area -->
        <div class="swipe-area">
            <van-swipe :autoplay="3000" class="swipe-box">
                <van-swipe-item><img src="../../../assets/images/home/swipe-1.jpg" alt=""></van-swipe-item>
                <van-swipe-item><img src="../../../assets/images/home/swipe-2.jpg" alt=""></van-swipe-item>
                <van-swipe-item><img src="../../../assets/images/home/swipe-3.jpg" alt=""></van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
// vant是24列栅格布局
export default {
}
</script>

<style scoped lang="less">
    .home {
        .search-bar {
            height: 2.2rem;
            line-height: 2.2rem;
            background-color: #e5017d;
            overflow: hidden;
            .location-img {
                display: inline-block;
                height: 1.2rem;
                margin: 0.5rem;
            }
            .search-input {
                background-color: #e5017d;
                width: 100%;
                border: none;
                border-bottom: 1px solid #fff;
                height: 1.5rem;
            }
            .search-btn {
                margin: 0.5rem;
            }
        }
        .swipe-area {
            padding: 0;
            position: relative;
            max-height: 20rem;
            .swipe-box {
                width: 100%;
                height: 10rem;
                display: inline-block;
                img {
                    display: inline-block;
                    width: 100%;
                }
            }
        }
    }
</style>
