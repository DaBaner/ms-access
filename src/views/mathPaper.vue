<template>
  <div class="mathPaper">
    <van-nav-bar
    title="目录"
    left-arrow
    @click-left="onClickLeft"
    class="lkHeader">
    </van-nav-bar>

    <div class="content">
      <div class="content-son">
        <p>数学 北师大版</p>
        <br>
        <p>商品价格：¥ 32</p>
        <br>
        <p>商品原价：¥ 32</p>
        <br>
        <p>订阅须知：</p>
        <br>
        <p>本公司提供的小学语文、数学、英语报纸均为四开四版彩色周报，每学期20期报纸（26元）+4张月考试卷（6元），合计32元/套，订阅成功后将按照每4期为一次，共分六次配送，订阅时请注意以下几点：</p>
        <br>
        <p>一、 订阅时间，以学期为单位分为两个时间段：</p>
        <br>
        <p>1、 期末预定：每学期期末预订下学期报纸，预订的报纸按以下时间配送。（第一周配送1-4期，后5次将每隔三周左右配送一次.）</p>
        <br>
        <p>2、 开学前后订阅：每学期开学前一周和开学后的第一个月内订阅，报纸配送的时间为订阅成功后一周左右配送1-4期的报纸，后续报纸均与预订报纸配送的时间一致。</p>
        <br>
        <p>二、配送方式：班级集体订阅报纸，本公司直接配送到学校，更好的方便学生与教学同步使用报纸（免收配送费费）。</p>
        <br>
        <p>客服电话：15819859838</p>
        <br>
        <img src="../assets/math/m1.jpg" class="imgg">
        <img src="../assets/math/m2.jpg" class="imgg">
        <img src="../assets/math/m3.jpg" class="imgg">
        <img src="../assets/math/m4.jpg" class="imgg">
        <img src="../assets/math/m5.jpg" class="imgg">
        <img src="../assets/math/m6.jpg" class="imgg">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mathPaper",
  data() {
    return {

    };
  },
  methods: {
    onClickLeft(){
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.lkHeader{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.content{
  position: relative;
  top: 3.6rem;
  width: 93%;
  margin: 0 auto;
  background-color: white;
}
.content-son{
  width: 80vw;
  margin: 0 auto;
  padding-top: 0.5rem;
}
.imgg{
  width: 100%;
}
</style>