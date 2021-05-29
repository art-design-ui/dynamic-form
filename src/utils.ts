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
  Form,
  FormItemProps
} from 'antd'
import { FormFiedOptions, FormRest, FormSubmit } from 'src'
export interface AntdComponentCollects {
  button: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  input: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  search: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  formItem: (
    h: typeof createElement,
    field: FormItemComponentProps,
    component?: null | React.ReactElement | React.ReactElement[]
  ) => React.ReactElement
  cascader: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  textarea: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement | React.ReactElement[]
  radio: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  radioGroup: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  checkbox: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  checkboxGroup: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  switch: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  select: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  slider: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  datePicker: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  rangePicker: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  timePicker: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  inputNumber: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  autoComplete: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  rate: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  upload: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  treeSelect: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  transfer: (h: typeof createElement, field: FormFiedOptions) => React.ReactElement
  reset: (h: typeof createElement, field: FormRest) => React.ReactElement
  submit: (h: typeof createElement, field: FormSubmit) => React.ReactElement
}

export interface FormItemComponentProps extends FormItemProps {
  key?: string | number | null | undefined
}

const antdComponentCollects: AntdComponentCollects = {
  button: generateButtonComponent,
  input: generateInputComponent,
  search: generateSearchComponent,
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

function generateResetComponent(h: typeof createElement, field: FormRest) {
  return h(
    Button,
    {
      ...field.props,
      key: 'reset',
      onClick: () => {
        field.form.resetFields()
        field.callBack()
      }
    },
    field.text
  )
}

function generateSubmitComponent(h: typeof createElement, field: FormSubmit) {
  return h(
    Button,
    {
      ...field.props,
      key: 'submit',
      onClick: () => {
        field.form
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

// 增加title选择项 title不是lable
function generateTextAreaComponent(h: typeof createElement, field: FormFiedOptions) {
  // return h('div', null,h(div, field.title.props, field.title.text), h(Input.TextArea, field.props));
  if (field.title && Object.keys(field.title).length) {
    return [
      h('div', { ...field.title.props, key: field.title.text }, field.title.text),
      generateFormItemComponent(
        h,
        { ...field.formItem, key: field.formItem && (field.formItem.key || (field.formItem.name as string)) },
        h(Input.TextArea, field.props)
      )
    ]
  }
  return h(Input.TextArea, field.props)
}

function generatetransferComponent(h: typeof createElement, field: FormFiedOptions) {
  // @ts-ignore
  return h(Transfer, field.props)
}

function generateAutoCompleteComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(AutoComplete, field.props)
}
function generateRadioComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Radio, field.props, field.text)
}
function generateRadioGroupComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Radio.Group, field.props)
}
function generateCheckboxComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Checkbox, field.props, field.text)
}
function generateCheckboxGroupComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Checkbox.Group, field.props)
}
// <Switch defaultChecked onChange={onChange} />
function generateSwitchComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Switch, field.props)
}
function generateSelectComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Select, field.props)
}

function generateSliderComponent(h: typeof createElement, field: FormFiedOptions) {
  // <Slider range marks={marks} defaultValue={[26, 37]} />
  // @ts-ignore
  return h(Slider, field.props)
}
function generateDatePickerComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(DatePicker, field.props)
}
function generateRangePickerComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(DatePicker.RangePicker, field.props)
}
function generateTimePickerComponent(h: typeof createElement, field: FormFiedOptions) {
  // <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
  return h(TimePicker, field.props)
}

// <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
function generateInputNumberComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(InputNumber, field.props)
}
function generateRateComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Rate, field.props)
}
// <Upload {...props}>
//     <Button icon={<UploadOutlined />}>Click to Upload</Button>
// </Upload>
function generateUploadComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Upload, field.props, field.text)
}

function generateTreeSelectComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(TreeSelect, field.props)
}

function generateButtonComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Button, field.props, field.text)
}

function generateInputComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Input, field.props)
}

function generateSearchComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Input.Search, field.props)
}
function generateCascaderComponent(h: typeof createElement, field: FormFiedOptions) {
  return h(Cascader, field.props)
}

function generateFormItemComponent(
  h: typeof createElement,
  formItem: FormItemComponentProps,
  component?: null | React.ReactElement | React.ReactElement[]
) {
  return h(Form.Item, formItem, component)
}

export default antdComponentCollects
