import React, { createElement } from 'react'
import {
  Upload,
  Transfer,
  TreeSelect,
  TimePicker,
  AutoComplete,
  Rate,
  DatePicker,
  Slider,
  Select,
  Switch,
  Button,
  Input,
  Cascader,
  Checkbox,
  InputNumber,
  Radio,
  Form
} from 'antd'
import { FormFiedOptions, FormField } from 'src'
export interface AntdComponentCollects {
  button: (h: any, obj: any) => React.ReactElement
  input: (h: any, obj: any) => React.ReactElement
  formItem: (h: any, obj: any, component?: null | React.ReactElement | React.ReactElement[]) => React.ReactElement
  cascader: (h: any, obj: any) => React.ReactElement
  textarea: (h: any, obj: any) => React.ReactElement
  radio: (h: any, obj: any) => React.ReactElement
  radioGroup: (h: any, obj: any) => React.ReactElement
  checkbox: (h: any, obj: any) => React.ReactElement
  checkboxGroup: (h: any, obj: any) => React.ReactElement
  switch: (h: any, obj: any) => React.ReactElement
  select: (h: any, obj: any) => React.ReactElement
  slider: (h: any, obj: any) => React.ReactElement
  datePicker: (h: any, obj: any) => React.ReactElement
  rangePicker: (h: any, obj: any) => React.ReactElement
  timePicker: (h: any, obj: any) => React.ReactElement
  inputNumber: (h: any, obj: any) => React.ReactElement
  autoComplete: (h: any, obj: any) => React.ReactElement
  rate: (h: any, obj: any) => React.ReactElement
  upload: (h: any, obj: any) => React.ReactElement
  treeSelect: (h: any, obj: any) => React.ReactElement
  transfer: (h: any, obj: any) => React.ReactElement
  reset: (h: any, obj: any) => React.ReactElement
  submit: (h: any, obj: any) => React.ReactElement
}

const antdComponentCollects: AntdComponentCollects = {
  button: generateButtonComponent,
  input: generateInputComponent,
  textarea: generateTextAreaComponent,
  radio: generateRadioComponent,
  radioGroup: generateRadioGroupComponent,
  checkbox: generateCheckboxComponent,
  checkboxGroup: generateCheckboxGroupComponent,
  switch: generateSwitchComponent,
  select: generateSelectComponent,
  slider: generateSliderComponent,
  datePicker: generateDatePickerComponent,
  rangePicker: generateRangePickerComponent,
  timePicker: generateTimePickerComponent,
  cascader: generateCascaderComponent,
  inputNumber: generateInputNumberComponent,
  autoComplete: generateAutoCompleteComponent,
  rate: generateRateComponent,
  upload: generateUploadComponent,
  treeSelect: generateTreeSelectComponent,
  transfer: generatetransferComponent,
  formItem: generateFormItemComponent,
  reset: generateResetComponent,
  submit: generateSubmitComponent
}

function generateResetComponent(h: any, field: any) {
  return h(
    Button,
    {
      ...field.props,
      key: 'reset',
      onClick: () => {
        field.form.resetFields()
        field.form.callBack()
      }
    },
    field.text
  )
}

function generateSubmitComponent(h: any, field: any) {
  return h(
    Button,
    {
      ...field.props,
      key: 'submit',
      onClick: () => {
        field
          .validateFields()
          .then(() => {
            field.success()
          })
          .catch(() => {
            field.fail()
          })
      }
    },
    field.text
  )
}

// 增加title选择项 title不是lable啊
function generateTextAreaComponent(h: any, field: any) {
  // return h('div', null,h(div, field.title.props, field.title.text), h(Input.TextArea, field.props));
  if (field.title && Object.keys(field.title).length) {
    return [
      h('div', { ...field.title.props, key: field.title.text }, field.title.text),
      generateFormItemComponent(h, { ...field.formItem, key: field.formItem.name }, h(Input.TextArea, field.props))
    ]
  }
  return h(Input.TextArea, field.props)
}

function generatetransferComponent(h: any, field: FormFiedOptions) {
  return h(Transfer, field.props)
}

function generateAutoCompleteComponent(h: any, field: any) {
  return h(AutoComplete, field.props)
}
function generateRadioComponent(h: any, field: any) {
  return h(Radio, field.props, field.children)
}
function generateRadioGroupComponent(h: any, field: any) {
  return h(Radio.Group, field.props)
}
function generateCheckboxComponent(h: any, field: any) {
  return h(Checkbox, field.props, field.children)
}
function generateCheckboxGroupComponent(h: any, field: any) {
  return h(Checkbox.Group, field.props)
}
// <Switch defaultChecked onChange={onChange} />
function generateSwitchComponent(h: any, field: any) {
  return h(Switch, field.props)
}
function generateSelectComponent(h: any, field: any) {
  return h(Select, field.props)
}

function generateSliderComponent(h: any, field: any) {
  // <Slider range marks={marks} defaultValue={[26, 37]} />
  return h(Slider, field.props)
}
function generateDatePickerComponent(h: any, field: any) {
  return h(DatePicker, field.props)
}
function generateRangePickerComponent(h: any, field: any) {
  return h(DatePicker.RangePicker, field.props)
}
function generateTimePickerComponent(h: any, field: any) {
  //   <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
  return h(TimePicker, field.props)
}

// <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
function generateInputNumberComponent(h: any, field: any) {
  return h(InputNumber, field.props)
}
function generateRateComponent(h: any, field: any) {
  return h(Rate, field.props)
}
// <Upload {...props}>
//     <Button icon={<UploadOutlined />}>Click to Upload</Button>
// </Upload>
function generateUploadComponent(h: any, field: any) {
  return h(Upload, field.props, field.children)
}

function generateTreeSelectComponent(h: any, field: any) {
  return h(TreeSelect, field.props)
}

function generateButtonComponent(h: any, field: any) {
  return h(Button, field.props, field.text)
}

function generateInputComponent(h: any, field: any) {
  return h(Input, field.props)
}

function generateCascaderComponent(h: any, field: any) {
  return h(Cascader, field.props)
}

function generateFormItemComponent(
  h: any,
  formItem: any,
  component?: null | React.ReactElement | React.ReactElement[]
) {
  return h(Form.Item, formItem, component)
}

export default antdComponentCollects
