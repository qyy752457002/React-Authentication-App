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

  // 使用useSearchParams钩子获取URL参数
  const [searchParams] = useSearchParams();
  // 判断表单模式是登录还是注册
  const isLogin = searchParams.get('mode') === 'login';
  // 判断是否正在提交表单
  const isSubmitting = navigation.state === 'submitting';

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
