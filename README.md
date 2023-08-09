- NPM官方源安装【石头指令】
```shell
npm i -g nrm
nrm use npm
npm i @wsk1113/vue-hooks-sk
```

- 轻松设置倒计时
```js
<template>
  <div>
    UseCountdownDemo
    <hr />
    remainingSeconds:{{ remainingSeconds }} <br />

    <button @click="startCountdown">startCountdown</button>
    <button @click="stopCountdown">stopCountdown</button>
  </div>
</template>

<script setup lang="ts">
import { useCountdown } from "@wsk1113/vue-hooks-sk";

const { remainingSeconds, startCountdown, stopCountdown } = useCountdown(60);
</script>

<style lang="scss" scoped></style>
```

- 校验表单
```js
<template>
  <div>
    <h1>表单验证</h1>
    <div>
      <label for="username">用户名：</label>
      <input id="username" v-model="username" type="text" />
      <p v-if="!isUsernameValid">用户名长度必须大于等于 6</p>
    </div>
    <div>
      <label for="password">密码：</label>
      <input id="password" v-model="password" type="password" />
      <p v-if="!isPasswordValid">密码长度必须大于等于 8</p>
    </div>
    <button @click="handleSubmit">提交</button>
  </div>
</template>

<script lang="ts">
// import useFormValidator from "@/hooks/useFormValidator";
import { useFormValidator } from '@wsk1113/vue-hooks-sk'

export default {
  name: "FormValidator",
  setup() {
    const {
      username,
      password,
      isUsernameValid,
      isPasswordValid,
      handleSubmit,
    } = useFormValidator();

    return {
      username,
      password,
      isUsernameValid,
      isPasswordValid,
      handleSubmit,
    };
  },
};
</script>
```

- 发起网络请求
```js
<template>
  <div>
    <button @click="fetchData">fetchData</button>
    <p>loading {{ loading }}</p>
    <p>error {{ error }}</p>
    <p>data {{ data }}</p>
  </div>
</template>

<script setup lang="ts">
// import useRequest from "@/hooks/useRequest";
import { useRequest } from "@wsk1113/vue-hooks-sk";

const { data, loading, error, fetchData } = useRequest(
  "https://lekuzhima.club/interview/album/0"
);
</script>

<style lang="scss" scoped></style>
```

- 发起视频会话
```js
<template>
  <div>
    <h1>视频通话示例</h1>
    <div>
      <h2>本地视频</h2>
      <video ref="localVideoRef" autoplay></video>
    </div>
    <div>
      <h2>远程视频</h2>
      <video ref="remoteVideoRef" autoplay></video>
    </div>
  </div>
</template>

<script setup>
import useWebRTC from "../useWebRTC";
const { localVideoRef, remoteVideoRef } = useWebRTC();
</script>

<style lang="scss" scoped></style>