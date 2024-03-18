import classes from './PageContent.module.css';

function PageContent({ title, children }) {
  // 页面内容组件，包含标题和子组件
  return (
    <div className={classes.content}>
      {/* 标题 */}
      <h1>{title}</h1>
      {/* 子组件 */}
      {children}
    </div>
  );
}

export default PageContent;

