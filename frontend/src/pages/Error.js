import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';

function ErrorPage() {
  // 使用 useRouteError() 钩子获取路由错误信息
  const error = useRouteError();

  let title = 'An error occurred!'; // 默认错误标题
  let message = 'Something went wrong!'; // 默认错误消息

  // 根据错误状态码设置不同的标题和消息
  if (error.status === 500) {
    message = error.data.message; // 获取服务器返回的错误消息
  }

  if (error.status === 404) {
    title = 'Not found!'; // 资源未找到的标题
    message = 'Could not find resource or page.'; // 资源未找到的消息
  }

  // 渲染页面内容组件，显示错误标题和消息
  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;

