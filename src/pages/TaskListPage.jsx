import { useEffect, useState } from 'react';
import {
  Layout, Row, Col, Table, Modal, Button, Space, Popconfirm,
} from 'antd';
import axios from 'axios';
import {
  BorderOutlined, CheckOutlined, DeleteOutlined, FormOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Column } = Table;

function TaskListPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestTasks = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/tasks');

      setTasks(response.data);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível carregar suas tarefas, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestTasks();
  }, []);

  const completeTask = async (taskId, concluida) => {
    try {
      setLoading(true);

      // TODO: implementar
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível processar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (taskId) => {
    try {
      setLoading(true);

      // TODO: implementar
    } catch (error) {
      console.warn(error);
      Modal.error({
        title: 'Não foi possível processar, tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCompletedTask = (concluida, task) => (
    <Button
      onClick={() => {
        completeTask(task.id, !concluida);
      }}
      icon={concluida ? <CheckOutlined /> : <BorderOutlined />}
    />
  );

  const renderActions = (task) => (
    <Button.Group>
      <Button
        onClick={() => {
          navigate(`/tasks/${task.id}`);
        }}
        icon={<FormOutlined />}
      />
      <Popconfirm
        title="Deseja excluir a tarefa?"
        okText="Sim, excluir"
        cancelText="Não, cancelar"
        onConfirm={() => {
          removeTask(task.id);
        }}
      >
        <Button
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </Button.Group>
  );

  return (
    <Content>
      <br />
      <Space direction="vertical" style={{ display: 'flex' }}>

        <Row justify="center">
          <Col span={23}>

            <Table
              dataSource={tasks}
              pagination={false}
              loading={loading}
              rowKey={(task) => task.id}
            >
              <Column
                title="ID"
                dataIndex="id"
                key="id"
              />
              <Column
                title="Título"
                dataIndex="title"
                key="title"
              />
              <Column
                title="Criada em"
                dataIndex="created_at"
                key="created_at"
                render={(data) => new Date(data).toLocaleString()}
              />
              <Column
                title="Atualizada em"
                dataIndex="updated_at"
                key="updated_at"
                render={(data) => new Date(data).toLocaleString()}
              />
              <Column
                title="Concluída"
                dataIndex="concluded"
                key="concluded"
                render={renderCompletedTask}
              />
              <Column
                title="Ações"
                key="actions"
                render={renderActions}
              />
            </Table>
          </Col>
        </Row>
      </Space>
    </Content>
  );
}

export default TaskListPage;
