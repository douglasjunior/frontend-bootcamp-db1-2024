import {
  Routes, Route, Navigate,
} from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';
import LoginPage from '../pages/LoginPage';
import SubscriptionPage from '../pages/SubscriptionPage';
import TaskCreatePage from '../pages/TaskCreatePage';
import TaskListPage from '../pages/TaskListPage';
import AppLayout from './AppLayout';

function MainLayout() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route
        path="/tasks"
        element={(
          <PrivateRoute>
            <AppLayout>
              <TaskListPage />
            </AppLayout>
          </PrivateRoute>
        )}
      />
      <Route
        path="/tasks/new"
        element={(
          <PrivateRoute>
            <AppLayout>
              <TaskCreatePage />
            </AppLayout>
          </PrivateRoute>
        )}
      />
      <Route
        path="/tasks/:taskId"
        element={(
          <PrivateRoute>
            <AppLayout>
              <TaskCreatePage />
            </AppLayout>
          </PrivateRoute>
        )}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
    </Routes>
  );
}

export default MainLayout;
