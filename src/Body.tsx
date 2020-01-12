import React, {
  createElement,
  Fragment,
  useRef,
  useEffect,
  useState
} from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { useDrop } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";

const PlaceHolder = styled.div`
  padding: 0.5rem;
`;

export function renderBodyItems(activeId, allItems) {
  return item => {
    if (typeof item === "string") return item;
    if (!allItems[item.id]) return;
    return (
      <BodyItem
        key={item.id}
        id={item.id}
        title={item.title}
        props={allItems[item.id].props}
        activeId={activeId}
        items={allItems[item.id] && allItems[item.id].children}
        allItems={allItems}
        component={item.component}
      />
    );
  };
}

const Highlight = styled.div<{ show: boolean; rect: any }>`
  position: fixed;
  display: ${({ show }) => (show ? "block" : "none")};
  box-shadow: inset 0 0 0px 2px dodgerblue;
  z-index: 1;
  pointer-events: none;

  ${({ rect }) => rect}
`;

export default function HighlightPortal({ children }) {
  const [el] = useState(() => document.getElementById("highlights"));
  return createPortal(children, el);
}

export const BodyItem = ({
  title,
  component,
  activeId,
  props,
  id,
  items,
  allItems
}) => {
  const ref = useRef<HTMLElement>(null);
  const [rect, setRect] = useState();
  const isActive = activeId === id;

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "any",
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      console.log(id, title, { didDrop });

      if (didDrop) {
        return { id: null };
      }

      return { id };
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  });

  useEffect(() => {
    if (!isActive && !isOver) return;
    if (!ref.current) {
      return console.warn(`Component ${title} does not forward ref`);
    }
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    setRect({ top, left, width, height });
  }, [isActive, title, items, props, isOver]);

  return (
    <Fragment>
      <HighlightPortal>
        <Highlight show={isActive || isOver} rect={rect} />
      </HighlightPortal>
      {createElement(
        component.component,
        { ...props, ref: composeRefs(ref, drop) },
        ...(items.length
          ? items.map(renderBodyItems(activeId, allItems))
          : [<PlaceHolder>{title}</PlaceHolder>])
      )}
    </Fragment>
  );
};
