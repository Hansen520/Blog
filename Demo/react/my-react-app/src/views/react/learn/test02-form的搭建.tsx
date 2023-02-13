/*
 * @Author: hansen
 * @Date: 2023-02-01 15:10:46
 * @LastEditors: hansen
 * @LastEditTime: 2023-02-07 14:28:42
 * @FilePath: \user-end\src\pages\Test\test02-form的搭建.tsx
 */
 /* eslint-disable */ 
 import React from 'react';

 class Form extends React.Component {
   state = {
     formData: {}
   };
   /* 用于提交表单数据 */
   submitForm = (cb) => {
     cb({ ...this.state.formData });
   };
   /* 获取重置表单数据 */
   resetForm = () => {
     const { formData } = this.state;
     Object.keys(formData).forEach(item => {
       formData[item] = '';
     })
     this.setState({
       formData
     });
   }
   /* 设置表单数据层 */
   setValue = (name, value) => {
     this.setState({
       formData: {
         ...this.state.formData,
         [name]: value
       }
     });
   }
 
   render() {
     const { children } = this.props
     const renderChildren = [];
     React.Children.forEach(children, (child) => {
       if (child?.type.displayName === 'formItem') {
         const { name } = child.props;
         console.log(child.props.children, 38);
         /* 克隆`FormItem`节点，混入改变表单单元项的方法, 往child组件上放prop */
         const Children = React.cloneElement(child, {
           key: name,
           handleChange: this.setValue,// 回调的值
           value: this.state.formData[name] || ''
         }, child.props.children)
         renderChildren.push(Children);
       }
     });
     return renderChildren
   }
 }
 
 /* 增加组件类型type  */
 Form.displayName = 'form'
 
 function FormItem(props) {
   const { children , name  , handleChange , value , label  } = props;
   const onChange = (value) => {
     /* 通知上一次value 已经改变 */
     handleChange(name, value);
   };
   return <div className='form'>
     <span className="label">{ label }:</span>
     {
       // 先判断是否为有效的组件
       React.isValidElement(children) && children.type.displayName === 'input' ?
         // 往input里面的属性事onChange和value React.cloneElement(element, [props], [...children])
         // element: 将被克隆的元素
         // [props] ：除了原元素的道具外，将被添加到克隆的元素中的道具
         // [...children]: 克隆对象的子女。注意，现有对象的子元素不会被复制。
         React.cloneElement(children, { onChange, value }, <div>1</div>) :
         null
     }
   </div>
 }
 FormItem.displayName = 'formItem'
 
 /* Input 组件, 负责回传value值 */
 function Input({ onChange, value }) {
   return  <input className="input"  onChange={ (e)=>( onChange && onChange(e.target.value) ) } value={value}  />
 }
 /* 给Component 增加标签 */
 Input.displayName = 'input'
 
 function Test() {
   return <Form>
     <FormItem label="神奇" name="baba" value="1">
       <Input />
     </FormItem>
     <FormItem label="艾迪" name="aidi" value="1">
       <Input />
     </FormItem>
 
   </Form>
 }
 export default Test;