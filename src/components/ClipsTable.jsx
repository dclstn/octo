import React from 'react';
import { Button, Checkbox, Table } from 'rsuite';
import styles from './ClipsTable.module.css';

const { Column, HeaderCell, Cell } = Table;

const CheckCell = ({
  rowData, onChange, checkedKeys, dataKey, ...props
}) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <Button className={styles.imageContainer} onClick={() => window.open(rowData.url)}>
      <img src={rowData[dataKey]} alt="thumbnail" width="100" />
    </Button>
  </Cell>
);

export default function ClipsTable({
  checkedKeys, setCheckedKeys, clips: data, ...props
}) {
  let checked = false;
  let indeterminate = false;

  // ngl I copied this else if mess and idk wtf it does
  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  function handleCheckAll(_, newChecked) {
    const keys = newChecked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  }

  function handleCheck(value, newChecked) {
    const keys = newChecked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  }

  return (
    <div className={styles.panel}>
      <Table
        {...props}
        rowHeight={85}
        autoHeight
        className={styles.table}
        hover={false}
        data={data}
      >
        <Column width={50} align="center">
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={(...args) => handleCheckAll(...args)}
              />
            </div>
          </HeaderCell>
          <CheckCell
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={(...args) => handleCheck(...args)}
          />
        </Column>
        <Column width={120} align="center">
          <HeaderCell />
          <ImageCell dataKey="thumbnail_url" />
        </Column>
        <Column width={100} align="left" fixed>
          <HeaderCell>Channel</HeaderCell>
          <Cell dataKey="broadcaster_name" />
        </Column>
        <Column width={200} align="left" fixed>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>
        <Column width={200} align="left" fixed>
          <HeaderCell>Views</HeaderCell>
          <Cell dataKey="view_count" />
        </Column>
      </Table>
    </div>
  );
}
