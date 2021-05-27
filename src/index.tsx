import React, { createElement, ReactNode } from 'react'
import antdComponentCollects, { AntdComponentCollects } from './utils'
import { FormProps, FormItemProps, FormInstance, ButtonProps, Form } from 'antd'
export interface ReactFormMakerOptions {
  form: FormProps
  fields: FormField[]
  submit: {
    text: ReactNode
    form: FormInstance
    props: ButtonProps
    success: () => void
    fail: () => void
  }
  reset: {
    text: ReactNode
    form: FormInstance
    props: ButtonProps
    callBack: () => void
  }
}

export interface FormField {
  formItem: FormItemProps
  field: FormFiedOptions
}
export interface FormFiedOptions {
  type: keyof AntdComponentCollects
  props: any
  text?: ReactNode
  title?: {
    text: ReactNode
    props?: any
  }
  children?: ReactNode
}

function processSubmitOrReset(components: any, h: typeof createElement, props: ReactFormMakerOptions) {
  const subComponent = []
  if (props.submit) {
    subComponent.push(antdComponentCollects['submit'](h, props.submit))
  }
  if (props.reset) {
    subComponent.push(antdComponentCollects['reset'](h, props.reset))
  }
  // 对底部按钮做定位调整
  const wrapperCol = { ...props.form.wrapperCol }
  if (props.form.wrapperCol) {
    wrapperCol['offset'] = wrapperCol['offset']
      ? (wrapperCol['offset'] as number) + Number(props.form.labelCol!.span)
      : props.form.labelCol!.span
  }
  let component = antdComponentCollects.formItem(h, { wrapperCol, key: 'bottom-actions' }, subComponent)
  components.push(component)
}

const ReactFormMaker = (props: ReactFormMakerOptions) => {
  const render = (h: typeof createElement) => {
    if (!props.fields) {
      return h('div')
    }
    console.log(props)
    const components = props.fields.map((item: FormField) => {
      let func = antdComponentCollects[item.field.type]
      let subComponent = func ? func(h, { ...item.field }) : null
      // 包一层formItem标签
      let component = antdComponentCollects.formItem(h, { ...item.formItem, key: item.formItem.label }, subComponent)
      return component
    })
    processSubmitOrReset(components, h, props)
    return h(Form, props.form, components)
  }
  return render(createElement)
}

export default ReactFormMaker
