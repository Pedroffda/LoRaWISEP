import React from 'react';
import { Button, Card, Col, Divider, Form, Input, Modal, Row, Select, Space } from 'antd';
import logo from './assets/logo.png'
import pos from './assets/pos_gateways.png'

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [context, setContext] = React.useState<any>([]);

  const [open, setOpen] = React.useState(false);

  const onFinish = (values: any) => {
    console.log(values);
    setContext(values);
    setOpen(true);
  };

  const onReset = () => {
    form.resetFields();
  };



  const gridStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
  };
  return (

    <div style={{ position: 'relative' }}>
      <img
        src={logo}
        alt="Logo do Projeto"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px', // ajuste conforme necessário
          height: 'auto', // ajuste conforme necessário
          marginRight: '20px', // ajuste conforme necessário
          marginTop: '20px', // ajuste conforme necessário
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '96vh' }}>

        <Modal title="Cenário Gerado" open={open} okText={'Simular'} onOk={() => { setOpen(false) }} onCancel={() => { setOpen(false) }}>
          <div style={{ textAlign: 'center' }}>
            <img alt="example" src={pos} style={{ width: '100%', height: '100%' }} />
            <Divider />
            <Card title="Resultados da Simulação">
              <Card.Grid style={gridStyle}>Packet Delivery Rate: 92%</Card.Grid>
              <Card.Grid style={gridStyle}>Received Signal Strength: -100 dbm</Card.Grid>
              <Card.Grid style={gridStyle}>Signal to Noise: 90</Card.Grid>
              <Card.Grid style={gridStyle}>Delay: 50 ns</Card.Grid>
            </Card>
            <Button type="primary" style={{ marginTop: '10px' }}>Download Resultados</Button>
          </div>
        </Modal>

        {/* <Modal width={1000} title="Cenário Gerado" open={open} onCancel={() => { setOpen(false)}} footer={
        [
          <Button key="back" onClick={() => { setOpen(false) }}>
            Voltar
          </Button>,
          <Button key="submit" type="primary" onClick={() => { setOpen(false) }}>
            Simular
          </Button>,
          <Button
            key="link"
            type="primary"
            onClick={() => { setOpen(false) }}
          >
            Download Resultados
          </Button>,]
      }>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img alt="example" src="public/pos_gateways.png" style={{ width: '80%', height: '80%'}} />
          <div style={{ marginLeft: '20px' }}>
            <Card title="Resultados da Simulação">
              <Card.Grid style={gridStyle}>Packet Delivery Rate: 92%</Card.Grid>
              <Card.Grid style={gridStyle}>Received Signal Strength: -100 dbm</Card.Grid>
              <Card.Grid style={gridStyle}>Signal to Noise: 90</Card.Grid>
              <Card.Grid style={gridStyle}>Delay: 50 ns</Card.Grid>
            </Card>
          </div>
        </div>
      </Modal> */}

        <Form
          style={{ width: '85%', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <h2>1. Configurações do Cenário da Simulação</h2>
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item name="name" label="Nome"
              // rules={[{ required: true }]}
              >
                <Input placeholder='Nome da Simulação' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="devices" label="Dispositivos"
              // rules={[{ required: true }]}
              >
                <Input placeholder='Informe a quantidade de dispositivos' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              {/* comprimento da area (m) */}
              <Form.Item name="width" label="Comprimento da área (m)"
              // rules={[{ required: true }]}
              >
                <Input placeholder='Informe o comprimento da área em metros' />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* largura da area (m) */}
              <Form.Item name="heigth" label="Largura da área (m)"
              // rules={[{ required: true }]}
              >
                <Input placeholder='Informe a largura da área em metros' />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="environment"
            label="Ambiente da Simulação"
          // rules={[{ required: true }]}
          >
            <Select
              placeholder="Selecione o ambiente da simulação"
              allowClear
            >
              <Select.Option value="env1">Sem Obstáculos</Select.Option>
              <Select.Option value="env2">Cenário Urbano</Select.Option>
              <Select.Option value="env3">Cenário Rural</Select.Option>
            </Select>
          </Form.Item>
          <h2>2. Seleção dos Algoritmos de Otimização </h2>

          <Form.Item
            name="qtdGateways"
            label="Método para selecionar a quantidade recomendada de gateways"
          // rules={[{ required: true }]}
          >
            <Select
              placeholder="Selecione o algoritmo"
              allowClear
            >
              <Select.Option value="qtd1">Elbow Method</Select.Option>
              <Select.Option value="qtd2">Gap Statictic</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="algorithmOptimization"
            label="Método para a otimização do posicionamento dos gateways"
          // rules={[{ required: true }]}
          >
            <Select
              placeholder="Selecione o algoritmo"
              allowClear
            >
              <Select.Option value="opt1">K-Means</Select.Option>
              <Select.Option value="opt2">Fuzzy C-Means</Select.Option>
              <Select.Option value="opt3">Algoritmo Genético</Select.Option>
            </Select>
          </Form.Item>

          <Row justify="center">
            <Col>
              <Space>
                <Button type="primary" htmlType="submit">
                  Seguinte
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Limpar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        {/* <pre>{context}</pre> */}
      </div>
    </div>
  );
}

export default App;
