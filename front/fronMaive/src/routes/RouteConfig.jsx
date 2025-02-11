import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Usuarios from '../pages/Usuarios'
import Arriendos from '../pages/Arriendos'
import AgregarArriendo from '../pages/AgregarArriendo'
import EditarArriendo from '../pages/EditarArriendo'

import ProtectedRoute from '../components/ProtectedRoute';

export default function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Usuarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/arriendos"
        element={
          <ProtectedRoute>
            <Arriendos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agregarArriendo"
        element={
          <ProtectedRoute>
            <AgregarArriendo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editarArriendos"
        element={
          <ProtectedRoute>
            <EditarArriendo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

