import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
  // 使用 useRouteLoaderData() 钩子从路由加载数据，获取事件详情
  const data = useRouteLoaderData('event-detail');

  // 渲染事件表单组件，传递 method 属性为 "patch"，表示修改事件，以及事件详情数据
  return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;
