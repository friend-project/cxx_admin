import React from 'react';
import { Table, Button } from 'antd';
import cfg from './../../../../config/domain';

export default (data) => {
  const sourceData = data.data;
  const columns = [
    {
      title: '展览名称',
      dataIndex: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: id => <Button onClick={() => data.delete(id)}>删除</Button>,
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

