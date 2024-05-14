import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { getAuthToken } from '../util/auth';

function EventDetailPage() {
  // 使用 useRouteLoaderData() 钩子从路由 加载 event Promise 和 events Promise 
  // event-detail 对应 当前 路由配置 中的 event-detail 属性
  // event Promise 与 events Promise 来自 loader() 函数，loader() 函数返还一个 defer() 函数包装的对象，该对象包含从 loadEvents() 函数 返回的 data，即 event Promise 与 events Promise
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      {/* 使用 Suspense 组件处理 event Promise 解析过程中的等待状态 */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        {/* 使用 Await 组件等待 event Promise 的解析 */}
        {/* resolve 属性接收要等待的 Promise，这里是 event */}
        <Await resolve={event}>
          {/* 当 event Promise 解析完成时，解析后的数据 loadedEvents 将会被传递给回调函数并用于渲染 EventItem 组件 */}
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      {/* 使用 Suspense 组件处理 events Promise 解析过程中的等待状态 */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        {/* 使用 Await 组件等待 events Promise 的解析 */}
        {/* resolve 属性接收要等待的 Promise，这里是 events */}
        <Await resolve={events}>
          {/* 当 events Promise 解析完成时，解析后的数据 loadedEvents 将会被传递给回调函数并用于渲染 EventsList 组件 */}
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

// 异步加载数据的函数，返回一个 Promise，该 Promise 在 数据成功获取并解析为 JSON 格式后 解析为数据
async function loadEvent(id) {
  // 发起网络请求获取指定 id 的事件详情
  const response = await fetch('http://localhost:8080/events/' + id);

  // 如果网络请求不成功，抛出一个包含错误信息的 Response 对象
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' }, // 错误消息对象
      { status: 500 } // 错误状态码
    );
  } else {
    // 如果网络请求成功，解析响应数据并返回事件详情
    const resData = await response.json();
    return resData.event;
  }
}

// 异步加载数据的函数，返回一个 Promise，该 Promise 在 数据成功获取并解析为 JSON 格式后 解析为数据
async function loadEvents() {
  // 发起网络请求获取事件列表
  const response = await fetch('http://localhost:8080/events');

  // 如果网络请求不成功，抛出一个包含错误信息的 Response 对象
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events.' }, // 错误消息对象
      { status: 500 } // 错误状态码
    );
  } else {
    // 如果网络请求成功，解析响应数据并返回事件列表
    const resData = await response.json();
    return resData.events;
  }
}

// 加载器函数，返还一个被 defer 函数包装的对象
export async function loader({ request, params }) {
  const id = params.eventId;

  // 使用 defer() 函数，接受一个包含 Promise 的对象，处理异步数据加载，并在数据加载期间允许路由跳转
  return defer({
    // event 是一个 Promise，这个 Promise 是由 loadEvent(id) 函数返回的，它将会在数据加载完成后解析为事件数据
    // 这儿使用await，使得React路由等待 loadEvents() 函数内部的数据请求完成，即返还 events Promise，再跳转到 EventsPage 组件页面
    event: await loadEvent(id),
    // events 是一个 Promise，这个 Promise 是由 loadEvents() 函数返回的，它将会在数据加载完成后解析为事件数据
    // 即使 loadEvents() 函数 内部的数据请求还没完成，即还没有返还 events Promise，路由依旧跳转到 EventsPage 组件页面
    events: loadEvents(), 
  });
}

// 动作函数，用于处理请求，例如删除事件
export async function action({ params, request }) {
  const eventId = params.eventId;

  // 获取用户身份验证令牌
  const token = getAuthToken();

  // 发起请求删除指定 id 的事件
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method, // 使用请求对象的方法
    headers: {
      'Authorization': 'Bearer ' + token // 设置请求头中的身份验证令牌
    }
  });

  // 如果请求不成功，抛出一个包含错误信息的 Response 对象
  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' }, // 错误消息对象
      { status: 500 } // 错误状态码
    );
  }

  // 如果请求成功，重定向到 '/events' 路径
  return redirect('/events');
}
