import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import sharedService from '../../services/shared.service';

function CustomSelect({ options, ...props }) {
  const [asyncOptions, setAsyncOptions] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await sharedService.getDataByUrl(props.url);
      if (data && data.length > 0) setAsyncOptions(data.map(c => ({ id: c._id, text: c.name, value: c._id })));
      else setAsyncOptions([]);
    } catch (error) {
      // error
    }
  };

  useEffect(() => {
    if (props.url) {
      fetchData();
    }
  }, []);

  const renderSelect = ({ url, ...ownProps }, ownOptions) => {
    if (url) ownProps.labelInValue = true;
    return (
      <Select {...ownProps} className="custom-control" getPopupContainer={node => node.parentNode}>
        {ownOptions &&
          ownOptions.map(option => (
            <Select.Option key={option.id} value={option.value}>
              {option.text}
            </Select.Option>
          ))}
      </Select>
    );
  };
  return props.url ? asyncOptions && renderSelect(props, asyncOptions) : renderSelect(props, options);
}

export default CustomSelect;
