import { NavLink, useRouteLoaderData } from 'react-router-dom';
// 引入了 EventsNavigation.module.css 文件中定义的样式，并将其赋值给 classes 变量。
// 这样，在 EventsNavigation.js 文件中就可以使用 classes 变量来引用 EventsNavigation.module.css 文件中定义的样式规则。
import classes from './EventsNavigation.module.css';

// EventsNavigation组件用于展示事件导航栏
function EventsNavigation() {
  // 使用useRouteLoaderData钩子获取token
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      {/* 导航菜单 */}
      <nav>
        <ul className={classes.list}>
          {/* 所有事件链接 */}
          <li>
            <NavLink
              to="/events"
              /* 
                isActive 这个属性的初始值是由 react-router-dom 提供的 <NavLink> 组件根据当前页面 URL 是否与其 to 属性指定的路径匹配而确定的。
                <NavLink> 组件会根据当前 URL 是否与其 to 属性指定的路径匹配来决定是否添加 isActive 属性。
                当页面 URL 完全匹配到 to 属性指定的路径时，isActive 属性会被设置为 true，否则为 false。               
              */
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              /* 
                end 意味着只有当 URL 完全匹配到 /events 路径时，
                All Events 的 <NavLink> 的 isActive 属性 才会被设置为 true，
                不会因为 URL 后面可能还有其他路径而被误设置为 true。

                ex. http://localhost:3000/events/new，All Events 的 <NavLink> 的 isActive 属性 为 False。           
              */
              end
            >
              All Events
            </NavLink>
          </li>
          {/* 如果有token，则显示新建事件链接 */}
          {token && (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

// 导出EventsNavigation组件
export default EventsNavigation;

