"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type React from "react";
import data from "../data/aula.json";
import { LoginComponent } from "./LoginComponent";
import { AulaSidebar } from "./aula/AulaSidebar";
import { AulaCourseHeader } from "./aula/AulaCourseHeader";
import { InicioModule } from "./aula/modules/InicioModule";
import { SesionesModule } from "./aula/modules/SesionesModule";
import { MaterialesModule } from "./aula/modules/MaterialesModule";
import { TareasModule } from "./aula/modules/TareasModule";
import { ExamenesModule } from "./aula/modules/ExamenesModule";

interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  courseIds: number[];
  enrollmentDate: string;
  avatar: string | null;
  progress: Record<string, number>;
  docente?: string;
}

interface Recording {
  id: number;
  title: string;
  url: string;
  duration: string;
  date: string;
  description: string;
}

interface Material {
  id: number;
  title: string;
  url: string;
  type: string;
  size: string;
  uploadDate: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: string;
  submissions: any[];
  instructions: string;
}

interface Exam {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: number;
  points: number;
  status: string;
  attempts: number;
  timeLimit: boolean;
  questions: number;
  grade?: number;
}

interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  zoom: string;
  startDate: string;
  endDate: string;
  schedule: string;
  status: string;
  totalSessions: number;
  codename?: string;
  recordings: Recording[];
  materials: Material[];
  tasks?: Task[];
  exams?: Exam[];
}

type ActiveModule = 'inicio' | 'sesiones' | 'materiales' | 'tareas' | 'examenes';

export function AulaVirtualComponent() {
  const users: User[] = data.users as any;
  const courses: Course[] = data.courses as any;

  const [error, setError] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<ActiveModule>('inicio');
  const [sidebarOpen, setSidebarOpen] = useState(false);



  const myCourses = useMemo(() => {
    if (!loggedUser) return [] as Course[];
    return courses.filter((c) => loggedUser.courseIds.includes(c.id));
  }, [loggedUser, courses]);

  const canAccessCourse = useCallback(
    (courseId: number | null) => {
      if (!loggedUser || courseId == null) return false;
      return loggedUser.courseIds.includes(courseId);
    },
    [loggedUser]
  );

  const selectCourse = useCallback(
    (courseId: number) => {
      if (!canAccessCourse(courseId)) {
        setError("No tienes acceso a este curso.");
        return;
      }
      setError(null);
      setActiveCourseId(courseId);
    },
    [canAccessCourse]
  );

  // Restore session and intended course from URL/localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('aulaUser') : null;
      if (raw) {
        const parsed = JSON.parse(raw) as User;
        setLoggedUser(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!loggedUser) return;
    const url = new URL(window.location.href);
    const qp = url.searchParams.get('curso') || url.searchParams.get('c');
    const wanted = qp ? Number(qp) : NaN;
    const stored = Number(localStorage.getItem('activeCourseId'));
    const firstAllowed = loggedUser.courseIds[0] ?? null;

    if (!Number.isNaN(wanted) && canAccessCourse(wanted)) {
      setActiveCourseId(wanted);
    } else if (!Number.isNaN(stored) && canAccessCourse(stored)) {
      setActiveCourseId(stored);
    } else {
      setActiveCourseId(firstAllowed);
    }

    if (!Number.isNaN(wanted) && !canAccessCourse(wanted)) {
      setError("No tienes acceso a este curso.");
    }
  }, [loggedUser, canAccessCourse]);

  // Persist session and sync URL when course changes
  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem('aulaUser', JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem('aulaUser');
    }
  }, [loggedUser]);

  useEffect(() => {
    if (!activeCourseId || !canAccessCourse(activeCourseId)) return;
    const url = new URL(window.location.href);
    url.searchParams.set('curso', String(activeCourseId));
    window.history.replaceState({}, '', url);
    localStorage.setItem('activeCourseId', String(activeCourseId));
  }, [activeCourseId, canAccessCourse]);

  const handleLogin = useCallback((username: string, password: string) => {
    setError(null);
    try {
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) {
      setError("Usuario o contraseña incorrectos");
      return;
    }
    setLoggedUser(found);
    setActiveCourseId(found.courseIds[0] ?? null);
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
      console.error("Login error:", err);
    }
  }, [users]);

  const handleLogout = () => {
    setLoggedUser(null);
    setActiveCourseId(null);
    setActiveModule('inicio');
    try {
      localStorage.removeItem('aulaUser');
      localStorage.removeItem('activeCourseId');
      const url = new URL(window.location.href);
      url.searchParams.delete('curso');
      url.searchParams.delete('c');
      window.history.replaceState({}, '', url);
    } catch {}
  };

  // Función para renderizar el contenido del módulo activo
  const renderModuleContent = () => {
    const activeCourse = myCourses.find((c) => c.id === activeCourseId) || myCourses[0];
    if (!activeCourse) return null;

    switch (activeModule) {
      case 'inicio':
        return <InicioModule course={activeCourse} user={loggedUser!} onModuleSelect={setActiveModule} />;
      case 'sesiones':
        return <SesionesModule course={activeCourse} />;
      case 'materiales':
        return <MaterialesModule course={activeCourse} />;
      case 'tareas':
        return <TareasModule course={activeCourse} />;
      case 'examenes':
        return <ExamenesModule course={activeCourse} />;
      default:
        return <InicioModule course={activeCourse} user={loggedUser!} onModuleSelect={setActiveModule} />;
    }
  };

  if (!loggedUser) {
    return <LoginComponent onLogin={handleLogin} error={error} />;
  }

  const activeCourse = myCourses.find((c) => c.id === activeCourseId) || myCourses[0];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <div className="h-12 bg-gradient-to-r from-[#191c29] to-[#2d3748] shadow-lg flex items-center px-4 lg:px-6 flex-shrink-0">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-white hover:text-blue-200 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Title for mobile */}
        <h1 className="lg:hidden ml-3 text-white font-semibold text-sm truncate">
          {activeCourse?.name || 'Aula Virtual'}
        </h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:relative z-50 lg:z-auto
          w-80 lg:w-72 xl:w-80 h-full
          lg:flex-shrink-0
        `}>
          <div className="h-full overflow-hidden">
            <AulaSidebar
              user={loggedUser}
              courses={myCourses}
              activeCourseId={activeCourseId}
              activeModule={activeModule}
              onCourseSelect={selectCourse}
              onModuleSelect={(module) => {
                setActiveModule(module);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              onLogout={handleLogout}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            <div className="p-3 lg:p-6 pb-6 lg:pb-8 max-w-full">
              {/* Course Header */}
              {activeCourse && (
                <div className="mb-4 lg:mb-6">
                  <AulaCourseHeader course={activeCourse} error={error} />
                </div>
              )}

              {/* Module Content */}
              <div className="w-full">
                {renderModuleContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
