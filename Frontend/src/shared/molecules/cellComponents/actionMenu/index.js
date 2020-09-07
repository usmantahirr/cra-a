import React from 'react';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import MenuType from './menuType';

const ActionMenu = props => {
  const actionClick = (e, type) => {
    props.actionParam(e, type, props.data);
  };

  const menu = (
    <Menu>
      <Menu.Item key="status">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.status)}
          onKeyDown={e => actionClick(e, MenuType.status)}
        >
          Status Click
        </button>
      </Menu.Item>

      <Menu.Item key="status3">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.clear)}
          onKeyDown={e => actionClick(e, MenuType.clear)}
        >
          Status Click3
        </button>
      </Menu.Item>

      <Menu.Item key="status5">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.zinda)}
          onKeyDown={e => actionClick(e, MenuType.zinda)}
        >
          Status Click5
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <MoreOutlined />
    </Dropdown>
  );
};

export default ActionMenu;
