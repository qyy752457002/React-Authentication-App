import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

// NewsletterSignup组件用于展示和处理订阅表单
function NewsletterSignup() {
  // 使用useFetcher钩子获取用于发起请求的fetcher对象
  const fetcher = useFetcher();
  // 从fetcher对象中获取data和state属性

  /*
    data 和 state 是 fetcher 对象的属性，代表了 useFetcher 钩子内部的状态。

    1. state：表示当前请求的状态，例如：
    
      - 'idle'：表示当前没有正在进行的请求，空闲状态。
      - 'submitting'：表示当前有一个请求正在提交。
      - 'loading'：表示当前有一个请求正在加载结果。

    2. data：通常表示通过 fetcher 发起的请求返回的数据。
             初始情况下它为空或未定义，在请求返回时它会包含服务器端的响应数据。
  */
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

    /*
      在 `react-router-dom` 中，`fetcher.Form` 专门用于与 `useFetcher()` 钩子的请求和数据管理机制交互，
      它可以自动处理表单提交，并更新组件中的 `data` 和 `state` 变量 （***很重要*** ）。

      如果直接使用标准的 `Form` 元素而不是 `fetcher.Form`，
      表单提交将不会自动利用 fetcher 上下文，也不会更新组件内部的 `data` 和 `state` 变量 （***很重要***）。

      使用标准的 `Form` 需要手动处理表单提交的请求，
      可以使用 onSubmit 事件进行表单数据的收集，定义一个handleSubmit函数，
      其中通过 fetch 或其他 HTTP 客户端发送请求。

        ex. 

        <form onSubmit={handleSubmit} className={classes.newsletter}>
        ...
        </form>

      ---------------------------------------------------------------------------------------------

      - **fetcher.Form**：直接与 `fetcher` 实例相关联，自动处理表单提交和响应管理。
                          适用于在组件中独立控制和提交表单数据。

      - **标准 Form**：像普通的 HTML 表单一样工作，需要手动处理表单提交和数据管理。

      在当前example中，如果将 `fetcher.Form` 改为普通的 `Form` 元素，将会失去与 `fetcher` 实例的直接关联，因此表单提交将不再遵循相同的逻辑和处理方式。

        1. 如果需要自动的状态和数据管理，最好使用 `fetcher.Form`。

        2. 如果想要手动管理或使用其他方式处理表单数据（例如使用全局状态），则可以改用标准的 `Form` 元素。
    */

    // 该表单会使用method属性指定的HTTP方法（在这种情况下是"post"）将数据发送到指定的action URL上，这意味着当用户提交表单时，表单数据将被发送到服务器上的/newsletter端点
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


