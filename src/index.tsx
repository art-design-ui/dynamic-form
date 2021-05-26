import React, { createElement, useState } from 'react'

import antdComponentCollects, { AntdComponentCollects } from './utils.ts'

export interface ReactFormMakerOptions {
  fields: FormItemOptions[]
}
export interface FormItemOptions {
  type: keyof AntdComponentCollects
  props: any
  children: any[]
}

const ReactFormMaker = (props: ReactFormMakerOptions) => {
  const [user, setUser] = useState({})
  const render = (h: typeof createElement) => {
    if (!props.fields) {
      return h('div')
    }
    console.log(props)
    const components = props.fields.map((item: FormItemOptions) => {
      let func = antdComponentCollects[item.field.type]
      let subComponent = func ? func(h, item.field) : null
      console.log('subComponent', subComponent)
      // 包一层formItem标签
      let component = antdComponentCollects.formItem(
        h,
        item.formItem,
        subComponent
      )
      return component
    })
    return h(
      Form,
      props.form,
      components
    )
  }
  return render(createElement)
}

export default ReactFormMaker
