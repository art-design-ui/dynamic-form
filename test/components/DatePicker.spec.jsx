import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReactFormMaker from '../../src/index'
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
        name: 'datePicker',
        label: 'DatePicker组件',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'datePicker',
        props: {
          placeholder: '请选择日期',
          onOpenChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        }
      }
    }
  ]
}
describe('test DatePicker component', () => {
  it('should render the correct default DatePicker', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const inputEl = await screen.findByPlaceholderText('请选择日期')
    expect(inputEl.tagName).toEqual('INPUT')
    fireEvent.mouseDown(inputEl)
    expect(config.fields[0].field.props.onOpenChange).toHaveBeenCalled()
  })
})
