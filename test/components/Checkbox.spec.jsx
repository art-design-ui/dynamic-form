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
      field: {
        type: 'checkbox',
        props: {
          onChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        },
        text: '这是我的checkbox'
      }
    }
  ]
}
describe('test Checkbox component', () => {
  it('should render the correct default Checkbox', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const spanEl = await screen.findByText('这是我的checkbox')
    expect(spanEl.tagName).toEqual('SPAN')
    // 模拟的是原生事件不是组件事件
    fireEvent.click(spanEl)
    expect(config.fields[0].field.props.onChange).toHaveBeenCalled()
  })
})
