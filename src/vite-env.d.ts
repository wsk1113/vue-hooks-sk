/*
 * @Author: wangshaokang wangshaokang@example.com
 * @Date: 2023-08-08 11:19:14
 * @LastEditors: wangshaokang wangshaokang@example.com
 * @LastEditTime: 2023-08-09 10:43:29
 * @FilePath: \vue-hooks-sk\src\vite-env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />
declare module "*.vue" {
    import { defineComponent } from "vue";
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
  }
  