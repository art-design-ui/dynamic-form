import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReactFormMaker from '../../src/index'
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0'
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1'
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2'
      }
    ]
  }
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
        name: 'treeSelect',
        label: 'TreeSelect组件',
        rules: [
          {
            required: true,
            message: '该项为必填项'
          }
        ]
      },
      field: {
        type: 'treeSelect',
        props: {
          placeholder: '请选择',
          treeData,
          onChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        }
      }
    }
  ]
}
describe('test TreeSelect component', () => {
  it('should render the correct default TreeSelect', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    const inputEl = await screen.findByRole('combobox')
    expect(inputEl.tagName).toEqual('INPUT')
    fireEvent.mouseDown(inputEl)
    // console.log(document.body.innerHTML)
    const spanEl = await screen.findByText('Node1')
    fireEvent.click(spanEl)
    expect(config.fields[0].field.props.onChange).toHaveBeenCalled()
  })
})
