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
      dataIndex: 'small_img',
      render: small_img => <img src={`${cfg.img}${small_img}`} />,
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
// id: 1, name: "1111", small_img: "40855ac3406d1.jpg", big_img: "025cc4e39d792.jpg", create_time: "2017-09-03T08:25:24.000Z"

