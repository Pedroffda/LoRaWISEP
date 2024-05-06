import React, { useState } from 'react';
import type { CollapseProps, MenuProps } from 'antd';
import LWLayout from './components/Layout';
import { Button, Card, Col, Collapse, Flex, Form, Input, Row, Select, Typography, theme } from 'antd';
import logo from '../src/assets/logo.png';
import { SettingOutlined } from '@ant-design/icons';
import FormCollapseItem from './components/Form/FormCollapseItem';

const { Panel } = Collapse;
const { Title } = Typography;
const { Option } = Select;

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
      { label: 'Quantidade de Dispositivos',placeholder:'Qtd. de dispositivos no cenário' ,name: 'devices', type: 'number' },
      { label: 'Comprimento da Área (m)',placeholder:'Informe o comprimento da área em metros' ,name: 'width', type: 'number' },
      { label: 'Largura da Área (m)',placeholder:'Informe a largura da área em metros' ,name: 'heigth', type: 'number' },
      { label: 'Ambiente da Simulação', placeholder:'Selecione o Cenário de Obstáculos' ,name: 'environment', type: 'select', options: ['Sem Obstáculos', 'Cenário Urbano', 'Cenário Rural'] },
    ],
    
    
  },
  {
    key: '2',
    label: 'Algoritmos de Otimização',
    questions: [
      { required:true, label: 'Método para selecionar a quantidade recomendada de gateways', placeholder:'Selecione o método de seleção da qtd. ótima' ,name: 'qtdGateways', type: 'select', options: ['Elbow Method', 'Gap Statictic'] },
      { label: 'Método para seleção de localização dos gateways', placeholder:'Selecione o método de seleção da localização dos gateways' ,name: 'locationGateways', type: 'select', options: ['K-Means', 'Fuzzy'] },
    ]
  },
];

const App: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const [formData, setFormData] = useState({});

  const handleFormChange = (key: string, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    // Aqui você pode enviar formData para onde desejar
    console.log('Dados do formulário:', formData);
  };
  return (
    <LWLayout items={items} children={
      <Row style={{ justifyContent: 'space-around' }}>
        <Col span={10}>
          <Collapse 
           >
            {CollapseItems.map(item => (
              <Panel header={item.label} key={item.key} extra={<SettingOutlined />}>
                <FormCollapseItem item={item} formData={formData} onFormChange={handleFormChange} />
              </Panel>
            ))}
          </Collapse>

          {/* <Button type="primary" onClick={() => { handleSubmit() }} style={{ marginTop: 16, minWidth: '100%', borderRadius: borderRadiusLG, background: '#1677ff' }}>Simular</Button> */}
        </Col>
        <Col span={12}>
          <img
            alt="avatar"
            src={logo}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
    } />
  );
};

export default App;