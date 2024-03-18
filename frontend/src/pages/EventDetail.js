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
  // 使用 useRouteLoaderData() 从路由加载数据，获取事件详情和事件列表
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      {/* 使用 Suspense 组件处理数据加载过程中的等待状态 */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        {/* 使用 Await 组件等待事件详情数据加载完成 */}
        <Await resolve={event}>
          {/* 当事件详情数据加载完成后，渲染 EventItem 组件 */}
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      {/* 使用 Suspense 组件处理数据加载过程中的等待状态 */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        {/* 使用 Await 组件等待事件列表数据加载完成 */}
        <Await resolve={events}>
          {/* 当事件列表数据加载完成后，渲染 EventsList 组件 */}
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

// 异步加载事件详情的函数
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

// 异步加载事件列表的函数
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

// 加载器函数，用于从服务器获取数据
export async function loader({ request, params }) {
  const id = params.eventId;

  // 使用 defer 函数延迟加载事件详情和事件列表数据
  return defer({
    event: await loadEvent(id), // 调用 loadEvent 函数获取事件详情数据
    events: loadEvents(), // 调用 loadEvents 函数获取事件列表数据
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
