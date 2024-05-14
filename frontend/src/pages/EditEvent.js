import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
  // 使用 useRouteLoaderData() 钩子从路由 加载 event Promise 和 events Promise 
  // event-detail 对应 当前 路由配置 中的 event-detail 属性
  // data 来自 loader() 函数，loader() 函数返还一个 defer() 函数包装的对象，该对象包含从 loadEvents() 函数 返回的 data，即 event Promise 与 events Promise
  const data = useRouteLoaderData('event-detail');

  // 渲染事件表单组件，传递 method 属性为 "patch"，表示修改事件，以及事件详情数据
  // 在 event Promise 解析完成之前，EventForm组件不会被正确渲染
  return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;
