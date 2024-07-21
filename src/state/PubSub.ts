type Func = (...args: any) => void;

class PubSub {
  handlers: { [index: string]: Func[] };

  constructor() {
    this.handlers = {};
  }

  // 订阅事件
  on(eventType: string, handler: Func) {
    if (!(eventType in this.handlers)) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType].push(handler);

    // 返回一个退订函数，用于在组件卸载时退订
    return () => {
      this.off(eventType, handler)
    }
  }

  // 触发事件
  emit(eventType: string, value: string | number) {
    // 获取触发到eventType事件的handler的参数
    if (!(eventType in this.handlers)) {
      console.warn(`eventType: ${eventType}不存在`);
      return;
    }
    this.handlers[eventType].forEach((handler) => {
      handler(value);
    });
    return this;
  }

  // 删除订阅事件
  off(eventType: string, handler: Func) {
    if (!(eventType in this.handlers)) {
      console.warn(`eventType: ${eventType}不存在`);
      return;
    }
    // 剔除handler
    this.handlers[eventType] = this.handlers[eventType].filter(
      (item) => item !== handler
    );
    return this;
  }
}

export const pubsub = new PubSub();
