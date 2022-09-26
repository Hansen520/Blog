import { useState } from "react";
import { Button } from "antd";
import "./index.less";

const ongoingList = [
  { title: "开发任务-4", status: "22-05-22 18:15" },
  { title: "开发任务-6", status: "22-05-22 18:15" },
  { title: "测试任务-2", status: "22-05-22 18:15" },
];
const doneList = [
  { title: "开发任务-2", status: "22-05-22 18:15" },
  { title: "测试任务-1", status: "22-05-22 18:15" },
];
// 看板卡片
const KanbanCard = ({ title, status }: { title: string; status: string }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
};
// 看板列表
const KanbanNewCard = ({ onSubmit }) => {
  console.log(onSubmit, 25);
  const [title, setTitle] = useState("");
  const handleChange = (evt: any) => {
    console.log(evt, 32);
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt: any) => {
    console.log(evt, 35);
    if (evt.key === "Enter") {
      onSubmit(title);
    }
  };

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  );
};
// 拆分main
const KanbanBoard = ({ children }) => (
  <main className="kanban-board">{children}</main>
);
// 拆分column
const KanbanColumn = ({ children, className, title }) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};
function Hansen() {
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "22-05-22 18:15" },
    { title: "开发任务-3", status: "22-05-22 18:15" },
    { title: "开发任务-5", status: "22-05-22 18:15" },
    { title: "测试任务-3", status: "22-05-22 18:15" },
  ]);
  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit = (title) => {
    setTodoList((currentTodoList) => [
      { title, status: new Date().toDateString() },
      ...currentTodoList,
    ]);
    setShowAdd(false);
  };
  const todoTotle = (
    <>
      <span>待处理</span>
      <Button onClick={handleAdd} disabled={showAdd}>
        &#8853; 添加新卡片
      </Button>
    </>
  );
  return (
    <div className="my-hansen">
      <header className="my-header">
        <h1>我的看板</h1>
      </header>
      <KanbanBoard>
        <KanbanColumn className="column-todo" title={todoTotle}>
          {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
          {todoList.map((props) => (
            <KanbanCard {...props} key={props.title} />
          ))}
        </KanbanColumn>
        <KanbanColumn className="kanban-column" title>
          <h2>进行中</h2>
          <ul>
            {ongoingList.map((props) => (
              <KanbanCard {...props} key={props.title} />
            ))}
          </ul>
        </KanbanColumn>
        <KanbanColumn className="kanban-column" title>
          <h2>已完成</h2>
          <ul>
            {doneList.map((props) => (
              <KanbanCard {...props} key={props.title} />
            ))}
          </ul>
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default Hansen;
