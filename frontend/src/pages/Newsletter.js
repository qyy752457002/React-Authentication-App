import NewsletterSignup from '../components/NewsletterSignup';
import PageContent from '../components/PageContent';

// Newsletter 页面组件
function NewsletterPage() {
  return (
    // 使用 PageContent 组件包裹 NewsletterSignup 组件，传入标题
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

// 导出 action 函数，用于处理 Newsletter 页面的请求
export async function action({ request }) {
  // 从请求中获取表单数据
  const data = await request.formData();
  // 从表单数据中获取 email
  const email = data.get('email');

  // 将 email 发送到后端 newsletter 服务器...
  console.log(email);
  // 返回成功消息
  return { message: 'Signup successful!' };
}

