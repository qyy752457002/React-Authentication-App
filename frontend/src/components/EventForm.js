import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect
} from 'react-router-dom';

import { getAuthToken } from '../util/auth';
import classes from './EventForm.module.css';

// EventForm组件用于展示和处理事件表单
function EventForm({ method, event }) {
  // 使用useActionData钩子获取表单提交后的数据
  const data = useActionData();
  // 使用useNavigate钩子获取导航函数
  const navigate = useNavigate();
  // 使用useNavigation钩子获取导航状态
  const navigation = useNavigation();

  // 判断是否正在提交表单
  const isSubmitting = navigation.state === 'submitting';

  // 取消操作的处理函数
  function cancelHandler() {
    navigate('..');
  }

  // 返回表单的 JSX
  return (
    <Form method={method} className={classes.form}>
      {/* 显示表单提交后的错误信息 */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

// 导出EventForm组件
export default EventForm;

// 处理事件提交的异步函数
export async function action({ request, params }) {
  // 获取请求的方法和表单数据
  const method = request.method;
  const data = await request.formData();

  // 构造事件数据对象
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  // 构造请求URL
  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId;
  }

  // 获取认证token
  const token = getAuthToken();
  // 发起请求
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(eventData),
  });

  // 如果请求返回422状态码，则返回响应
  if (response.status === 422) {
    return response;
  }

  // 如果请求不成功，则抛出错误
  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  // 重定向到事件列表页面
  return redirect('/events');
}



