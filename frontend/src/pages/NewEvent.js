import EventForm from '../components/EventForm';

// 新建活动页面组件
function NewEventPage() {
  // 渲染 EventForm 组件，并指定提交方法为 POST
  return <EventForm method="post" />;
}

export default NewEventPage;



