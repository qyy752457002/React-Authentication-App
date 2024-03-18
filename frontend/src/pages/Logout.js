import { redirect } from 'react-router-dom';

// 定义 action 函数
export function action() {
  // 从 localStorage 中移除 token 和 expiration
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  // 重定向到根路径 '/'
  return redirect('/');
}
