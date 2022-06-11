import { Form, Select } from 'antd';
import React from 'react';
import { ToDo } from './ToDo';

export const ToDos = ({
  toDos,
  selectedToDo,
  categories,
  onChangeComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [form] = Form.useForm();
  const category = Form.useWatch('addedToDo', form);

  const filteredToDos = toDos?.filter(toDo => toDo?.categories?.includes(category));

  return (
    <>
      {toDos?.length > 0 && (
        <Form
          form={form}
          name='toDos'
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            className='formItem'
            name='addedToDo'
            label='Filter by Category'
            initialValue='All'
          >
            <Select
              style={{
                width: '20%',
              }}
            >
              {['All', ...categories]?.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}

      {(category === 'All' ? toDos : filteredToDos)?.map(toDo => (
        <ToDo
          toDo={toDo}
          selectedToDo={selectedToDo}
          key={toDo?.id}
          onChangeComplete={onChangeComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </>
  );
};
