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
        name: 'rangePicker',
        label: 'RangePicker组件',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'rangePicker',
        props: {
          onOpenChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        }
      }
    }
  ]
}
describe('test RangePicker component', () => {
  it('should render the correct default RangePicker', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    // console.log(document.body.innerHTML)
    const inputEl = await screen.findByPlaceholderText('Start date')
    expect(inputEl.tagName).toEqual('INPUT')
    fireEvent.mouseDown(inputEl)
    expect(config.fields[0].field.props.onOpenChange).toHaveBeenCalled()
  })
})
