import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

// NewsletterSignup组件用于展示和处理订阅表单
function NewsletterSignup() {
  // 使用useFetcher钩子获取用于发起请求的fetcher对象
  const fetcher = useFetcher();
  // 从fetcher对象中获取data和state属性
  const { data, state } = fetcher;

  // 当data或state发生变化时，执行effect
  useEffect(() => {
    // 如果状态为'idle'且data存在且包含消息属性
    if (state === 'idle' && data && data.message) {
      // 弹出窗口显示消息
      window.alert(data.message);
    }
  }, [data, state]);

  // 返回订阅表单
  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      {/* 输入邮箱地址 */}
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      {/* 提交按钮 */}
      <button>Sign up</button>
    </fetcher.Form>
  );
}

// 导出NewsletterSignup组件
export default NewsletterSignup;


