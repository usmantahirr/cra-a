import React from 'react';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { getMenuList } from './actionMenuConfig';

const ActionMenu = props => {
  const { data = null } = props;
  const actionClick = (e, type) => {
    if (props.actionParam) {
      props.actionParam(e, type, props.data);
    }
  };

  const menueItem = status => {
    const menuList = getMenuList(status);
    return (
      menuList &&
      menuList.map(item => {
        return (
          <Menu.Item key={item.id}>
            <button
              type="button"
              onClick={e => actionClick(e, item.cmd)}
              onKeyDown={e => actionClick(e, item.cmd)}
              className="ant-btn-dropown"
            >
              <i>
                <img src={item.icon} alt="" />
              </i>
              <span>{item.label}</span>
            </button>
          </Menu.Item>
        );
      })
    );
  };

  const menu = <Menu className="custom-dropdown">{data && menueItem(data.application_status)}</Menu>;

  return data && data.application_status && getMenuList(data.application_status) ? (
    <Dropdown overlay={menu} trigger={['click']}>
      <MoreOutlined />
    </Dropdown>
  ) : null;
};

export default ActionMenu;
