import { redirect } from 'react-router-dom';

// 获取令牌剩余时间
export function getTokenDuration() {
  // 从本地存储中获取过期时间
  const storedExpirationDate = localStorage.getItem('expiration');
  // 将过期时间转换为日期对象
  const expirationDate = new Date(storedExpirationDate);
  // 获取当前时间
  const now = new Date();
  // 计算剩余时间（毫秒）
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

// 获取身份验证令牌
export function getAuthToken() {
  // 从本地存储中获取令牌
  const token = localStorage.getItem('token');

  // 如果令牌不存在，则返回空
  if (!token) {
    return null;
  }

  // 获取令牌剩余时间
  const tokenDuration = getTokenDuration();

  // 如果令牌已过期，则返回“EXPIRED”
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  // 否则返回令牌
  return token;
}

// 令牌加载器
export function tokenLoader() {
  // 获取身份验证令牌
  const token = getAuthToken();
  return token;
}

// 检查身份验证加载器
export function checkAuthLoader() {
  // 获取身份验证令牌
  const token = getAuthToken();

  // 如果令牌不存在，则重定向到身份验证页面
  if (!token) {
    return redirect('/auth');
  }
}
