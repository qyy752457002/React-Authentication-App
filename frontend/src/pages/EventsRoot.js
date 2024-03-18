import { Outlet } from 'react-router-dom';

import EventsNavigation from '../components/EventsNavigation';

// EventsRootLayout 组件，用于渲染事件相关页面的根布局
function EventsRootLayout() {
  return (
    <>
      {/* 渲染事件导航栏组件 */}
      <EventsNavigation />
      {/* 渲染子路由组件 */}
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
