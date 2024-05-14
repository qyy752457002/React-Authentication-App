import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import { getAuthToken } from "../util/auth";
import classes from "./EventForm.module.css";

// EventForm组件用于展示和处理事件表单
function EventForm({ method, event }) {
  // 使用useActionData钩子获取表单提交后的数据
  const data = useActionData();
  // 使用useNavigate钩子获取导航函数
  const navigate = useNavigate();
  // 使用useNavigation钩子获取导航状态
  const navigation = useNavigation();

  /*
    在 react-router-dom v6 中，useNavigation 钩子用于跟踪导航状态，帮助你了解应用当前的加载或提交状态。

    返回的对象包含表示当前导航状态的 state 属性，其值可以是以下三种状态之一：

      - idle：没有正在进行的导航或表单提交，此时应用处于空闲状态。
      - loading：有一个新页面正在加载或即将加载，这是导航过程的一部分。
      - submitting：有一个表单提交正在进行中，这是由表单提交触发的导航状态。

    可以通过检查 state 属性来根据不同的状态执行相应的逻辑。

      ex. 

        if (state === 'idle') {
        message = 'No navigation or submission in progress.';
      } else if (state === 'loading') {
        message = 'Page is currently loading...';
      } else if (state === 'submitting') {
        message = 'Submitting form data...';
      }
  */

  // 判断是否正在提交表单
  const isSubmitting = navigation.state === "submitting";

  // 取消操作的处理函数
  function cancelHandler() {
    navigate("..");
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
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
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
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  console.log(method);

  // 构造请求URL
  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  // 获取认证token
  const token = getAuthToken();
  // 发起请求
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(eventData),
  });

  // 如果请求返回422状态码，则返回响应
  if (response.status === 422) {
    return response;
  }

  // 如果请求不成功，则抛出错误
  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  // 重定向到事件列表页面
  return redirect("/events");
}
