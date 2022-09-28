import React, { useRef } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import {
  ProForm,
  ProFormText,
  ProTable,
  TableDropdown,
} from "@ant-design/pro-components";
import { Button, Dropdown, Menu, Space, Tag } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import request from "umi-request";

const Test1 = () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values, 8);
      }}
    >
      <ProFormText name="name" label="姓名" />
    </ProForm>
  );
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const Test2 = () => {
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "标题",
      dataIndex: "title",
      copyable: true,
      ellipsis: true,
      tip: "标题过长会自动收缩",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      disable: true,
      title: "状态",
      dataIndex: "state",
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: "select",
      valueEnum: {
        all: { text: "超长".repeat(50) },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
          disabled: true,
        },
        processing: {
          text: "解决中",
          status: "Processing",
        },
      },
    },
    {
      disable: true,
      title: "标签",
      dataIndex: "labels",
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "创建时间",
      key: "showTime",
      dataIndex: "created_at",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "dateRange",
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(text, record, _, action, 134);
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: "copy", name: "复制" },
            { key: "delete", name: "删除" },
          ]}
        />,
      ],
    },
  ];
  const menu = (
    <Menu
      items={[
        {
          label: "1st item",
          key: "1",
        },
        {
          label: "2nd item",
          key: "2",
        },
        {
          label: "3rd item",
          key: "1",
        },
      ]}
    />
  );
  const actionRef = useRef<ActionType>();
  console.log(actionRef, 180);
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          return request;
        }}
      ></ProTable>
    </>
  );
};
function Table2() {
  return (
    <>
      <Test1 />
      <Test2 />
    </>
  );
}

export default Table2;
