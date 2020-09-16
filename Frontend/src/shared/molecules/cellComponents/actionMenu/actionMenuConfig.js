// import { APPLICATION_STATUS_TYPES } from '../../../../config';
import { ContextMenuCmd } from '../../../../config';

const iconTrack = '/assets/img/icon-track.svg';
const iconChange = '/assets/img/icon-change.svg';
// const iconReApply = '/assets/img/icon-reapply.svg';
// const iconRefundTrack = '/assets/img/icon-refund.svg';
// const iconLab = '/assets/img/icon-lab.svg';

export const menuItemListByApplicationStatus = {
  DRAFTED: [
    { id: '1', icon: iconTrack, label: 'Edit Application', cmd: ContextMenuCmd.edit },
    // { id: '2', icon: iconChange, label: 'View Application', cmd: ContextMenuCmd.view },
  ],
  SUBMITTED: [{ id: '2', icon: iconChange, label: 'View Application', cmd: ContextMenuCmd.view }],
};

export const getMenuList = status => {
  const key = status && status.toUpperCase().replace(' ', '_');
  return menuItemListByApplicationStatus[key];
};
