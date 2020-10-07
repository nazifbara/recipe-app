import React from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function RecipeForm({ onInputChange, onValueChange, onFormSubmit, data }) {
  return (
    <Form {...layout} validateMessages={validateMessages} onFinish={onFormSubmit} initialValues={data}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input name="name" onChange={onInputChange} />
      </Form.Item>
      <Form.Item name="mealType" label="Meal type" rules={[{ required: true }]}>
        <Input name="mealType" onChange={onInputChange} />
      </Form.Item>
      <Form.Item name="imageUrl" label="Image url" rules={[{ required: true }]}>
        <Input name="imageUrl" onChange={onInputChange} />
      </Form.Item>
      <Form.Item name="numberOfPeople" label="Number of people" rules={[{ required: true }]}>
        <InputNumber onChange={value => onValueChange(value, 'numberOfPeople')} />
      </Form.Item>
      <Form.Item name="difficultyLevel" label="Difficulty level" rules={[{ required: true }]}>
        <Select
          onChange={value => onValueChange(value, 'difficultyLevel')}
          allowClear
        >
          <Select.Option value="easy">easy</Select.Option>
          <Select.Option value="intermediate">intermediate</Select.Option>
          <Select.Option value="hard">hard</Select.Option>         
        </Select>
      </Form.Item>
      <Form.Item
        onChange={onInputChange}
        name="ingredients" 
        label="Ingredients" 
        rules={[{required: true }]}
      >
        <Input.TextArea name="ingredients" rows="6" />
      </Form.Item>
      <Form.Item
        onChange={onInputChange}
        name="instructions" 
        label="Instructions"
        rules={[{required: true }]}
      >
        <Input.TextArea name="instructions" rows="6" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RecipeForm;
