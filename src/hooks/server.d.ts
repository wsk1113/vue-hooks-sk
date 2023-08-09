// server.d.ts
import { server } from 'ws';

declare class WebSocketServer extends server {
    constructor(options?: WebSocket.ServerOptions);

    on(event: 'connection', listener: (socket: WebSocket) => void): this;
    on(event: 'listening', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
}

export = WebSocketServer;