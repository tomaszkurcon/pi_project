import { Anchor, AnchorProps, Group } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

type AnchorLinkProps = {
  children: React.ReactNode;
  to: string;
} & AnchorProps;
const AnchorLink = ({ children, to, ...props }: AnchorLinkProps) => {
  return (
    <Link to={to}>
      <Anchor
        component="button"
        type="button"
        color="dimmed"
        size="xs"
        {...props}
      >
        <Group>{children}</Group>
      </Anchor>
    </Link>
  );
};

export default AnchorLink;
