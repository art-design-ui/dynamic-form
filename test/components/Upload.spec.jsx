import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ReactFormMaker from '../../src/index'
import { Button } from 'antd'

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
        name: 'upload',
        label: 'Upload组件'
      },
      field: {
        type: 'upload',
        props: {
          fileList: [],
          onChange: jest.fn() // 模拟函数 内部有记录函数调用次数 这样才可以使用toHaveBeenCalled
        },
        text: <Button type="primary">Upload Click</Button>
      }
    }
  ]
}
describe('test Upload component', () => {
  it('should render the correct default Upload', async () => {
    const wrapper = render(<ReactFormMaker {...config} />)
    // console.log(document.body.innerHTML)
    const btnEl = await screen.findByText('Upload Click')
    const inputEl = wrapper.container.querySelector('input')
    // console.log('inputEl', inputEl)
    expect(inputEl.tagName).toEqual('INPUT')
    fireEvent.click(btnEl)
    // 读取文件是个异步操作 可能响应没那么快
    fireEvent.change(inputEl, {
      target: { files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })] }
    })
    // The default timeout is 1000ms which will keep you under Jest's default timeout of 5000ms.
    waitFor(() => {
      expect(config.fields[0].field.props.onChange).toHaveBeenCalled()
    })
  })
})
