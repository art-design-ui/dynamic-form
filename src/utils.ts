import React from 'react'

export interface AntdComponentCollects{
  button:(h:any,obj: any)=>React.ReactElement
  col:(h:any,obj: any,component?:any)=>React.ReactElement
  formItem:(h:any,obj: any,component?:any)=>React.ReactElement
}

const antdComponentCollects:AntdComponentCollects = {
  button: generateButtonComponent,
  col: generateColComponent,
  formItem: generateFormItemComponent
}

function generateButtonComponent(h: any, obj: any) {
  return h(
    Button,
    {
      ...obj.props,
    },
    obj.children
  )
}

function generateColComponent(h: any, obj: any, component?: any) {
  return h(
    Col,
    {
      ...obj.props
    },
    component
  )
}

function generateFormItemComponent(h: any, obj: any, component?: any) {
  return h(
    FormItem,
    {
      ...obj.props
    },
    component
  )
}

export default antdComponentCollects
