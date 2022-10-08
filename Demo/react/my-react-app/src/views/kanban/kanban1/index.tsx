import { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { KanbanBoard } from "./KanbanBoard.js";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { KanbanNewCard } from "./KanbanNewCard";
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

// 主要入口
function Hansen() {
  const [showAdd, setShowAdd] = useState<Boolean>(false);
  const [todoList, setTodoList] = useState<{ title: string; status: string }[]>(
    [
      { title: "开发任务-1", status: "2022-05-22 18:15" },
      { title: "开发任务-3", status: "2022-05-22 18:15" },
      { title: "开发任务-5", status: "2022-05-22 18:15" },
      { title: "测试任务-3", status: "2022-08-22 18:15" },
    ]
  );
  const [ongoingList, setOngoingList] = useState<
    { title: string; status: string }[]
  >([
    { title: "开发任务-4", status: "2022-05-22 18:15" },
    { title: "开发任务-6", status: "2022-06-22 18:15" },
    { title: "测试任务-2", status: "2022-07-22 18:15" },
  ]);
  const [doneList, setDoneList] = useState<{ title: string; status: string }[]>(
    [
      { title: "开发任务-2", status: "2022-06-24 18:15" },
      { title: "测试任务-1", status: "2022-07-03 18:15" },
    ]
  );
  const [isLoading, setIsLoading] = useState(true);

  // 拖拽的三个变量
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [dragSource, setDragSource] = useState<string | null>(null);
  const [dragTarget, setDragTarget] = useState<string | null>(null);

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
