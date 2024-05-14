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
              /* 
                isActive 这个属性的初始值是由 react-router-dom 提供的 <NavLink> 组件根据当前页面 URL 是否与其 to 属性指定的路径匹配而确定的。
                <NavLink> 组件会根据当前 URL 是否与其 to 属性指定的路径匹配来决定是否添加 isActive 属性。
                当页面 URL 完全匹配到 to 属性指定的路径时，isActive 属性会被设置为 true，否则为 false。               
              */
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              /* 
                end 意味着只有当 URL 完全匹配到 / 路径时，
                Home 的 <NavLink> 的 isActive 属性 才会被设置为 true。
                
                而不会因为 URL 后面可能还有其他路径而被误设置为 true,

                ex. http://localhost:3000/events/2a42fcc4-ea21-4bdd-abf6-c40006dc66a9，Home 的 <NavLink> 的 isActive 属性 为 False。          
              */
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

