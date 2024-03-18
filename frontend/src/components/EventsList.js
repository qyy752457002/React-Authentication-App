// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

import classes from './EventsList.module.css';

// EventsList组件用于展示事件列表
function EventsList({events}) {
  // const events = useLoaderData();

  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      {/* 事件列表 */}
      <ul className={classes.list}>
        {/* 遍历事件列表 */}
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            {/* 事件链接 */}
            <Link to={`/events/${event.id}`}>
              {/* 事件图片 */}
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                {/* 事件标题 */}
                <h2>{event.title}</h2>
                {/* 事件日期 */}
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 导出EventsList组件
export default EventsList;

