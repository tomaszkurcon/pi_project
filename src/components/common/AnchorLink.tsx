import { Anchor, AnchorProps, Group } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

type AnchorLinkProps = {
  children: React.ReactNode;
  to: string;
  onClick?: () => void;
} & AnchorProps;
const AnchorLink = ({ children, to,onClick, ...props }: AnchorLinkProps) => {
  return (
    <Link to={to} onClick={onClick}>
      <Anchor
        component="button"
        type="button"
        color="dimmed"

        {...props}
      >
        <Group>{children}</Group>
      </Anchor>
    </Link>
  );
};

export default AnchorLink;
