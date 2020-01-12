import React, { useState, Fragment, createElement, Children } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import { DndProvider, useDrop } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import "./App.css";
import { Text } from "./components/Text/Text";
import { renderBodyItems } from "./Body";
import { renderTreeItems } from "./Tree";
import componentMap from "./componentMap";
import ListItem from "./ListItem";

const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
`;

const Body = styled.div`
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  overflow-y: auto;
`;

const BodyDropInner = styled.div`
  min-height: 100vh;
`;

const BodyDrop = ({ children }) => {
  const [{}, drop] = useDrop({
    accept: "any",
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      console.log("App", { didDrop });
      if (didDrop) {
        return { id: null };
      }

      return { id: undefined };
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  });

  return <BodyDropInner ref={drop}>{children}</BodyDropInner>;
};

const Sidebar = styled.div``;

const RightPanel = styled.div``;

const componentKeys = Object.keys(componentMap);
const componentList = componentKeys.map(key => ({
  ...componentMap[key],
  title: key
}));
const options = componentKeys.map(key => <option value={key}>{key}</option>);

function App() {
  const [type, setType] = useState("div");
  const onSelectType = e => {
    setType(e.target.value);
  };

  const [rootItems, setRootItems] = useState([]);
  const [items, setTree] = useState({});
  const [activeId, setActiveId] = useState("");
  const activeItem = items[activeId]?.component;
  const [text, setText] = useState("");
  const onChangeText = e => {
    setText(e.target.value);
  };

  const selectActiveId = id => {
    if (id === activeId) {
      setActiveId("");
    } else {
      setActiveId(id);
    }
  };

  const onDrop = ({ id, item }) => {
    addItemToTree({ targetId: id, item, title: item.title });
  };

  const changeProp = ({ name, value }) => {
    setTree(s => ({
      ...s,
      [activeId]: {
        ...s[activeId],
        props: {
          ...s[activeId].props,
          [name]: value
        }
      }
    }));
  };

  const changeText = () => {
    setText("");
    setTree(s => ({
      ...s,
      [activeId]: {
        ...s[activeId],
        children: [...s[activeId].children, text]
      }
    }));
  };

  const addItem = () => {
    addItemToTree({
      item: componentMap[type],
      targetId: activeId,
      title: type
    });
  };

  const addItemToTree = ({ targetId, item, title }) => {
    const id = v4();

    if (!targetId) {
      setRootItems([
        ...rootItems,
        {
          props: item.component.defaultProps || {},
          component: item,
          title: title,
          id
        }
      ]);
      setTree(s => ({
        ...s,
        [id]: {
          component: item,
          title: title,
          id,
          props: item.component.defaultProps || {},
          children: []
        }
      }));
      return;
    }

    setTree(s => ({
      ...s,
      [id]: {
        component: item,
        title: title,
        id,
        props: item.component.defaultProps || {},
        children: []
      },
      [targetId]: {
        ...s[targetId],
        children: [
          ...s[targetId].children,
          { component: item, title: title, id }
        ]
      }
    }));
  };

  return (
    <DndProvider backend={Backend}>
      <AppContainer>
        <Sidebar>
          {activeItem?.component === Text ? (
            <Fragment>
              <input onChange={onChangeText} value={text} />
              <button onClick={changeText}>set text</button>
            </Fragment>
          ) : (
            <Fragment>
              <button onClick={addItem}>add item</button>
              <select onChange={onSelectType} defaultValue="div">
                {options}
              </select>
            </Fragment>
          )}
          <h2>Sidebar</h2>
          {rootItems.map(renderTreeItems(selectActiveId, activeId, items))}
        </Sidebar>
        <Body>
          {/* <BodyDrop> */}

          {rootItems.map(renderBodyItems(activeId, items))}

          {/* </BodyDrop> */}
        </Body>
        <RightPanel>
          {activeItem?.props?.map(prop => {
            return (
              <div>
                <div>{prop.name}</div>
                <select
                  onChange={e => {
                    changeProp({
                      name: prop.name,
                      value: e.target.value
                    });
                  }}
                >
                  <option value=""></option>

                  {prop.availableValues.map(val => (
                    <option value={val}>{val}</option>
                  ))}
                </select>
              </div>
            );
          })}
          {componentList.map(item => {
            return (
              <ListItem
                onDrop={({ id }) => onDrop({ id, item })}
                name={item.title}
              >
                {createElement(item.component, null, item.title)}
              </ListItem>
            );
          })}
        </RightPanel>
      </AppContainer>
    </DndProvider>
  );
}

export default App;
