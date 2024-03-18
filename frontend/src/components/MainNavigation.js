import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

// MainNavigation组件用于展示网站的主导航栏
function MainNavigation() {
  // 使用useRouteLoaderData钩子获取token
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      {/* 导航菜单 */}
      <nav>
        <ul className={classes.list}>
          {/* 主页链接 */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {/* 事件链接 */}
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          {/* Newsletter链接 */}
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {/* 如果没有token，则显示Authentication链接 */}
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {/* 如果有token，则显示Logout按钮 */}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      {/* NewsletterSignup组件用于显示订阅表单 */}
      <NewsletterSignup />
    </header>
  );
}

// 导出MainNavigation组件
export default MainNavigation;

