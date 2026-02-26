/**
 * ネットワーク通信拡張機能 (WebSocket)
 */
class Scratch3WebsockBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.socket = null;
        this.receivedData = "";
        this.status = "未接続";
    }

    /**
     * ブロックの定義
     */
    getInfo () {
        return {
            id: 'websockExt', // 拡張機能のID
            name: 'ネットワーク通信',
            blocks: [
                {
                    opcode: 'connectToServer',
                    blockType: 'command',
                    text: 'サーバー [URL] に接続する',
                    arguments: {
                        URL: {
                            type: 'string',
                            defaultValue: 'wss://://free.piesocket.com'
                        }
                    }
                },
                {
                    opcode: 'sendData',
                    blockType: 'command',
                    text: '[DATA] を送信する',
                    arguments: {
                        DATA: {
                            type: 'string',
                            defaultValue: 'こんにちは'
                        }
                    }
                },
                {
                    opcode: 'getReceivedData',
                    blockType: 'reporter',
                    text: '受信したデータ'
                },
                {
                    opcode: 'getStatus',
                    blockType: 'reporter',
                    text: '接続状態'
                }
            ]
        };
    }

    // --- ブロックの動作処理 ---

    connectToServer (args) {
        const url = args.URL;
        if (this.socket) this.socket.close();

        this.socket = new WebSocket(url);
        this.status = "接続中...";

        this.socket.onopen = () => {
            this.status = "接続済み";
        };

        this.socket.onmessage = (event) => {
            this.receivedData = event.data;
        };

        this.socket.onclose = () => {
            this.status = "切断されました";
        };

        this.socket.onerror = () => {
            this.status = "エラー発生";
        };
    }

    sendData (args) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(args.DATA);
        }
    }

    getReceivedData () {
        return this.receivedData;
    }

    getStatus () {
        return this.status;
    }
}

module.exports = Scratch3WebsockBlocks;

