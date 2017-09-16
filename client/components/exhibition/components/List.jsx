import React from 'react';
import { Table, Button } from 'antd';
import cfg from './../../../../config/domain';
import s from './../exhibition';

export default (data) => {
  const sourceData = data.data;
  const columns = [
    {
      title: '展览名称',
      dataIndex: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'update_time',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: id => <div>
        <Button type="primary" className={s.edit} onClick={() => data.detail(id)}>编辑</Button>
        <Button type="danger" onClick={() => data.delete(id)}>删除</Button>
      </div>,
    }
  ];
  return (
    <Table
      dataSource={sourceData}
      columns={columns}
      pagination={true}
    />
  );
}

