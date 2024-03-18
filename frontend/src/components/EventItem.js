import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

// EventItem组件用于展示单个事件项
function EventItem({ event }) {
  // 使用useRouteLoaderData钩子获取token
  const token = useRouteLoaderData('root');
  // 使用useSubmit钩子获取submit函数
  const submit = useSubmit();

  // 处理删除事件的函数
  function startDeleteHandler() {
    // 弹出确认对话框
    const proceed = window.confirm('Are you sure?');

    // 如果确认删除
    if (proceed) {
      // 发起删除请求
      submit(null, { method: 'delete' });
    }
  }

  // 返回事件项的 JSX
  return (
    <article className={classes.event}>
      {/* 事件图片 */}
      <img src={event.image} alt={event.title} />
      {/* 事件标题 */}
      <h1>{event.title}</h1>
      {/* 事件日期 */}
      <time>{event.date}</time>
      {/* 事件描述 */}
      <p>{event.description}</p>
      {/* 如果有token，则显示编辑和删除按钮 */}
      {token && (
        <menu className={classes.actions}>
          {/* 编辑链接 */}
          <Link to="edit">Edit</Link>
          {/* 删除按钮 */}
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

// 导出EventItem组件
export default EventItem;


