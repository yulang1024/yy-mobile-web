import { simpleUUID } from "@/utils/$$$";

/** 客户端身份 枚举 */
export const ClientIdentity = {
  /** web端 */
  web: 'web',
  /** 移动端 */
  mobile: 'mobile',
};

/**
 * 消息类型-枚举
 */
export const MessageType = {
  /** 发送心跳 */
  ping: 'ping',
  // /** 消息 */
  // message: 'message',
};

/**
 * 连接状态-枚举
 */
export const ConnectionStatus = {
  /** 连接中 */
  connecting: 'connecting',
  /** 连接成功 */
  connected: 'connected',
  /** 连接失败 */
  failed: 'failed',
  /** 连接关闭 */
  closed: 'closed',
};


/** WebSocket 客户端 */
export class WebSocketClient {
  /** 基础路径 */
  baseURL = 'ws://localhost:8080';

  /** 连接实例 */
  socket = null;

  /** 连接状态 */
  connectionStatus = null;

  /** 客户端身份 */
  clientIdentity = ClientIdentity.web;

  /** 消息映射, key 为消息ID, value 为消息内容 */
  messageMap = new Map();

  /** 消息等待响应的映射, key 为消息ID, value 为回调函数 */
  messageWaitResponseMap = new Map();

  constructor() {
    this.init();
  }

  /**
   * 初始化连接
   */
  init() {
    // 创建 WebSocket 连接
    this.connectionStatus = ConnectionStatus.connecting;
    const socket = new WebSocket(this.baseURL);
    this.socket = socket;

    // 连接成功时触发
    socket.addEventListener('open', (event) => {
        console.log('WebSocket 连接已建立');
        this.connectionStatus = ConnectionStatus.connected;
        this.startCheckHeartbeat();
    });

    // 接收服务器消息时触发
    socket.addEventListener('message', (event) => {
        console.log('收到服务器消息:', event.data);
        this.onMessage(event.data);
    });

    // 连接关闭时触发
    socket.addEventListener('close', (event) => {
        console.log('WebSocket 连接已关闭');
        this.connectionStatus = ConnectionStatus.closed;
    });

    // 发生错误时触发
    socket.addEventListener('error', (event) => {
        console.error('WebSocket 错误:', event);
        this.connectionStatus = ConnectionStatus.failed;
    });
  }

  /**
   * 发送消息
   */
  sendMessage(messageType, message) {
    const messageId = simpleUUID();
    this.socket.send(JSON.stringify({
      id: messageId,
      type: messageType,
      content: message,
    }));
    return messageId;
  }

  /**
   * 开始轮询心跳检测
   */
  startCheckHeartbeat() {
    const timer = setInterval(() => {
      if (this.connectionStatus === ConnectionStatus.connected) {
        this.sendMessage(MessageType.ping);
      } else {
        clearInterval(timer);
      }
    }, 2000);
  }

  /**
   * 处理收到的消息
   */
  onMessage(messageStr) {
    let message = null;
    try {
      message = JSON.parse(messageStr);
    } catch (error) {
      console.error('解析消息失败:', error, messageStr);
    }

    //
  }

  /**
   * 发送并等待响应
   */
  request({
    messageType,
    message,
    callback,
  }) {
    this.sendMessage(messageType, message);
    this.onMessage(callback);
  }
}
