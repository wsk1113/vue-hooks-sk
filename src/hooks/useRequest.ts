import { ref, onMounted, onUnmounted, Ref } from "vue";
import axios, { CancelTokenSource, AxiosResponse, AxiosError } from "axios";

interface RequestResponse<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  fetchData: () => Promise<void>;
}

function useRequest<T>(url: string): RequestResponse<T> {
  /* 定义一堆响应式数据 */
  const data: Ref<T | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  let source: CancelTokenSource | undefined;

  async function fetchData(): Promise<void> {
    loading.value = true;
    error.value = null;
    data.value = null;

    try {
      // 创建一个请求取消令牌
      source = axios.CancelToken.source();

      const response: AxiosResponse<T> = await axios.get(url, {
        cancelToken: source.token,
      });
      // data.value = response.data

      data.value = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(response.data);
        }, 3000);
      });
    } catch (e: any) {
      if (axios.isCancel(e)) {
        console.log("请求已取消");
        error.value = "请求已取消";
      } else {
        error.value = (e as AxiosError).message || "请求出错";
      }
    } finally {
      loading.value = false;
    }
  }

  // 在组件挂载时发起请求
  onMounted(() => {
    fetchData();
  });

  // 在组件卸载时取消请求
  onUnmounted(() => {
    if (source) {
      source.cancel("组件卸载，请求被取消");
    }
  });

  return {
    data,
    loading,
    error,
    fetchData,
  };
}

export default useRequest;
