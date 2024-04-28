import { useState } from 'react';
import { theme, Steps } from 'antd';
import Step1 from './pages/first';
import Step2 from './pages/second';
import { ExperimentOutlined, SaveOutlined, SolutionOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);


  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: 'Parâmetros',
      content: < Step1 next={() => next()} />,
      // description: 'Simulação',
      icon: <SolutionOutlined />,
    },
    {
      title: 'Visualização',
      content: < Step2 next={() => next()} prev={() => prev()} />,
      // description: 'do Cenário e Resultados',
      icon: <ExperimentOutlined />,
    },
    {
      title: 'Download',
      content: <div>
        <h1>Download</h1>
        <p>Download dos Resultados</p>
      </div>,
      // description: 'dos Resultados',
      icon: <SaveOutlined />,
    },
  ];


  const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
}

export default App;
