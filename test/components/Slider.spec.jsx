import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReactFormMaker from '../../src/index'
const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50'
    },
    label: <strong>100°C</strong>
  }
}
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
        name: 'slider',
        label: 'Slider组件',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'slider',
        props: {
          marks,
          included: true,
          onAfterChange: jest.fn(),
          onChange: jest.fn()
        }
      }
    }
  ]
}
describe('test Slider component', () => {
  it('should render the correct default Slider', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const markEl = await screen.getByText('37°C')
    expect(markEl.tagName).toEqual('SPAN')
    const sliderEl = await screen.getByRole('slider')
    fireEvent.mouseDown(sliderEl)
    fireEvent.mouseUp(sliderEl)
    expect(config.fields[0].field.props.onAfterChange).toHaveBeenCalled()
  })
})
