import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { AuthLayout } from './components/AuthLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterTutorPage = lazy(() =>
  import('./pages/RegisterTutorPage').then((m) => ({ default: m.RegisterTutorPage }))
);
const PetsListPage = lazy(() =>
  import('./pages/PetsListPage').then((m) => ({ default: m.PetsListPage }))
);
const PetDetailPage = lazy(() =>
  import('./pages/PetDetailPage').then((m) => ({ default: m.PetDetailPage }))
);
const PetFormPage = lazy(() =>
  import('./pages/PetFormPage').then((m) => ({ default: m.PetFormPage }))
);
const TutoresListPage = lazy(() =>
  import('./pages/TutoresListPage').then((m) => ({ default: m.TutoresListPage }))
);
const TutorDetailPage = lazy(() =>
  import('./pages/TutorDetailPage').then((m) => ({ default: m.TutorDetailPage }))
);
const TutorFormPage = lazy(() =>
  import('./pages/TutorFormPage').then((m) => ({ default: m.TutorFormPage }))
);

const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <LoginPage />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route
            path="/cadastro-tutor"
            element={
              <AuthLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <RegisterTutorPage />
                </Suspense>
              </AuthLayout>
            }
          />
          <Route path="/" element={<Navigate to="/pets" replace />} />
          <Route
            path="/pets"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <PetsListPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets/novo"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <PetFormPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets/:id/editar"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <PetFormPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <PetDetailPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutores"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <TutoresListPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutores/novo"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <TutorFormPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutores/:id/editar"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <TutorFormPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutores/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <TutorDetailPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/pets" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
