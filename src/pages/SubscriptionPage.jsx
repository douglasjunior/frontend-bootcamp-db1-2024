import {
  Button, Card,
  Col, Form, Layout, Row,
  Typography, Modal,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import axios from 'axios';

import Logo from '../assets/catalisa.png';
import InputText from '../components/InputText';
import { validateEmail, validateName, validatePassword } from '../helpers/validation-helper';

const { Content } = Layout;
const { Title } = Typography;

function SubscriptionPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubscription = useCallback(async () => {
    try {
      setLoading(true);

      const { nome, email, senha } = formValues;

      if (!nome?.valid || !email?.valid || !senha?.valid) return;

      const body = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
      };

      await axios.post('/usuarios', body);

      Modal.success({
        title: 'Cadastro realizado com sucesso, efetue login para continuar.',
      });

      navigate('/login');
    } catch (error) {
      console.warn(error);
      const { response } = error;
      if (response?.status === 422) {
        Modal.error({
          title: 'E-mail já cadastrado no banco de dados.',
        });
      } else {
        Modal.error({
          title: 'Não foi cadastrar-se, tente novamente mais tarde.',
        });
      }
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate]);

  const handleInputChange = useCallback((event) => {
    const { name, input } = event;

    setFormValues({
      ...formValues,
      [name]: input,
    });
  }, [formValues]);

  return (
    <Content>
      <Row
        justify="center"
      >
        <Col xs={24} sl={14} md={12} lg={10} xl={8}>
          <Card style={{ margin: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={Logo}
                alt="Catalisa Tech"
                style={{ maxWidth: '100%' }}
              />
            </div>

            <Title
              level={3}
              type="secondary"
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              Cadastre-se
            </Title>

            <Form layout="vertical">
              <InputText
                name="nome"
                label="Nome"
                size="large"
                onChange={handleInputChange}
                validate={validateName}
                disabled={loading}
                required
                value={formValues.nome?.value}
              />

              <InputText
                name="email"
                label="E-mail"
                size="large"
                onChange={handleInputChange}
                validate={validateEmail}
                disabled={loading}
                required
                value={formValues.email?.value}
              />

              <InputText
                name="senha"
                label="Senha"
                type="password"
                size="large"
                onChange={handleInputChange}
                validate={validatePassword}
                disabled={loading}
                autoComplete="new-password"
                required
                value={formValues.senha?.value}
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleSubscription}
                loading={loading}
              >
                Cadastrar
              </Button>
            </Form>

            <br />

            <Typography.Text>
              Voltar para o
              {' '}
              <Link
                to="/login"
                className="ant-btn ant-btn-link ant-btn-lg ant-btn-block"
              >
                Login
              </Link>
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default SubscriptionPage;
