// client.d.ts
import WebSocket from 'ws';

declare class WebSocketClient extends WebSocket {
    constructor(url: string | URL, options?: WebSocket.ClientOptions);

    on(event: 'open', listener: () => void): this;
    on(event: 'message', listener: (data: WebSocket.Data) => void): this;
    on(event: 'close', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
}

export = WebSocketClient;