// 引入必要的React Router DOM组件和函数
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// 引入页面组件和相关的loader和action
import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';

// 使用createBrowserRouter创建一个路由配置
const router = createBrowserRouter([
  {
    path: '/', // 根路由
    element: <RootLayout />, // 根路由对应的元素
    errorElement: <ErrorPage />, // 发生错误时显示的元素
    id: 'root', // 路由的唯一标识
    loader: tokenLoader, // 在进入路由前执行的loader，用于预加载数据或执行认证等
    children: [ // 子路由配置
      { index: true, element: <HomePage /> }, // 首页路由配置

      // ---------------------------------------------------------------

      {
        path: 'events', // 事件相关页面的基路由
        element: <EventsRootLayout />, // 包装事件相关页面的布局组件
        children: [ // 事件页面的子路由
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader, // 加载事件列表的loader
          },

          {
            path: ':eventId', // 事件详情页路由，:eventId为动态参数
            id: 'event-detail',
            loader: eventDetailLoader, // 加载事件详情的loader
            children: [
              {
                index: true,
                element: <EventDetailPage />, // 事件详情页组件
                action: deleteEventAction, // 删除事件的action
              },

              {
                path: 'edit', // 事件编辑页路由
                element: <EditEventPage />,
                action: manipulateEventAction, // 编辑事件的action
                loader: checkAuthLoader, // 检查是否认证的loader
              },
              
            ],
          },

          {
            path: 'new', // 新增事件页路由
            element: <NewEventPage />,
            action: manipulateEventAction, // 新增事件的action
            loader: checkAuthLoader, // 检查是否认证的loader
          },
        ],
      },

      // ---------------------------------------------------------------

      {
        path: 'auth', // 认证页面路由
        element: <AuthenticationPage />,
        action: authAction, // 认证的action
      },

      {
        path: 'newsletter', // 订阅通讯页面路由
        element: <NewsletterPage />,
        action: newsletterAction, // 订阅通讯的action
      },

      {
        path: 'logout', // 注销操作的路由
        action: logoutAction, // 执行注销的action
      },

    ],
  },
]);

// App组件，使用RouterProvider包装整个应用
function App() {
  return <RouterProvider router={router} />;
}

export default App;

