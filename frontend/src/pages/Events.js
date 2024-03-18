import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  // 使用 useLoaderData() 从路由加载数据
  const { events } = useLoaderData();

  return (
    // 使用 Suspense 组件处理数据加载过程中的等待状态
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      {/* 使用 Await 组件等待数据加载完成 */}
      <Await resolve={events}>
        {/* 当数据加载完成后，渲染 EventsList 组件 */}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// 异步加载事件数据的函数
async function loadEvents() {
  // 发起网络请求获取事件数据
  const response = await fetch('http://localhost:8080/events');

  // 如果网络请求不成功，抛出一个包含错误信息的 Response 对象
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events.' }, // 错误消息对象
      { status: 500 } // 错误状态码
    );
  } else {
    // 如果网络请求成功，解析响应数据并返回事件数组
    const resData = await response.json();
    return resData.events;
  }
}

// 加载器函数，用于从服务器获取数据
export function loader() {
  // 使用 defer 函数延迟加载事件数据
  return defer({
    events: loadEvents(), // 调用 loadEvents 函数获取事件数据
  });
}

