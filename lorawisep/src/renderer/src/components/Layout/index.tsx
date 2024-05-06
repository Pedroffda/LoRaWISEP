import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

interface LayoutProps {
    items: MenuProps['items'];
    children: React.ReactNode;
}

export default function LWLayout({items, children}: LayoutProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{minHeight:'100vh'}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>LoRaWISEP</Breadcrumb.Item>
          <Breadcrumb.Item>Simulação</Breadcrumb.Item>
          {/* <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, minHeight:'82vh' }}
        >
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        LoRaWISEP ©{new Date().getFullYear()} Created by LITTORAL Tecnologia
      </Footer>
    </Layout>
  );
};
