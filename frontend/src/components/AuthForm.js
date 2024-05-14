import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

// AuthForm组件用于展示和处理身份验证表单
function AuthForm() {
  // 使用useActionData钩子获取表单提交后的数据
  const data = useActionData();
  // 使用useNavigation钩子获取导航状态
  const navigation = useNavigation();

  // 使用useSearchParams钩子，获取俩个元素
  // 第一个元素是一个 URLSearchParams 对象，用于读取当前 URL 的查询参数，ex. const value = searchParams.get('key')
  // 第二个元素是一个函数，可以用来更新查询参数，ex. setSearchParams({ key: 'newValue' })
  const [searchParams, setSearchParams] = useSearchParams();
  // 判断表单模式是登录还是注册
  const isLogin = searchParams.get('mode') === 'login';
  // 判断是否正在提交表单
  const isSubmitting = navigation.state === 'submitting';

  /*
    在 react-router-dom v6 中，useNavigation 钩子用于跟踪导航状态，帮助你了解应用当前的加载或提交状态。

    返回的对象包含表示当前导航状态的 state 属性，其值可以是以下三种状态之一：

      - idle：没有正在进行的导航或表单提交，此时应用处于空闲状态。
      - loading：有一个新页面正在加载或即将加载，这是导航过程的一部分。
      - submitting：有一个表单提交正在进行中，这是由表单提交触发的导航状态。

    可以通过检查 state 属性来根据不同的状态执行相应的逻辑。

      ex. 

        if (state === 'idle') {
        message = 'No navigation or submission in progress.';
      } else if (state === 'loading') {
        message = 'Page is currently loading...';
      } else if (state === 'submitting') {
        message = 'Submitting form data...';
      }
  */

  // 返回表单的 JSX
  return (
    <>
      <Form method="post" className={classes.form}>
        {/* 根据表单模式显示标题 */}
        <h1>{isLogin ? 'Sign In' : 'Sign up'}</h1>
        {/* 显示表单提交后的错误信息 */}
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {/* 显示表单提交后的消息 */}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>

          {/* 在这个上下文中，? 符号表示查询参数的开始。

              在URL中，?后面可以跟随多个查询参数，每个参数以key=value的形式出现，不同参数之间用&符号分隔。

              ex. http://localhost:3000/auth?mode=signup

              在这个URL中，
              - auth 对应 认证页面路由：path: 'auth'，
              - ?后面 部分 是 查询参数：mode=signup，mode是参数名，signup是参数值 */}

          {/* 切换登录和注册模式的链接 */}
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Sign up' : 'Sign In'}
          </Link>
          {/* 提交按钮 */}
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : (isLogin ? 'Log in' : 'Register')}
          </button>
        </div>
      </Form>
    </>
  );
}

// 导出AuthForm组件
export default AuthForm;
