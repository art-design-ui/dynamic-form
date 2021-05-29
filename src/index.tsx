import React, { createElement, ReactComponentElement, ReactNode } from 'react'
import antdComponentCollects, { AntdComponentCollects } from './utils'
import {
  FormProps,
  FormItemProps,
  FormInstance,
  ButtonProps,
  Form,
  SwitchProps,
  SelectProps,
  InputProps,
  InputNumberProps,
  DatePickerProps
} from 'antd'
import { RangePickerProps } from 'antd/lib/date-picker'
import { RangePickerTimeProps } from 'antd/lib/date-picker/generatePicker'
import { SliderBaseProps } from 'antd/lib/slider'

export interface FormSubmit {
  text: ReactNode
  form: FormInstance
  props: ButtonProps
  success: () => void
  fail: () => void
}
export interface FormRest {
  text: ReactNode
  form: FormInstance
  props: ButtonProps
  callBack: () => void
}
export interface ReactFormMakerOptions {
  form: FormProps
  fields: FormField[]
  submit: FormSubmit
  reset: FormRest
}

interface FormItem extends FormItemProps {
  key?: string | number | undefined | null
}

export interface FormField {
  formItem: FormItem
  field: FormFiedOptions
}

export interface FormFiedOptions {
  type: keyof Omit<Omit<AntdComponentCollects, 'submit'>, 'reset'>
  props: any
  text?: ReactNode
  formItem?: FormItem
  title?: {
    text: ReactNode
    props?: any
  }
  children?: ReactNode
}

function processSubmitOrReset(
  components: ReactComponentElement<any>[],
  h: typeof createElement,
  props: ReactFormMakerOptions
) {
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
      ? Number(wrapperCol['offset']) + Number(props.form.labelCol && props.form.labelCol.span)
      : props.form.labelCol && props.form.labelCol.span
  }
  let component = antdComponentCollects.formItem(h, { wrapperCol, key: 'bottom-actions' }, subComponent)
  components.push(component)
}

const ReactFormMaker = (props: ReactFormMakerOptions) => {
  const render = (h: typeof createElement) => {
    if (!props.fields) {
      return h('div')
    }
    const components = props.fields.map((item: FormField, index: number) => {
      let func = antdComponentCollects[item.field.type]
      let subComponent = func ? func(h, item.field) : null
      // 包一层formItem标签
      let component = antdComponentCollects.formItem(h, { key: index, ...item.formItem }, subComponent)
      return component
    })
    processSubmitOrReset(components, h, props)
    return h(Form, props.form, components)
  }
  return render(createElement)
}

export default ReactFormMaker
