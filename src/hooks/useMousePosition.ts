import { reactive, toRefs, onMounted, onUnmounted } from "vue";

function useMousePosition() {
  /* 定义两个响应式数据 */
  const state = reactive({
    mouseX: 0,
    mouseY: 0,
  });
  const { mouseX, mouseY } = toRefs(state);

  const onMouseMove = (e: MouseEvent) => {
    console.log("onMouseMove", e.pageX, e.pageY);
    mouseX.value = e.pageX;
    mouseY.value = e.pageY;
  };

  /* 组件挂载时注册mousemove事件 在事件中实时将事件位置同步给 mouseX, mouseY */
  onMounted(() => {
    document.addEventListener("mousemove", onMouseMove);
  });

  /* 组件卸载时移除mousemove事件 */
  onUnmounted(() => {
    console.log("mousemove事件业已移除");
    document.removeEventListener("mousemove", onMouseMove);
  });

  // 将响应式数据返回
  return { mouseX, mouseY };
}

export default useMousePosition;
