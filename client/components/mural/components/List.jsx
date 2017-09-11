import React from 'react';
import { Table, Button } from 'antd';
import cfg from './../../../../config/domain';

export default (data) => {
  const sourceData = data.data;
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
    },
    {
      title: '缩略图',
      dataIndex: 'thumb_img',
      render: thumb_img => <img src={`${cfg.img}${thumb_img}`} />,
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

