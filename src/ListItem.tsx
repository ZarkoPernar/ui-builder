import React from "react";
import { useDrag } from "react-dnd";

const ListItem = ({ children, name, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: "any" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log({ item, dropResult });
      if (!dropResult) return;
      onDrop(dropResult);
      //   if (item && dropResult) {
      //     alert(`You dropped ${item.name} into ${dropResult.name}!`);
      //   }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ opacity }}>
      {children}
    </div>
  );
};

export default ListItem;
