import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  // 使用 useLoaderData() 从路由加载events Promise 
  // events Promise 来自 loader() 函数，loader() 函数返还一个 defer() 函数包装的对象，该对象包含从 loadEvents() 函数 返回的Promise，该Promise就是 events
  const { events } = useLoaderData();

  /*
    使用 Suspense 和 Await：

      - Suspense 组件用于在数据加载期间显示一个加载指示器或占位内容，
      
        ex. <p style={{ textAlign: 'center' }}>Loading...</p>）
      
        避免页面出现空白或不完整的内容。

      - Await 组件用于等待一个 Promise 的解析，并在解析完成后使用解析后的数据。

    --------------------------------------------------------------------------------------------------------------------------------

    不使用 Suspense 和 Await：

      ex. <EventsList events={events} />
      
      如果直接传递 events 给 EventsList，组件将依赖于 events Promise 的解析结果，在 events Promise 解析完成之前，EventsList组件不会正确渲染。
  */

  return (
    // 使用 Suspense 组件处理events Promise 解析过程中的等待状态
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      {/* 使用 Await 组件等待 events Promise 的解析 */}
      {/* resolve 属性接收要等待的 Promise，这里是 events */}
      <Await resolve={events}>
        {/* 当 events Promise 解析完成时，解析后的数据 loadedEvents 将会被传递给回调函数并用于渲染 EventsList 组件 */}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// 异步加载数据的函数，返回一个 Promise，该 Promise 在 数据成功获取并解析为 JSON 格式后 解析为数据
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

  // 使用 defer() 函数，接受一个包含 Promise 的对象，处理异步数据加载，并在数据加载期间允许路由跳转
  return defer({
    // events 是一个 Promise，这个 Promise 是由 loadEvents() 函数返回的，它将会在数据加载完成后解析为事件数据
    // 即使 loadEvents() 函数 内部的数据请求还没完成，即还没有返还 events Promise，路由依旧跳转到 EventsPage 组件页面
    events: loadEvents(),
  });
}

