# react-form-maker

> 🌇react-form-maker 基于 antd 高性能 Form 组件的动态表单方案

## 功能

- 📦 JSON 化创建表单
- 📱 支持所有的数据录入表单，如 Button、DatePicker 等等
- 💪 增加 TextArea 组件自定义标题功能
- 🧳 默认内置 sumit 和 reset 组件

## 📦 安装

```shell
npm i react-form-maker
```

## 🔨 使用

```tsx
import ReactFormMaker from 'react-form-maker'
const config={...}
<react-form-maker {...config}/>
```

## config 接口

```tsx
interface ReactFormMakerOptions {
  form: FormProps
  fields: FormField[]
  submit: FormSubmit
  reset: FormRest
}

const config = {
  form: {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 12
    },
    initialValues: {
      name: 'vnues',
      reason: '这就是原因',
      amount: 3000,
      platform: ''
      // rate: 3.5,
    },
    form
  },
  fields: [
    {
      formItem: {
        name: 'name',
        // label 标签的文本	ReactNode
        label: '姓名',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'input',
        props: {
          placeholder: '请输入用户姓名',
          onChange: onGenderChange
        }
      }
    }
  ],
  // 提交按钮
  submit: {
    text: '提交',
    form,
    props: {
      type: 'primary'
    },
    success() {
      alert(JSON.stringify({}))
    },
    fail() {
      alert('验证失败')
    }
  },
  // 取消或者重置按钮
  reset: {
    text: '重置',
    form,
    props: {
      type: 'primary',
      style: { marginLeft: 20 }
    },
    callBack() {
      // 关闭弹框等操作
    }
  }
}
```

## API 

> [API文档](https://ant.design/components/form-cn/)同[antd](https://ant.design/components/form-cn/)保持一致，JSON数据结构为以下三种配置

- Form
- Form.Item
- 组件的props

## TODO

- [ ] 增加自定义表单组件，百分百实现Form组件功能

## [社区](https://github.com/art-design-ui/noov.js/issues)

<img src="https://cdn.nlark.com/yuque/0/2020/png/685693/1603718006794-778ac551-99a0-4ffc-b13e-080cff7a78f4.png?x-oss-process=image%2Fresize%2Cw_300" width="150" />
