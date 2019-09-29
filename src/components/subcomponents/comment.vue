<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <div>
      <textarea placeholder="请输入要杠的内容(不要超过120字)" maxlength="120" v-model="msg"></textarea>
      <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
      <div class="cmt-list">
        <div class="cmt-list__item" v-for="(item, i) in comments" :key="item.add_time">
          <div
            class="cmt-list__item-title"
          >第{{ i+1 }}楼&nbsp;&nbsp;用户: {{ item.user_name }}&nbsp;&nbsp;发表时间: {{ item.add_time | dataFormat }}</div>
          <div
            class="cmt-list__item-body"
          >{{ item.content === 'undefined' ? "什么都没写" : item.content }}</div>
        </div>
      </div>
      <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      comments: [], // 所有的评论数据
      pageIndex: 1, // 默认展示第一页的数据
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      // 获取评论数据
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message
            // 每当获取新评论数据的时候，不要把原来的数据清空，而是把新数据拼接到原数据上
            this.comments = this.comments.concat(result.body.message);
            // this.comments += result.body.message; // 不能使用这种方法
          } else {
            Toast("获取数据失败！");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      // 验证是否为空内容
      if(this.msg.trim().length === 0){
        return Toast('评论内容不能为空')
      }
      // 发表评论
      // 参数1：请求的URL地址
      // 参数2：提交给服务器的数据对象 { content: this.msg }
      // 参数3：定义提交时，表单数据的格式 { emulate JSON } 可全局配置
      this.$http
        .post("api/postcomment/" + this.id, { content: this.msg.trim() })
        .then(function(result) {
          if (result.body.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = ''
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    margin-bottom: 0;
    height: 85px;
    font-size: 14px;
  }
  .cmt-list {
    margin: 5px 0;
    &__item {
      &-title {
        background-color: #ccc;
        font-size: 12px;
        line-height: 32px;
      }
      &-body {
        text-indent: 2em;
      }
    }
  }
}
</style>