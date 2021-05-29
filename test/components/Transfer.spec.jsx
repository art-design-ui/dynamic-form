import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReactFormMaker from '../../src/index'
const mockData = []
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`
  })
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
        name: 'transfer',
        label: 'Transfer组件',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'transfer',
        props: {
          placeholder: '请选择时间',
          dataSource: mockData,
          onSelectChange: jest.fn(),
          onChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        }
      }
    }
  ]
}
describe('test Transfer component', () => {
  it('should render the correct default Transfer', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const inputEl = wrapper.container.querySelector('.ant-checkbox-input')
    expect(inputEl.tagName).toEqual('INPUT')
    fireEvent.click(inputEl)
    expect(config.fields[0].field.props.onSelectChange).toHaveBeenCalled()
    const transferBtn = wrapper.container.querySelector('.ant-btn-icon-only')
    // console.log('transferBtn', transferBtn)
    fireEvent.click(transferBtn)
    expect(config.fields[0].field.props.onChange).toHaveBeenCalled()
  })
})
