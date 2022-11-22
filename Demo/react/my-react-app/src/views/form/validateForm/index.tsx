/*
 * @Author: hansen
 * @Date: 2022-10-09 15:30:33
 * @LastEditors: hansen
 * @LastEditTime: 2022-10-10 10:00:31
 */
import type { ProFormInstance } from "@ant-design/pro-components";
import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
  ProFormMoney,
} from "@ant-design/pro-components";
import { Button, message } from "antd";
import dayjs from "dayjs";
import { resolve } from "node:path/win32";
import { useRef } from "react";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Test1 = () => {
  const formRef = useRef<ProFormInstance>();
  const onFill = () => {
    formRef?.current?.setFieldsValue({
      name: "张三",
      company: "蚂蚁资料",
    });
  };
  const getCompanyName = () => {
    message.info(`公司名称为 “${formRef?.current?.getFieldValue("company")}”`);
  };
  const getFormatValues = () => {
    console.log(
      "格式化后的所有数据：",
      formRef.current?.getFieldsFormatValue?.()
    );
  };
  const validateAndGetFormatValue = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      console.log("校验表单并返回格式化后的所有数据", values);
    });
  };
  return (
    <>
      <ProForm
        title="新建表单"
        formRef={formRef}
        submitter={{
          render: (props, doms) => {
            return [
              ...doms,
              <Button htmlType="button" onClick={onFill} key="edit">
                一键填写
              </Button>,
              <Button htmlType="button" onClick={getCompanyName} key="read">
                读取公司
              </Button>,
              <Button.Group key="refs" style={{ display: "block" }}>
                <Button
                  htmlType="button"
                  onClick={getFormatValues}
                  key="format"
                >
                  获取格式化后的所有数据
                </Button>
                <Button
                  htmlType="button"
                  onClick={validateAndGetFormatValue}
                  key="format2"
                >
                  校验表单并返回格式化后的所有数据
                </Button>
              </Button.Group>,
            ];
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success("提交成功");
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为24位"
          placeholder={`请输入名称`}
        />
        <ProFormText
          width="md"
          name="company"
          label="我方公司名称"
          placeholder={`请输入名称`}
        />
        <ProFormDatePicker
          name="date"
          initialValue={dayjs("2022-10-10")}
        ></ProFormDatePicker>
      </ProForm>
    </>
  );
};

const Test2 = () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        const val1 = await formRef.current?.validateFields();
        console.log("validateFields:", val1);
        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log("validateFieldsReturnFormatValue:", val2);
        message.success("提交成功");
      }}
      formRef={formRef}
      params={{ id: "100" }}
      formKey="base-form-use-demo"
      request={async () => {
        await waitTime(100);
        return {
          name: "蚂蚁设计有限公司",
          useMode: "chapter",
        };
      }}
      autoFocusFirstInput
    >
      <ProFormMoney
        label="不显示符号"
        name="amount0"
        fieldProps={{
          moneySymbol: false,
        }}
        locale="en-US"
        initialValue={22.22}
        min={0}
        width="lg"
      />
      <ProFormMoney
        label="宽度"
        name="amount1"
        locale="en-US"
        initialValue={22.22}
        min={0}
        width="lg"
      />
      <ProFormMoney
        label="限制金额最小为0"
        name="amount2"
        locale="en-US"
        initialValue={22.22}
        min={0}
      />
      <ProFormMoney
        label="不限制金额大小"
        name="amount3"
        locale="en-GB"
        initialValue={22.22}
      />
      <ProFormMoney
        label="货币符号跟随全局国际化"
        name="amount4"
        initialValue={22.22}
      />
      <ProFormMoney
        label="自定义货币符号"
        name="amount5"
        initialValue={22.22}
        customSymbol="💰"
      />
      <ProFormMoney
        label="小数点精度"
        name="amount6"
        initialValue={2222222222.222222}
        fieldProps={{ precision: 2 }}
        customSymbol="💰"
      />
      <ProFormMoney
        label="小数点精度-0"
        name="amount6"
        initialValue={2222222222.222222}
        fieldProps={{ precision: 0 }}
        customSymbol="💰"
      />
    </ProForm>
  );
};

const ValidateForm = () => {
  return (
    <>
      <Test1 />
      ----------------------
      <Test2 />
    </>
  );
};

export default ValidateForm;
