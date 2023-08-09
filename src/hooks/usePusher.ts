/*
 * @Author: wangshaokang wangshaokang@example.com
 * @Date: 2023-08-08 11:44:19
 * @LastEditors: wangshaokang wangshaokang@example.com
 * @LastEditTime: 2023-08-08 11:55:01
 * @FilePath: \vue-hooks-sk\src\hooks\usePusher.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import WebSocketServer from "./server.d"
import { onBeforeUnmount, onMounted, ref } from 'vue';
// import WebSocket from 'ws';

export enum SocketType {
    SERVER_ONLY = "SERVER_ONLY",// 调用者把自己变成纯服务端节点
    CLIENT_ONLY = "CLIENT_ONLY", // 调用者把自己变成客户端节点
    PEER_POINT = "PEER_POINT",// 调用者把自己变成对等节点
}

// 消息处理器类型
type MsgHandler = (data: string) => void

/* 调用者传入的配置类型 */
type PusherConfig = {
    type: SocketType, // 通信节点类型
    wsRemote: string, // 服务端你节点地址
    msgHandler: MsgHandler, // 消息处理器函数
    pushAPI?: string // 服务端推送接口
}

// const send = (data: string) => {
//     console.log("send", data);
// }

// const onReceive = (handler: MsgHandler) => {
//     console.log("onReceive", handler);
// }

const usePusher = ({ wsRemote, pushAPI, msgHandler }: PusherConfig) => {

    const wsRef = ref<WebSocket>()
    const sendMsgRef = ref<(msg: string) => void>()
    const closeConnRef = ref<() => void>()

    const pushMsg = (ids: string[], msg: string) => {
        // 发送POST请求
        fetch(pushAPI!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids,
                msg
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('推送发送成功', data);
            })
            .catch(error => {
                console.error('推送发送失败', error);
            });
    }

    /* 组价挂载：建立ws连接 */
    onMounted(() => {
        /* 创建客户端 */
        wsRef.value = new WebSocket(wsRemote);

        sendMsgRef.value = (msg: string) => wsRef.value!.send(msg);
        closeConnRef.value = () => wsRef.value!.close()

        wsRef.value.onopen = () => {
            console.log('WebSocketClient 连接已打开');
            // ws.send('Hello, WebSocket!');
        };

        wsRef.value.onmessage = (e) => {
            console.log('WebSocketClient 收到消息:', e.data.toString());
            msgHandler(e.data.toString())
        }

        wsRef.value.onclose = () => {
            console.log('WebSocketClient 连接已关闭');
        };
    })

    /* 组件卸载前：关闭连接释放资源 */
    onBeforeUnmount(() => {
        
    })

    /* 向用户返回功能函数：发消息（P2P） + 发推送（群发） + 断开连接 */
    return {
        sendMsg: sendMsgRef,
        closeConn: closeConnRef,
        pushMsg,
    }

}

export default usePusher