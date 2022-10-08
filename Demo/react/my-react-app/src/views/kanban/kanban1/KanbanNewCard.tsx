import { useRef, useEffect, useState } from "react";

// 看板列表
export const KanbanNewCard = ({
  onSubmit,
}: {
  onSubmit: (title: string) => any;
}) => {
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
