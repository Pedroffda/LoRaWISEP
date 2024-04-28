import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import logo from './../assets/logo.png'

interface SimulationParameters {
    next: () => void;
}

export default function SimSetup({ next }: SimulationParameters) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    window.electron.setParameters(values);
      next();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (  
    <>
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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Form
          style={{ width: '100%', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
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
    </>
  );
}
