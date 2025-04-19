import React, { useState } from 'react';
import { Drawer } from 'antd';

interface DrawerButtonProps {
  title: string;
  content: React.ReactNode;
  button: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'large' | 'default';
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

export function DrawerButton(props: DrawerButtonProps) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={showDrawer}>{props.button}</div>
      <Drawer
        title={props.title}
        onClose={onClose}
        open={open}
        size={props.size}
        placement={props.placement}
        footer={props.footer}
      >
        {props.content}
      </Drawer>
    </>
  );
}
