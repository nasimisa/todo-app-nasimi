import { useUpdateEffect, useMemoizedFn } from 'ahooks';
import { Button, Form, Input, Row, Select } from 'antd';
import React from 'react';

export const AddToDo = ({ categories, onAddToDo, onCancelToDo, selectedToDo }) => {
  const [form] = Form.useForm();

  useUpdateEffect(() => {
    form.setFieldsValue({
      toDoName: selectedToDo?.name,
      chosenCategories: [...(selectedToDo?.categories ?? [])],
    });
  }, [selectedToDo]);

  const handleToDo = useMemoizedFn(values => {
    onAddToDo(values);

    form?.resetFields();
  });

  const handleCancelToDo = useMemoizedFn(() => {
    onCancelToDo();

    form?.resetFields();
  });

  return (
    <Form
      name='addToDo'
      initialValues={{
        remember: true,
      }}
      autoComplete='off'
      layout='vertical'
      form={form}
      onFinish={handleToDo}
    >
      <Form.Item
        className='formItem'
        label='TODO name'
        name='toDoName'
        rules={[
          {
            required: true,
            message: 'Please insert todo name!',
          },
        ]}
      >
        <Input placeholder='Enter TODO name (e.g. Learn JavaScript)' size='large' />
      </Form.Item>

      <Form.Item label='Categories (optional)' name='chosenCategories' className='formItem'>
        <Select
          mode='tags'
          style={{
            width: '100%',
          }}
          placeholder='Choose or add categories (e.g. Programming, Art, Sport)'
          size='large'
        >
          {categories?.map(category => (
            <Select.Option key={category}>{category}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row justify='start'>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {selectedToDo?.id ? 'Edit' : 'Add'}
          </Button>
        </Form.Item>

        <Form.Item>
          {selectedToDo?.id && (
            <Button type='primary' danger onClick={handleCancelToDo}>
              Cancel
            </Button>
          )}
        </Form.Item>
      </Row>
    </Form>
  );
};
