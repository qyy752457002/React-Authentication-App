import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  // 渲染认证表单组件
  return <AuthForm />;
}

export default AuthenticationPage;

// 处理认证操作的异步函数
export async function action({ request }) {
  // 解析 URL 中的查询参数
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  // 检查认证模式是否为支持的模式
  if (mode !== 'login' && mode !== 'signup') {
    // 如果不是支持的模式，返回状态码为 422 的 JSON 响应
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  // 从请求中获取表单数据
  const data = await request.formData();
  // 构建认证数据对象
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  // 发起认证请求
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST', // 使用 POST 方法
    headers: {
      'Content-Type': 'application/json', // 设置请求头的 Content-Type 为 JSON
    },
    body: JSON.stringify(authData), // 将认证数据对象转换为 JSON 格式并作为请求体发送
  });

  // 如果认证失败（状态码为 422 或 401），直接返回响应
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  // 如果请求不成功，抛出一个包含错误信息的 JSON 响应
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // 如果认证成功，解析响应数据
  const resData = await response.json();
  const token = resData.token;

  // 将认证成功后的令牌和过期时间存储到本地存储中
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  // 重定向到根路径
  return redirect('/');
}
