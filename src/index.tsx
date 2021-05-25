import React, { createElement, useState } from 'react'

import antdComponentCollects, { AntdComponentCollects } from './utils'

export interface  ReactFormMakerOptions{
  formItem:FormItemOptions[]
  submit:()=>any
  reset:()=>any
}
export interface FormItemOptions{
  type:keyof AntdComponentCollects
  props:any
  children:any[]
}
export interface IProps{
  options:ReactFormMakerOptions
}
function processSubmitOrReset(components:any, h:any,obj:any,type:any) {
  let subComponent = antdComponentCollects[type](h, obj)
  let component = antdComponentCollects.formItem(h, obj, subComponent)
  components.push(antdComponentCollects.col(h, obj, component))
}

const ReactFormMaker = (props:IProps) => {
  const {options} = props
  const [user, setUser] = useState({})
  const render=(h:typeof createElement)=> {
    if (!options.formItem) {
      return h('div')
    }
    
    const components = options.formItem.map((item:FormItemOptions) => {
      let func = antdComponentCollects[item.type]
      let subComponent = func? func(h, item) : null
      console.log('subComponent',subComponent)
      // 包一层formItem标签
      let component = antdComponentCollects.formItem(h, item, subComponent)
      // 包一层栅格化布局
      return antdComponentCollects.col(h, item, component)
    })
    console.log('component',components)
    // 判断是否有提交选项
    if (options.submit) {
      processSubmitOrReset(components, h, options.submit, 'submit')
    }
    // 判断是否有重置选项
    if (options.reset) {
      processSubmitOrReset(components, h, options.reset, 'reset')
    }

    return h(Form, {
      props: {
        ...options.formProps
      },
      className: 'react-generate-form'
    }, [
      h(Row, {
        props: options.rowProps
      }, components)
    ])
  }
  return render(createElement)
}

export default ReactFormMaker
