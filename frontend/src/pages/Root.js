import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // 使用 useLoaderData 获取 token
  const token = useLoaderData();
  // 使用 useSubmit 获取提交函数
  const submit = useSubmit();
  // const navigation = useNavigation();

  useEffect(() => {
    // 如果 token 不存在，则返回
    if (!token) {
      return;
    }

    // 如果 token 是 'EXPIRED'，则提交注销请求
    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    // 获取 token 的有效期
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    // 设置定时器，在 token 过期时自动注销用户
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      {/* 主导航栏组件 */}
      <MainNavigation />
      {/* 主内容区域 */}
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        {/* 子路由组件 */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
