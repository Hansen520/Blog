<template>
  <el-header>
    <span>{{ checked === true ? '暗色' : '亮色' }}</span>
    <input
      v-model="checked"
      type="checkbox"
      class="switch"
      @change="changeTheme"
    />
    主题切换
    <img :src="logoUrl" alt="图片" />
  </el-header>
  <div class="container">
    <el-container>
      <el-aside class="aside">
        <div>
          <router-link to="/home">首页</router-link>
        </div>
        <div>
          <router-link to="/about">关于</router-link>
        </div>
        <div>
          <router-link to="/todolist">todoList</router-link>
        </div>
        <div>
          <router-link to="/count">计数组件vuex</router-link>
        </div>
      </el-aside>
    </el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import { setTheme } from '../style/themeUtil';

const checked = ref(false);
const logoUrl = ref('');
// 换图
const loadImg = async () => {
  let name = !checked.value ? '业绩' : '学习';
  let ext = !checked.value ? 'svg' : 'svg';
  let res = await import(`../assets/${name}中心.${ext}`);
  console.log(res, 24);
  logoUrl.value = res.default;
};
const changeTheme = function () {
  setTheme(!checked.value);
  loadImg();
};
changeTheme();
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: var(--theme-bg);
  color: var(--theme-color);
  text-align: center;
  border: 1px solid var(--theme-boder-color);
}
.el-aside {
  background-color: var(--theme-bg);
  color: var(--theme-color);
  border: 1px solid var(--theme-boder-color);
}
.el-main {
  width: 100%;
  background-color: var(--theme-bg);
  color: var(--theme-color);
  border: 1px solid var(--theme-boder-color);
}
.container {
  display: flex;
}

.el-container {
  margin-bottom: 40px;
}
a {
  display: block;
  text-decoration: none;
  color: green;
  margin-right: 10px;
  padding: 10px 0;
  border: 1px solid green;
  margin-top: -1px;
}
.aside {
  width: 200px;
  height: 100%;
}
</style>
