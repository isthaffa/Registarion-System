import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Input, Button, } from "antd";

const FormItem = Form.Item;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 9
    }
  }
};

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      rules={[
        {
          required: true,
          message: "Please input your first name",
        },
      ]}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

const AInput = makeField(Input);



const AddMemberForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field label="First Name" name="firstName" component={AInput} placeholder="First Name" hasFeedback />

      <Field label="Last Name" name="lastName" component={AInput} placeholder="Last Name"hasFeedback  />

      <Field label="Email" name="email" component={AInput} type="email" placeholder="Email" hasFeedback />


      <FormItem {...tailFormItemLayout}>
        <Button type="primary" disabled={pristine || submitting} htmlType="submit" style={{ marginRight: "10px" } }>
          add
        </Button>

        <Button  disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </FormItem>
    </form>
  );
};

const validate = values => {
  const errors = {};
  const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!values.email || values.email.trim()==="") {
    errors.email = "Required";
  }
  if(!re.test(String(values.email).toLowerCase())){
    errors.email = "email not valid";
  }
  if (!values.firstName || values.firstName.trim()==="") {
    errors.firstName = "Required";
  }
  if (!values.lastName || values.lastName.trim()==="") {
    errors.lastName = "Required";
  }
  
  

  return errors;
};

export default reduxForm({
  form: "addMemberForm", // a unique identifier for this form
  validate
})(AddMemberForm);
