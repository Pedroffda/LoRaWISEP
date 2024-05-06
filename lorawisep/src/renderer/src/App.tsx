import React, { useEffect } from 'react';
import type { FormProps, MenuProps } from 'antd';
import LWLayout from './components/Layout';
import { Button, Col, Collapse, Form, Input, Row, Select, message } from 'antd';
import logo from '../src/assets/logo.png';
import { SettingOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;

type FieldType = {
  name: string;
  type: 'text' | 'number' | 'select';
  placeholder: string;
  required?: boolean;
  options?: string[];
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Home',
    disabled: true,
  },
  {
    key: '2',
    label: 'Simulação',
  },
  {
    key: '3',
    label: 'Histórico',
    disabled: true,
  },
];


const CollapseItems = [
  {
    key: '1',
    label: 'Configuração do Ambiente',
    questions: [
      { label: 'Nome da Simulação', placeholder:'informe o nome da simulação, ex. Cenário 1' ,name: 'name', type: 'text', required: true},
      { label: 'Quantidade de Dispositivos',placeholder:'Qtd. de dispositivos no cenário' ,name: 'devices', type: 'number', required: true},
      { label: 'Comprimento da Área (m)',placeholder:'Informe o comprimento da área em metros' ,name: 'width', type: 'number', required: true},
      { label: 'Largura da Área (m)',placeholder:'Informe a largura da área em metros' ,name: 'heigth', type: 'number', required: true},
      { label: 'Ambiente da Simulação', placeholder:'Selecione o Cenário de Obstáculos' ,name: 'environment', type: 'select', options: ['Sem Obstáculos', 'Cenário Urbano', 'Cenário Rural'], required: true},
    ],
    
    
  },
  {
    key: '2',
    label: 'Algoritmos de Otimização',
    questions: [
      { required:true, label: 'Método para selecionar a quantidade recomendada de gateways', placeholder:'Selecione o método de seleção da qtd. ótima' ,name: 'qtdGateways', type: 'select', options: ['Elbow Method', 'Gap Statictic'] },
      { required:true, label: 'Método para seleção de localização dos gateways', placeholder:'Selecione o método de seleção da localização dos gateways' ,name: 'locationGateways', type: 'select', options: ['K-Means', 'Fuzzy'] },
    ]
  },
];

const App: React.FC = () => {


  const [form] = Form.useForm();

  const onFinish: FormProps['onFinish'] = (values) => {
    message.success('Simulação realizada com sucesso! Espere um momento...');
    form.resetFields();
    const simulationParameters: SimulationParameters = {
      name: values.name,
      devices: values.devices,
      environment: values.environment,
      width: values.width,
      heigth: values.heigth,
      qtdGateways: values.qtdGateways,
      algorithmOptimization: values.locationGateways,
    };
    window.electron.setParameters(simulationParameters);
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Por favor, preencha todos os campos obrigatórios');
  };

  const handleAutoFill = () => {
    form.setFieldsValue({
      
        name: 'Simulação Exemplo',
        devices: 10,
        width: 100,
        heigth: 50,
        environment: 'Cenário Urbano',
        qtdGateways: 'Elbow Method',
        locationGateways: 'K-Means'
    });
  };

  useEffect(() => {
    console.log("windows:", window)
    // window.electron.generateGraph();
    window.electron.handleResult((imageData) => {
        let image = document.getElementById('image') as HTMLImageElement;
        image.src = `data:image/png;base64,${imageData}`;
        // setGraphGatewaysDone(true);
    });
}, []);

  return (
    <LWLayout items={items} children={
      <Row style={{ justifyContent: 'space-around' }}>
      <Col span={10}>
        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Collapse defaultActiveKey={CollapseItems.map(item => item.key)}>
            {CollapseItems.map(item => (
              <Panel header={item.label} key={item.key} extra={<SettingOutlined />}>
                {item.questions.map(question => (
                  <Form.Item
                    label={question.label}
                    name={question.name}
                    key={question.name}
                    rules={question.required ? [{ required: true, message: `Por favor, informe ${question.label}` }]  : []}
                  >
                    {question.type === 'select' ? (
                      <Select placeholder={question.placeholder}>
                        {question.options && question.options.map(option => (
                          <Option key={option} value={option}>{option}</Option>
                        ))}
                      </Select>
                    ) : (
                      <Input type={question.type} placeholder={question.placeholder} />
                    )}
                  </Form.Item>
                ))}
              </Panel>
            ))}
          </Collapse>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 10 }}>Simular</Button>
            <Button type="default" onClick={handleAutoFill} style={{ width: '100%', marginTop: 10,  whiteSpace: 'normal'  }}>Preencher Automaticamente</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <img id='image' alt="avatar" src={logo} style={{ width: '100%' }} />
      </Col>
    </Row>
    } />
  );
};

export default App;