import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  color: ${({ active }) => (active ? "blue" : "#212121")};
  background-color: ${({ active }) => (active ? "#eee" : "#fff")};
`;

export const TreeItem = ({
  title,
  activeId,
  selectActiveId,
  id,
  items,
  allItems
}) => {
  const onSelect = e => {
    e.stopPropagation();
    selectActiveId(id);
  };

  return (
    <ItemContainer active={activeId === id} onClick={onSelect}>
      <div>{title}</div>
      <div>
        {items &&
          items.map(renderTreeItems(selectActiveId, activeId, allItems))}
      </div>
    </ItemContainer>
  );
};

export function renderTreeItems(selectActiveId, activeId, allItems) {
  return item => {
    if (typeof item === "string") return null;

    return (
      <TreeItem
        key={item.id}
        id={item.id}
        selectActiveId={selectActiveId}
        title={item.title}
        activeId={activeId}
        items={allItems[item.id] && allItems[item.id].children}
        allItems={allItems}
      />
    );
  };
}
