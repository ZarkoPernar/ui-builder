import React from "react";
import styled from "styled-components";

const sizeMap = {
    sm: ".8rem",
    md: "1rem",
    lg: "1.25rem",
};

const colorMap = {
    light: "#929292",
};

interface Props {
    size?: string;
    weight?: number;
}

const InnerText = styled.span<Props>`
    font-size: ${({size}) => sizeMap[size] || "auto"};
    font-weight: ${({weight}) => weight};
    color: ${({color}) => colorMap[color] || "auto"};
`;

export const Text: React.FC<Props> = ({children, size, ...props}) => {
    return (
        <InnerText size={size} {...props}>
            {children}
        </InnerText>
    );
};
