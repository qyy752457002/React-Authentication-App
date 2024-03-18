import { NavLink, useRouteLoaderData } from 'react-router-dom';

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
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
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

