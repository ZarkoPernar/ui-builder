import React, { forwardRef } from "react";
import styled from "styled-components";
import { Inline } from "./Layout";
import { Text } from "../Text/Text";

const brandColors = {
  primary: "rgb(0, 109, 255)",
  default: "#f1f1f1",
  success: "#008560",
  danger: "#D32F2F"
};

const buttonTextColor = {
  default: "#4e4d4d",
  primaryLight: "#1565c0",
  successLight: "#027152",
  dangerLight: "#ce1856",
  danger: "#fff",
  success: "#fff",
  primary: "#fff",
  google: "#fff",
  facebook: "#fff"
};

const buttonBgColor = {
  ...brandColors,
  primaryLight: "rgba(0,109,255, .1)",
  successLight: "rgba(0,133,96, .1)",
  dangerLight: "rgba(255, 87, 34, 0.1)",
  google: "#de5246",
  facebook: "#3b5998"
};

const focusColor = {
  primary: "#6bbbfb",
  default: "#e2e2e2",
  danger: "red",
  google: "red",
  facebook: "#6bbbfb"
};

interface ButtonProps {
  full?: boolean;
  color?: string;
}

const buttonStyle = `
    font-weight: 400;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    user-select: none;
    line-height: 1.5;
    cursor: pointer;
    white-space: nowrap;
    font-size: 100%;
    padding: 0.375em 0.75em;
    border-radius: 0.25rem;
    text-decoration: none;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    -webkit-tap-highlight-color: transparent;
    outline: none;
`;

export const ButtonLink = styled.a<ButtonProps>`
    ${buttonStyle}
    display: ${({ full }) => (full ? "flex" : "inline-flex")};
    width: ${({ full }) => (full ? "100%" : "auto")};
    color: ${props => buttonTextColor[props.color]};
    background-color: ${props => buttonBgColor[props.color]};


    &:focus {
        box-shadow: 0 0 0 2px ${props => focusColor[props.color]};
    }
`;

export const InnerButton = styled.button<ButtonProps>`
    ${buttonStyle}
    display: ${({ full }) => (full ? "flex" : "inline-flex")};
    width: ${({ full }) => (full ? "100%" : "auto")};
    color: ${props => buttonTextColor[props.color]};
    background-color: ${props => buttonBgColor[props.color]};

    &:focus {
        box-shadow: 0 0 0 2px ${props => focusColor[props.color]};
    }

    &[disabled] {
        opacity: .6
    }

`;

const Icon = styled.span`
  font-size: 1.2rem;
  line-height: 1;
  margin-top: -1px;
`;

interface ButtonProps {
  color?: string;
  iconLeft?: React.ReactElement;
}

export const ButtonOuter: React.FC<ButtonProps> = (
  { children, color, iconLeft, ...props },
  ref
) => {
  return (
    <InnerButton ref={ref} color={color} {...props}>
      <Inline space="sm" align="center">
        {iconLeft && <Icon>{iconLeft}</Icon>}
        <Text>{children}</Text>
      </Inline>
    </InnerButton>
  );
};

export const Button = forwardRef(ButtonOuter);

Button.defaultProps = {
  color: "default"
};

const InnerIconButton = styled(InnerButton)`
  width: 2rem;
  height: 2rem;
`;

export const IconButton: React.FC<{
  color?: string;
}> = ({ children, color, ...props }) => {
  return (
    <InnerIconButton color={color} {...props}>
      <Icon>{children}</Icon>
    </InnerIconButton>
  );
};

const alertBGColorMap = {
  default: "#f1f1f1",
  danger: "rgba(233, 30, 99, 0.078)"
};

export const Alert = styled.div`
  padding: 1rem;
  background-color: ${({ color }) => alertBGColorMap[color]};
  border-radius: 0.5rem;
`;

Alert.defaultProps = {
  color: "default"
};

export const Image = styled.img`
  max-width: 100%;
`;
