import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReactFormMaker from '../../src/index'
const selectOptions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
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
        name: 'select',
        label: 'Select组件',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'select',
        props: {
          options: selectOptions,
          placeholder: '请选择',
          onMouseEnter: jest.fn(),
          onChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        }
      }
    }
  ]
}
describe('test Select component', () => {
  it('should render the correct default Select', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const inputEl = await screen.findByRole('combobox')
    expect(inputEl.tagName).toEqual('INPUT')
    // 模拟的是原生事件不是组件事件
    fireEvent.mouseEnter(inputEl)
    expect(config.fields[0].field.props.onMouseEnter).toHaveBeenCalled()
    fireEvent.mouseDown(inputEl)
    // select选项列表是挂载id app外部的
    const targetEl = await screen.findByTitle('Apple')
    fireEvent.click(targetEl)
    expect(config.fields[0].field.props.onChange).toHaveBeenCalled()
  })
})
