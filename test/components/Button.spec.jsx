import React from 'react'
import { render,screen } from '@testing-library/react'
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
        type: 'button',
        props: {
          type: 'primary'
        },
        text:'按钮+1'
      }
    }
  ]
}
describe('test Button component', () => {
  it('should render the correct default Button', async() => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const element = wrapper.container.querySelector('.ant-btn-primary')
    expect(element.tagName).toEqual('BUTTON')
    // findBy...: Returns a Promise which resolves when an element is found which matches the given query. T
    // he promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms.
    // If you need to find more than one element, use findAllBy
    // findByText是计时去找的
    const spanEl=await screen.findByText('按钮+1')
    expect(spanEl.tagName).toEqual('SPAN')
  })
})
