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

function processSubmitOrReset(components: any, h: any, props: any) {
  const subComponent = []
  if (props.submit) {
    subComponent.push(antdComponentCollects['submit'](h, props.submit))
  }
  if (props.reset) {
    subComponent.push(antdComponentCollects['reset'](h, props.reset))
  }
  let component = antdComponentCollects.formItem(h, {}, subComponent)
  components.push(component)
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
      let component = antdComponentCollects.formItem(h, item.formItem, subComponent)
      return component
    })
    processSubmitOrReset(components, h, props)
    console.log('props.form', props.form)
    return h(Form, props.form, components)
  }
  return render(createElement)
}

export default ReactFormMaker
