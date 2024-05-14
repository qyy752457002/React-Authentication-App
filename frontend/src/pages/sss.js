import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  // 使用 useLoaderData() 从路由加载events Promise 
  // events Promise 来自 loader() 函数，loader() 函数返还一个 defer() 函数包装的对象，该对象包含从 loadEvents() 函数 返回的Promise，该Promise就是 events
  const { events } = useLoaderData();

  return (
    // 使用 Suspense 组件处理数据加载过程中的等待状态
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      {/* 使用 Await 组件等待 events Promise 的解析 */}
      <Await resolve={events}>
        {/* 当 events Promise 解析完成时，解析后的数据 loadedEvents 将会被传递给回调函数并用于渲染 EventsList 组件 */}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// 异步加载事件数据的函数，返回一个 Promise，该 Promise 在数据成功获取并解析为 JSON 格式后解析为事件数据
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

// 加载器函数，返还一个被 defer 函数包装的对象
export function loader() {
  // 使用 defer 函数延迟加载事件数据，接受一个包含 Promise 的对象
  return defer({
    events: loadEvents(), // events 是一个 Promise，这个 Promise 是由 loadEvents() 函数返回的，它将会在数据加载完成后解析为事件数据
  });
}
