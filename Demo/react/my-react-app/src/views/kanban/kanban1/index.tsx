import { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import "./index.less";

const DATA_STORE_KEY = "kanban-data-store"; // localstorage
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;

// 拖拽的三个变量
const COLUMN_KEY_TODO = "todo";
const COLUMN_KEY_ONGOING = "ongoing";
const COLUMN_KEY_DONE = "done";

// 看板卡片(在新增卡片的时候status会变化)
const KanbanCard = ({
  title,
  status,
  onDragStart,
}: {
  title: string;
  status: string;
  onDragStart: any;
}) => {
  const [displayTime, setDisplayTime] = useState(status);
  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      let relativeTime = "刚刚";
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
      } else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
      } else if (DAY <= timePassed) {
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
      }
      setDisplayTime(relativeTime);
    };
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [status]);

  // 拖拽
  const handleDragStart = (evt: any) => {
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("text/plain", title);
    onDragStart && onDragStart(evt);
  };
  return (
    <li className="kanban-card" draggable onDragStart={handleDragStart}>
      <div className="card-title">{title}</div>
      <div className="card-status">{displayTime}</div>
    </li>
  );
};
// 看板列表
const KanbanNewCard = ({ onSubmit }: { onSubmit: (title: string) => any }) => {
  const [title, setTitle] = useState<string>("");
  const handleChange = (evt: any) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt: any) => {
    if (evt.key === "Enter") {
      onSubmit(title);
    }
  };

  const inputElem = useRef<HTMLInputElement>(null);
  // 这种使用方法会保证 func 只在组件挂载的提交阶段执行一次，接下来的组件更新时不会再执行。
  useEffect(() => {
    inputElem.current!.focus();
  }, []);
  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input
          type="text"
          value={title}
          ref={inputElem}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </li>
  );
};
// 拆分main
const KanbanBoard = ({ children }: { children: any }) => (
  <main className="kanban-board">{children}</main>
);
// 拆分column
const KanbanColumn = ({
  children,
  className,
  title,
  setIsDragSource = () => {},
  setIsDragTarget = () => {},
  onDrop,
}: {
  children?: any;
  className: string;
  title: HTMLBaseElement | any;
  setIsDragSource?: (x: Boolean) => any;
  setIsDragTarget?: (x: Boolean) => any;
  onDrop?: any;
}) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section
      className={combinedClassName}
      onDragStart={() => setIsDragSource(true)}
      // 经过
      onDragOver={(evt) => {
        evt.preventDefault();
        // console.log(evt, 97);
        evt.dataTransfer.dropEffect = "move";
        setIsDragTarget(true);
      }}
      // 离开
      onDragLeave={(evt) => {
        evt.preventDefault();
        // console.log(evt, 102);
        evt.dataTransfer.dropEffect = "none";
        setIsDragTarget(false);
      }}
      // 下落
      onDrop={(evt) => {
        evt.preventDefault();
        onDrop && onDrop(evt);
        // console.log(evt, 107);
      }}
      // 下落结束
      onDragEnd={(evt) => {
        evt.preventDefault();
        // console.log(evt, 111);
        setIsDragSource(false);
        setIsDragTarget(false);
      }}
    >
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};
// 主要入口
function Hansen() {
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "2022-05-22 18:15" },
    { title: "开发任务-3", status: "2022-05-22 18:15" },
    { title: "开发任务-5", status: "2022-05-22 18:15" },
    { title: "测试任务-3", status: "2022-08-22 18:15" },
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: "开发任务-4", status: "2022-05-22 18:15" },
    { title: "开发任务-6", status: "2022-06-22 18:15" },
    { title: "测试任务-2", status: "2022-07-22 18:15" },
  ]);
  const [doneList, setDoneList] = useState([
    { title: "开发任务-2", status: "2022-06-24 18:15" },
    { title: "测试任务-1", status: "2022-07-03 18:15" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // 拖拽的三个变量
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragSource, setDragSource] = useState<any>(null);
  const [dragTarget, setDragTarget] = useState<any>(null);

  const handleDrop = (evt: any) => {
    if (
      !draggedItem ||
      !dragSource ||
      !dragTarget ||
      dragSource === dragTarget
    ) {
      return;
    }
    // 避免重复
    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGOING]: setOngoingList,
      [COLUMN_KEY_DONE]: setDoneList,
    };
    if (dragSource) {
      console.log(dragSource, 191);
      updaters[dragSource](
        // currentStat 为存在的原始数据
        (currentStat: any) => {
          console.log(currentStat, draggedItem, 194);
          // 保留剩下的数据
          return currentStat.filter(
            (item: any) => !Object.is(item, draggedItem)
          );
        }
      );
    }
    if (dragTarget) {
      console.log(dragTarget, 204);
      updaters[dragTarget]((currentStat: any) => [draggedItem, ...currentStat]);
    }
  };
  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const kanbanColumnData = JSON.parse(data as string);
        setTodoList(kanbanColumnData.todoList);
        setOngoingList(kanbanColumnData.ongoingList);
        setDoneList(kanbanColumnData.doneList);
      }

      setIsLoading(false);
    }, 1000);
  }, []);
  const handleAdd = (evt: any) => {
    setShowAdd(true);
  };
  const handleSubmit = (title: string) => {
    setTodoList((currentTodoList) => [
      { title, status: new Date().toDateString() },
      ...currentTodoList,
    ]);
    setShowAdd(false);
  };
  // 保存所有的
  const handleSaveAll = () => {
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList,
    });
    window.localStorage.setItem(DATA_STORE_KEY, data);
  };
  const todoTitle = (
    <>
      <span>待处理</span>
      <Button onClick={handleAdd} disabled={showAdd}>
        &#8853; 添加新卡片
      </Button>
    </>
  );

  return (
    <div className="my-kanban">
      <header className="my-header">
        我的看板
        <h5>
          <button onClick={handleSaveAll}>保存所有的卡片</button>
        </h5>
      </header>
      <KanbanBoard>
        {!isLoading ? (
          <>
            <KanbanColumn
              className="column-todo"
              title={todoTitle}
              setIsDragSource={(isSrc) =>
                setDragSource(isSrc ? COLUMN_KEY_TODO : null)
              }
              setIsDragTarget={(isTgt) =>
                setDragTarget(isTgt ? COLUMN_KEY_TODO : null)
              }
              onDrop={handleDrop}
            >
              {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
              {todoList.map((props) => (
                <KanbanCard
                  {...props}
                  onDragStart={() => setDraggedItem(props)}
                  key={props.title}
                />
              ))}
            </KanbanColumn>
            <KanbanColumn
              title="进行中"
              className="column-ongoing"
              setIsDragSource={(isSrc) =>
                setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)
              }
              setIsDragTarget={(isTgt) =>
                setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)
              }
              onDrop={handleDrop}
            >
              <ul>
                {ongoingList.map((props) => (
                  <KanbanCard
                    {...props}
                    onDragStart={() => setDraggedItem(props)}
                    key={props.title}
                  />
                ))}
              </ul>
            </KanbanColumn>
            <KanbanColumn
              title="已完成"
              className="column-done"
              setIsDragSource={(isSrc) =>
                setDragSource(isSrc ? COLUMN_KEY_DONE : null)
              }
              setIsDragTarget={(isTgt) =>
                setDragTarget(isTgt ? COLUMN_KEY_DONE : null)
              }
              onDrop={handleDrop}
            >
              <ul>
                {doneList.map((props) => (
                  <KanbanCard
                    {...props}
                    onDragStart={() => setDraggedItem(props)}
                    key={props.title}
                  />
                ))}
              </ul>
            </KanbanColumn>
          </>
        ) : (
          <>
            <KanbanColumn title="读取中..." className=""></KanbanColumn>
          </>
        )}
      </KanbanBoard>
    </div>
  );
}

export default Hansen;
