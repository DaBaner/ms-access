<template>
  <div class="home">
    <van-cell
      :title="clientNickName"
      is-link
      value="订阅记录"
      style="text-align: center"
      center
      label="不积跬步无以至千里"
      class="margin-bottom"
      to="buyHistory"
    >
      <template slot="icon">
        <van-image
          width="50"
          height="50"
          class="header-img"
          :src="clientHeadImgUrl"
        ></van-image>
      </template>
    </van-cell>
    <van-cell title="刊物介绍" is-link value class="text-left margin-bottom" to="about"></van-cell>
    <div class="form-data">
      <h2>订阅申请</h2>
      <van-field v-model="formData.name" type="tel" label="姓名" placeholder="请输入学生姓名"></van-field>
      <van-field v-model="formData.tel" type="tel" label="电话" placeholder="请输入手机号码"></van-field>
      <van-field v-model="formData.area" type label="地区" placeholder="请选择地区" @click="showPick(0)" readonly></van-field>
      <van-field v-model="formData.school" type label="学校" placeholder="请选择学校" @click="showPick(1)" readonly></van-field>
      <van-field v-model="formData.grade" type label="年级" placeholder="请选择年级" @click="showPick(2)" readonly></van-field>
      <van-field v-model="formData.class" type label="班级" placeholder="请选择班级" @click="showPick(3)" readonly></van-field>
      <div v-if="showProject">
        <h2>订阅项目</h2>
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell
              v-for="(item, i) in list"
              clickable
              :key="i"
              :title="item.name"
              
            >
              <template slot="icon">
                <span style="margin-right: 1rem;">{{item.price}}</span>
              </template>
              <van-checkbox :name="item.name" ref="checkboxes" slot="right-icon"></van-checkbox>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <van-button type="info" block @click="submitFun">提交申请</van-button>
    </div>
    <van-popup v-model="show" round position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm"></van-picker>
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      canClickSubmitFun: true,
      openId: '',
      clientHeadImgUrl:'',
      clientNickName: '',
      formData: {
        tel: "",
        name: "",
        area: "",
        class: "",
        grade: "",
        school: ""
      },
      areaList: [
        {
          text: "大亚湾区",
          children: [
            { text: "西区" }, 
            { text: "澳头" }, 
            { text: "霞涌" }]
        }
      ],
      show: false,
      showProject: false,
      list: [
        {
          price: "￥32.00",
          name: "语文学习报+试卷"
        },
        {
          price: "￥32.00",
          name: "数学学习报+试卷"
        },
      ],
      result: [],
      schoolList1: [
        { text: "西区第一小学" },
        { text: "西区第一小学科创园分校" },
        { text: "西区第二小学" },
        { text: "西区第三小学" },
        { text: "西区第四小学" },
        { text: "西区第五小学" },
        { text: "西区第六小学" },
      ],
      schoolList2: [
        { text: "澳头第一小学" },
        { text: "澳头第二小学" },
        { text: "澳头第三小学" },
      ],
      schoolList3: [
        { text: "霞涌第一小学" },
        { text: "霞涌第二小学" },
      ],
      gradeList: [
        { text: "一年级" },
        { text: "二年级" },
        { text: "三年级" },
        { text: "四年级" },
        { text: "五年级" },
        { text: "六年级" }
      ],
      classList: [
        { text: "(1)班" },
        { text: "(2)班" },
        { text: "(3)班" },
        { text: "(4)班" },
        { text: "(5)班" },
        { text: "(6)班" },
        { text: "(7)班" },
        { text: "(8)班" },
      ],
      columns: [],
      pickIndex: 0
    };
  },
  created() {
    this.columns = this.areaList;
    this.initUserInfo();
  },
  computed:{
    weburl: function () {
        return this.$store.state.weburl;
    },
  },
  methods: {
    // 用户首次进来，要判断是否存在用户信息
    initUserInfo() {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if(userInfo) {
        this.openId = userInfo.openId;
        this.clientHeadImgUrl = userInfo.headImgUrl;
        this.clientNickName = userInfo.nickName;
      }else{
        this.getUserOpenId();
      }
    },
    // 获取用户openId
    getUserOpenId() {
      let currentUrl = window.location.href.toString();
      let arr1 = currentUrl.split("openid=");
      if (!arr1[1]) {
        this.$toast("获取用户openId失败");
        window.location.href = "http://www.hzhzwh.com/app/redirect.action";
        return;
      }
      let arr2 = arr1[1].split("#/");
      this.openId = arr2[0];

      // 获取用户信息
      this.getUserInfo();
    },
    // 获取用户信息
    getUserInfo() {
      const params = {
        openId:this.openId,
      };
      this.$lkHttps({
        url: this.weburl+"/app/getUser.action",
        method: "GET",
        dataType: "json",
        params:params
      })
      .then(res => {
        console.log(res);
        if(res.data.errcode === "000000"){
          this.clientHeadImgUrl = res.data.headImgUrl;
          this.clientNickName = res.data.nickName;
          // 存到本地
          const obj = {};
          obj.openId = this.openId;
          obj.headImgUrl = res.data.headImgUrl;
          obj.nickName = res.data.nickName;
          sessionStorage.setItem('userInfo',JSON.stringify(obj));
        }else{
          this.$toast(res.data.errmsg);
        }
      })
      .catch(err => {
          console.log(err);
      })
    },
    showPick(val) {
      if(val === 1 && !this.formData.area) {
        this.$toast('请先选择地区');
        return;
      }
      this.pickIndex = val;
      this.show = true;
      switch (val) {
        case 0:
          this.columns = this.areaList;
          break;
        case 1:
          if(this.formData.area === '西区'){
            this.columns = this.schoolList1;
            break;
          }else if(this.formData.area === '澳头'){
            this.columns = this.schoolList2;
            break;
          }else{
            this.columns = this.schoolList3;
            break;
          }
        case 2:
          this.columns = this.gradeList;
          break;
        case 3:
          this.columns = this.classList;
          break;
      }
    },
    rightPhoneNum(str) {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/;
      return reg.test(str);
    },
    onConfirm(value, index) {
      this.result = [];
      switch (this.pickIndex) {
        case 0:
          this.formData.area = value[1];
          break;
        case 1:
          this.formData.school = value.text;
          break;
        case 2:
          this.formData.grade = value.text;
          if (index > 1) {
             this.list.push( {
               price: "￥32.00",
               name: "英语学习报+试卷"
             });
             this.list.splice(3,1);
          } else {
           this.list.splice(2,1);
          }
          this.showProject = true;
          break;
        case 3:
          this.formData.class = value.text;
          break;
      }
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    submitFun(){
      if(!this.formData.name){
        this.$toast('请填写姓名');
        return false;
      }if(!this.formData.tel){
        this.$toast('请填写手机号码');
        return false;
      }if(!this.rightPhoneNum(this.formData.tel)){
        this.$toast('请填写正确格式的手机号');
        return false;
      }if(!this.formData.area){
        this.$toast('请选择地区');
        return false;
      }if(!this.formData.class){
        this.$toast('请选择班级');
        return false;
      }if(!this.formData.grade){
        this.$toast('请选择年级');
        return false;
      }if(!this.formData.school){
        this.$toast('请选择学校');
        return false;
      }if(this.result.length < 1){
        this.$toast('请选择需要购买的商品');
        return false;
      }else{
        // this.$toast('提交成功');
        const obj = {};
        obj.openId = this.openId;
        obj.userName = this.formData.name;
        obj.mobilePhone = this.formData.tel;
        obj.regionName = this.formData.area;
        obj.schoolName = this.formData.school;
        obj.gradeName = this.formData.grade;
        obj.className = this.formData.class;
        obj.totalPrice = 32 * this.result.length;
        const list = [];
        for(let i = 0;i < this.result.length;i++){
          let oobj = {};
          oobj.amount = 1;
          oobj.bookItems = this.result[i];
          oobj.unitPrice = 32;
          list.push(oobj);
        }
        obj.list = list;

        // 判断是否在微信内部
        if(typeof WeixinJSBridge == "undefined"){
          this.$toast('请在微信公众号内打开本网页支付');
        }else{
          this.sendOrderInfo(encodeURI(JSON.stringify(obj)));
        }
      }
    },
    // 微信支付
    onBridgeReady(obj) {
      // console.log(obj);
      if(!obj) return;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',{
          "appId":obj.appId,
          "timeStamp":obj.timeStamp,
          "nonceStr":obj.nonceStr,
          "package":obj.package,
          "signType":obj.signType,
          "paySign":obj.paySign
        },(res) => {
          this.canClickSubmitFun = true;
          if(res.err_msg == "get_brand_wcpay_request:ok"){
            this.$dialog.confirm({
              title: '支付成功',
              message: '是否前往订购记录？',
              confirmButtonText: '前往',
              cancelButtonText: '取消',
            })
            .then(() => {
              this.$router.push('/buyHistory');
            })
          }
        }
      )
    },
    sendOrderInfo(jsonStr) {
      if(!this.canClickSubmitFun) return;
      this.canClickSubmitFun = false;
      const params = {
        json:jsonStr
      };
      this.$lkHttps({
        url: this.weburl+"/app/pay.action",
        method: "GET",
        dataType: "json",
        params:params,
      })
      .then(res => {
        if(res.data.errcode === '000000'){
          this.onBridgeReady(res.data);
        }else{
          this.$toast(res.data.errmsg);
          this.canClickSubmitFun = true;
        }
      })
      .catch(err => {
        this.canClickSubmitFun = true;
        console.log(err);
      })
    }
  }
};
</script>
<style scoped >
.home {
  width: 100%;
  min-height: 100vh;
}
.margin-bottom {
  margin-bottom: 1rem;
}
.form-data {
  background: #fff;
}
.form-data h2 {
  font-size: 0.9rem;
  padding: 0.625rem 16px;
  font-weight: normal;
}
</style>
