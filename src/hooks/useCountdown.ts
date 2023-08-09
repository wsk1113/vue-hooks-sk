import { ref, onMounted, onUnmounted, Ref } from "vue";

interface Countdown {
  remainingSeconds: Ref<number>;
  startCountdown: () => void;
  stopCountdown: () => void;
}

function useCountdown(totalSeconds: number): Countdown {
  const left: Ref<number> = ref(totalSeconds);
  let timer: NodeJS.Timeout | null = null;

  function startCountdown(): void {
    clearInterval(timer as NodeJS.Timeout);

    timer = setInterval(() => {
      left.value--;

      if (left.value <= 0) {
        clearInterval(timer as NodeJS.Timeout);
      }
    }, 1000);
  }

  function stopCountdown(): void {
    clearInterval(timer as NodeJS.Timeout);
  }

  // 在组件挂载时开始倒计时
  onMounted(() => {
    startCountdown();
  });

  // 在组件卸载时停止倒计时
  onUnmounted(() => {
    stopCountdown();
  });

  return {
    remainingSeconds: left,
    startCountdown,
    stopCountdown,
  };
}

export default useCountdown;
