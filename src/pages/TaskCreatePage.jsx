import {
  Button,
  Col, Form, Modal, notification, Row, Space,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InputText from '../components/InputText';
import { validateTaskTitle } from '../validatiors/tarefas';

function TaskCreatePage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((event) => {
    const { name, input } = event;

    setFormValues({
      ...formValues,
      [name]: input,
    });
  }, [formValues]);

  const requestTask = useCallback(async () => {
    try {
      setLoading(true);

      // TODO: implementar
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi carregar a tarefa, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      requestTask();
    } else {
      setFormValues({});
    }
  }, [requestTask, taskId]);

  const handleCreateTask = useCallback(async () => {
    try {
      setLoading(true);

      const { titulo } = formValues;

      if (!titulo?.valid) return;

      // TODO: implementar
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi cadastrar-se, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate, taskId]);

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>

        <Row justify="center">
          <Col xs={23} sm={14} md={12} lg={10} xl={8}>

            <Form layout="vertical">
              <InputText
                name="titulo"
                label="Título da tarefa"
                size="large"
                onChange={handleInputChange}
                validate={validateTaskTitle}
                disabled={loading}
                required
                value={formValues.titulo?.value}
              />

              <Button
                block
                type="primary"
                size="large"
                onClick={handleCreateTask}
                loading={loading}
              >
                Salvar
              </Button>
            </Form>

          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default TaskCreatePage;
