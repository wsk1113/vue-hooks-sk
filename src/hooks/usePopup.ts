/*
 * @Author: wangshaokang wangshaokang@example.com
 * @Date: 2023-08-08 11:49:52
 * @LastEditors: wangshaokang wangshaokang@example.com
 * @LastEditTime: 2023-08-08 11:56:07
 * @FilePath: \vue-hooks-sk\src\hooks\usePopup.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref, Ref } from "vue";

interface PopupValue {
  size: Array<string>;
  type: string;
}

interface RePopup {
  isPopup: Ref<boolean>;
  openPopup: () => void;
  closePopup: () => void;
  val: Ref<PopupValue>;
}

function usePopup(arg: PopupValue): RePopup {
  const isPopup: Ref<boolean> = ref(false);
  const val: Ref<PopupValue> = ref(arg);

  function openPopup(): void {
    isPopup.value = true;
  }

  function closePopup(): void {
    isPopup.value = false;
  }

  return {
    isPopup,
    openPopup,
    closePopup,
    val,
  };
}

export default usePopup;
