import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReactFormMaker from '../../src/index'
const cascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
]
const config = {
  form: {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 12
    }
  },
  fields: [
    {
      formItem: {
        name: 'cascader',
        label: 'Cascader组件',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'cascader',
        props: {
          placeholder: 'Basic usage',
          options: cascaderOptions,
          onChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        }
      }
    }
  ]
}
describe('test Cascader component', () => {
  it('should render the correct default Cascader', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const inputEl = await screen.findByPlaceholderText('Basic usage')
    expect(inputEl.tagName).toEqual('INPUT')
    // fireEvent.mouseDown(inputEl)
    fireEvent.click(inputEl)

    // select选项列表是挂载id app外部的
    // console.log(document.body.innerHTML) 查看dom元素非常方便
    // 模拟三次选择
    const targetEl1 = await screen.findByTitle('Zhejiang')
    fireEvent.click(targetEl1)
    const targetEl2 = await screen.findByTitle('Hangzhou')
    fireEvent.click(targetEl2)
    const targetEl3 = await screen.findByTitle('West Lake')
    fireEvent.click(targetEl3)
    expect(config.fields[0].field.props.onChange).toHaveBeenCalled()
  })
})
