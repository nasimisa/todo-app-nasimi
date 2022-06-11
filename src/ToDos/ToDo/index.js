import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Row, Tag, Typography } from 'antd';
import React, { useState } from 'react';

export const ToDo = ({ toDo, selectedToDo, onChangeComplete, onDeleteTask, onEditTask }) => {
  // eslint-disable-next-line no-unused-vars
  const [ellipsis, setEllipsis] = useState(true);

  return (
    <Card hoverable>
      <Form.Item className='formItem' name='addedToDo'>
        <Row justify='space-between'>
          <Col>
            <Checkbox
              defaultChecked={toDo?.isComplete}
              onChange={e => onChangeComplete(e.target.checked, toDo?.id)}
            >
              <Typography.Text
                delete={toDo?.isComplete}
                style={ellipsis ? { width: 400 } : undefined}
                ellipsis={ellipsis ? { tooltip: toDo?.name } : false}
              >
                {toDo?.name}
              </Typography.Text>
            </Checkbox>
          </Col>
          <Col>
            <Button type='primary' disabled={toDo?.isComplete} onClick={() => onEditTask(toDo?.id)}>
              <EditOutlined />
            </Button>
            <Button
              type='primary'
              disabled={selectedToDo?.id === toDo?.id}
              danger
              onClick={() => onDeleteTask(toDo?.id)}
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
        {toDo?.categories?.map((category, index) => (
          <Tag key={index} color='#635994'>
            {category?.toUpperCase()}
          </Tag>
        ))}
      </Form.Item>
    </Card>
  );
};
