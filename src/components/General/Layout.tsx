import React, { FunctionComponent, forwardRef, FC } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const spaceMap = {
  xs: ".125rem",
  xsmall: ".125rem",
  sm: ".5rem",
  small: ".5rem",
  medium: "1rem",
  md: "1rem",
  large: "1.5rem",
  lg: "1.5rem"
};

type Align = "center" | "flex-end" | "flex-start";
type Justify = "center" | "space-around" | "space-between";

interface GeneralLayoutProps {
  align?: Align;
  justify?: Justify;
  space?: string;
}

const StackLayout = styled.div<GeneralLayoutProps>`
    align-items: ${({ align }) => align};
    /* display: ${({ align }) => (align !== undefined ? "flex" : "block")}; */
    display: flex;
    flex-direction: column;

    & > * + * {
        margin-top: ${({ space }) => spaceMap[space]};
    }
`;

const StackInner: FC<GeneralLayoutProps> = (
  { children, space, align },
  ref
) => {
  return (
    <StackLayout ref={ref} space={space} align={align}>
      {children}
    </StackLayout>
  );
};
export const Stack = forwardRef(StackInner);

Stack.propTypes = {
  space: PropTypes.oneOf(["medium", "large", "small"])
};

const Split = styled.div<{ align?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ align }) => align};
`;

export const SplitLayout: FunctionComponent<{ align?: string }> = ({
  children,
  align
}) => {
  return <Split align={align}>{children}</Split>;
};

const InlineLayout = styled.div<GeneralLayoutProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: ${({ align }) => (align !== undefined ? align : "flex-start")};
  justify-content: ${({ justify }) =>
    justify !== undefined ? justify : "flex-start"};

  margin-left: ${({ space }) => "-" + spaceMap[space]};
  margin-top: ${({ space }) => "-" + spaceMap[space]};

  & > * {
    margin-left: ${({ space }) => spaceMap[space]};
    margin-top: ${({ space }) => spaceMap[space]};
  }
`;

export const InlineOuter: FunctionComponent<GeneralLayoutProps> = (
  { children, space, align, justify },
  ref
) => {
  return (
    <InlineLayout ref={ref} align={align} justify={justify} space={space}>
      {children}
    </InlineLayout>
  );
};

export const Inline: FunctionComponent<GeneralLayoutProps> = forwardRef(
  InlineOuter
);
