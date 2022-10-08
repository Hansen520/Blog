// 拆分column
export const KanbanColumn = ({
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
