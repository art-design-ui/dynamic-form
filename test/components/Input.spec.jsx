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
        type: 'input',
        props: {
          type: 'input',
          placeholder: 'Basic usage',
          onChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        }
      }
    }
  ]
}
describe('test Input component', () => {
  it('should render the correct default Input', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const inputEl = await screen.findByPlaceholderText('Basic usage')
    expect(inputEl.tagName).toEqual('INPUT')
    // change事件要有值才能触发
    fireEvent.change(inputEl, { target: { value: '23' } })
    expect(config.fields[0].field.props.onChange).toHaveBeenCalled()
    expect(inputEl.value).toEqual('23')
  })
})
