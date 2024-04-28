import { Button, Card, Col, Row, Space, Divider } from 'antd';
import pos from './../assets/pos_gateways.png'

interface SimulationParameters {
    next: () => void;
    prev: () => void;
}

export default function SimSetup({ next, prev }: SimulationParameters) {
    const gridStyle: React.CSSProperties = {
        width: '100%',
        textAlign: 'center',
    };
    return (
        <>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <div style={{ display: 'flex' }}>
                    <img alt="example" src={pos} style={{ width: '50%', height: '50%' }} />
                    <div style={{ marginLeft: '20px' }}>
                        <Card title="Resultados da Simulação">
                            <Card.Grid style={gridStyle}>Packet Delivery Rate: 92%</Card.Grid>
                            <Card.Grid style={gridStyle}>Received Signal Strength: -100 dbm</Card.Grid>
                            <Card.Grid style={gridStyle}>Signal to Noise: 90</Card.Grid>
                            <Card.Grid style={gridStyle}>Delay: 50 ns</Card.Grid>
                        </Card>
                    </div>
                </div>

                <Divider />

                <Row justify="center">
                    <Col style={{ lineHeight: '10px' }}>
                        <Space>
                            <Button key="back" onClick={() => { prev() }}>
                                Voltar
                            </Button>
                            <Button type="primary" onClick={() => {next()}}>
                                Seguinte
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
}
