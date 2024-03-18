import PageContent from '../components/PageContent';

function HomePage() {
  // 渲染页面内容组件，传递标题为 "Welcome!"
  return (
    <PageContent title="Welcome!">
      {/* 在页面内容中添加欢迎消息 */}
      <p>Browse all our amazing events!</p>
    </PageContent>
  );
}

export default HomePage;
