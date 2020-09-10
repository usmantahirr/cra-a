import React from 'react';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import MenuType from './menuType';

const ActionMenu = props => {
  const actionClick = (e, type) => {
    if (props.actionParam) {
      props.actionParam(e, type, props.data);
    }
  };

  const menu = (
    <Menu className="custom-dropdown">
      <Menu.Item key="status">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.status)}
          onKeyDown={e => actionClick(e, MenuType.status)}
          className="ant-btn-dropown"
        >
          <i>
            <img src="/assets/img/icon-track.svg" alt="" />
          </i>
          <span>Track Status</span>
        </button>
      </Menu.Item>

      <Menu.Item key="status2">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.clear)}
          onKeyDown={e => actionClick(e, MenuType.clear)}
          className="ant-btn-dropown"
        >
          <i>
            <img src="/assets/img/icon-change.svg" alt="" />
          </i>
          <span>Change Information</span>
        </button>
      </Menu.Item>

      <Menu.Item key="status3">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.zinda)}
          onKeyDown={e => actionClick(e, MenuType.zinda)}
          className="ant-btn-dropown"
        >
          <i>
            <img src="/assets/img/icon-reapply.svg" alt="" />
          </i>
          <span>Reapply</span>
        </button>
      </Menu.Item>
      <Menu.Item key="status4">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.zinda)}
          onKeyDown={e => actionClick(e, MenuType.zinda)}
          className="ant-btn-dropown"
        >
          <i>
            <img src="/assets/img/icon-refund.svg" alt="" />
          </i>
          <span>Refund</span>
        </button>
      </Menu.Item>
      <Menu.Item key="status5">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.zinda)}
          onKeyDown={e => actionClick(e, MenuType.zinda)}
          className="ant-btn-dropown"
        >
          <i>
            <img src="/assets/img/icon-lab.svg" alt="" />
          </i>
          <span>Change Lab</span>
        </button>
      </Menu.Item>
      <Menu.Item key="status5">
        <button
          type="button"
          onClick={e => actionClick(e, MenuType.zinda)}
          onKeyDown={e => actionClick(e, MenuType.zinda)}
          className="ant-btn-dropown"
        >
          <i>
            <img src="/assets/img/icon-download.svg" alt="" />
          </i>
          <span>Download Invoice</span>
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
