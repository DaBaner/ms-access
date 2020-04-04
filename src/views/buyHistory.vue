<template>
  <div class="buyHistory">
    <div class="header">
      <div @click="back()">
        <van-icon name="arrow-left" size="1.28rem" />
      </div>
      <div>订阅历史</div>
      <div></div>
    </div>
    <div class="buyHistoryContent">
      <van-panel v-for="(item,index) in infoList" :key="index" :title="'订单编号：'+item.orderCode" :desc="'下单时间：'+item.createTime" :status="formatOrderStatus(item.orderStatus)" class="orderItem">
        <div class="nameAndMoney">
          <p>订购项目：{{item.subItems}}</p>
          <p>订单金额：{{item.totalPrice}}元</p>
        </div>
        <div v-if="item.orderStatus === '2'" slot="footer" class="lkFooter">
          <van-button size="small" type="danger" class="refundBtn" @click="askRefundFunc(item.orderCode)">退款</van-button>
        </div>
      </van-panel>
      <van-pagination 
        v-model="currentPage" 
        @change="changeFunc()"
        :page-count="totalPageCount"
        mode="simple" 
        class="fenye"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "buyHistory",
  data() {
    return {
      infoList:[],
      currentPage:1,
      totalPageCount:1,
      openId:"",
    };
  },
  created() {
    this.getUserOpenId();
  },
  computed: {
    weburl: function () {
        return this.$store.state.weburl;
    },
  },
  methods: {
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
      // 获取订购记录信息
      this.getOrderInfoList();
      
    },
    back() {
      this.$router.back();
    },
    formatOrderStatus(val) {
      switch (val) {
        case '1':
          return "未付款";
        case '2':
          return "已付款";
        case '3':
          return "退款中";
        case '4':
          return "已退款";
        case '5':
          return "已完成";
      }
    },
    changeFunc(val) {
      this.getOrderInfoList();
    },
    // 询问是否退款的方法
    askRefundFunc(orderCode) {
      this.$dialog.confirm({
        message: '您确定要申请退款吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
      .then(() => {
        this.refundFunc(orderCode);
      })
    },
    // 退款
    refundFunc(orderCode) {
      const params = {
        openId:this.openId,
        orderCode: orderCode,
      };
      this.$lkHttps({
        url: this.weburl+"/app/doRefund.action",
        method: "GET",
        dataType: "json",
        params:params
      })
      .then(res => {
        console.log(res);
        if(res.data.errcode === "000000"){
          this.getOrderInfoList();
          this.$toast(res.data.errmsg);
        }else{
          this.$toast(res.data.errmsg);
        }
      })
      .catch(err => {
          console.log(err);
      })
    },
    // 获取订单列表
    getOrderInfoList() {
      this.infoList = [];
      const params = {
        openId:this.openId,
        pageIndex: this.currentPage,
      };
      this.$lkHttps({
        url: this.weburl+"/app/get.action",
        method: "GET",
        dataType: "json",
        params:params
      })
      .then(res => {
        console.log(res);
        if(res.data.errcode === "000000"){
          this.infoList = res.data.list;
          this.totalPageCount = res.data.totalPageCount;
        }else{
          this.$toast(res.data.errmsg);
        }
      })
      .catch(err => {
          console.log(err);
      })
    }
  }
}
</script>
<style scoped>
.header {
  width: 100%;
  height: 2.6rem;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  z-index: 101;
}
.header div:nth-child(1) {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header div:nth-child(2) {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header div:nth-child(3) {
  width: 20%;
}
.nameAndMoney p:nth-child(1) {
  padding: 1rem 0.86rem;
}
.nameAndMoney p:nth-child(2) {
  padding-left: 0.86rem;
  padding-bottom: 0.6rem;
  font-size: 0.9rem;
}
.orderItem {
  margin-top: 0.6rem;
}
.lkFooter {
  /* background-color: blueviolet; */
  height: 2.3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.buyHistoryContent{
  position: relative;
  top: 2.6rem;
}
.fenye{
  margin-top: 0.8rem;
}
</style>