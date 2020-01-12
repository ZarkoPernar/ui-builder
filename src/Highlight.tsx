import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const Ctx = createContext({});

export const useHighlight = () => {
  return useContext(Ctx);
};

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

export const HighlightProvider = ({ children }) => {
  const [rect, setRect] = useState();
  const setHighlight = useCallback(ref => {
    if (!ref.current) return;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    setRect({ top, left, width, height });
  }, []);

  const value = useMemo(() => ({ setHighlight }), [setHighlight]);

  return (
    <Ctx.Provider value={value}>
      <HighlightPortal>
        <Highlight show rect={rect} />
      </HighlightPortal>

      {children}
    </Ctx.Provider>
  );
};
