import React from 'react';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const FormCollapseItem = ({ item, formData, onFormChange }) => {
  const { key, questions } = item;

  const handleInputChange = (name, value) => {
    onFormChange(key, { ...formData[key], [name]: value });
  };

  return (
    <Form layout="vertical" initialValues={formData} onValuesChange={(changedValues, allValues) => handleInputChange(changedValues.key, allValues)}>
      {questions.map(question => (
        <Form.Item
          label={question.label}
          name={`${key}_${question.name}`}
          key={`${key}_${question.name}`}
          rules={question.required ? [{ required: true, message: `Por favor, informe ${question.label}` }] : []} // Aqui corrigimos a propriedade required
        >
          {question.type === 'select' ? (
            <Select placeholder={question.placeholder}>
              {question.options.map(option => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Select>
          ) : (
            <Input type={question.type} placeholder={question.placeholder} />
          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{width:'100%'}}>Salvar</Button>
        </Form.Item>
        
    </Form>
  );
};

export default FormCollapseItem;
