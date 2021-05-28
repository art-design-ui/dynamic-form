import React from 'react'
import { render, screen } from '@testing-library/react'
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
        type: 'switch',
        props: {
          checked: true,
          checkedChildren: '开启'
        }
      }
    }
  ]
}
describe('test Switch component', () => {
  it('should render the correct default Switch', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const spanEl = await screen.findByText('开启')
    expect(spanEl).toHaveClass('ant-switch-inner')
  })
})
