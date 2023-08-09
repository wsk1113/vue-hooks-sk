import { ref, computed } from "vue";

export default function useFormValidator() {
  const username = ref("");
  const password = ref("");

  const isUsernameValid = computed(() => username.value.length >= 6);
  const isPasswordValid = computed(() => password.value.length >= 8);

  function handleSubmit() {
    if (isUsernameValid.value && isPasswordValid.value) {
      // 执行提交操作
      console.log("表单提交成功！");
    } else {
      // 表单验证失败
      console.log("表单验证失败！");
    }
  }

  return {
    username,
    password,
    isUsernameValid,
    isPasswordValid,
    handleSubmit,
  };
}
