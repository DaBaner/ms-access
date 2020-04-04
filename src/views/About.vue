<template>
  <div class="about">
    <van-nav-bar
    title="目录"
    left-arrow
    @click-left="onClickLeft"
    class="liHeader">
    </van-nav-bar>
     <van-cell :title="item.title" is-link v-for="(item ,i) in menuList" :label="item.label" :key="i" center @click="goDetails(item.id)"></van-cell>
  </div>
</template>
<script>
  export default {
    name: "About",
    data(){
      return{
      menuList: [
        {title: " 语文学习报+ 试卷",label :'【人教版】每学期20期彩色周报及4张单元试卷',id:'1'},
        {title: " 数学学习报+ 试卷",label :'【北师大版】每学期20期彩色周报及4张单元试卷',id:'2'},
        {title: " 英语学习报+ 试卷",label :'【人教PEP版】每学期20期彩色周报及4张单元试卷',id:'3'}
      ]
      }    },
    methods:{
      onClickLeft(){
        this.$router.back();
      },
      goDetails(id){
        if(id === '1'){
          this.$router.push('/chinesePaper');
        }else if(id === '2'){
          this.$router.push('/mathPaper');
        }else{
          this.$router.push('/englishPaper');
        }
      }
    }
  }

</script>
<style scoped>
.liHeader{
  margin-bottom: 0.5rem;
}
</style>