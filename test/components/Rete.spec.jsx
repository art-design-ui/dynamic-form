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
        name: 'rate',
        label: '评分组件',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'rate',
        props: {
          count: 5,
          onChange: jest.fn()
        }
      }
    }
  ]
}
describe('test Rate component', () => {
  it('should render the correct default Rate', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const rateEl = await screen.getAllByRole('radio')
    expect(rateEl[0].tagName).toEqual('DIV')
    fireEvent.click(rateEl[0])
    expect(config.fields[0].field.props.onChange).toHaveBeenCalled()
  })
})
