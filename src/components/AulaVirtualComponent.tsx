"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type React from "react";
import data from "../data/aula.json";

interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  courseIds: number[];
}

interface Recording { title: string; url: string }
interface Material { title: string; url: string }

interface Course {
  id: number;
  name: string;
  startDate: string; // ISO
  schedule: string;
  recordings: Recording[];
  materials: Material[];
  zoom: string;
}

export function AulaVirtualComponent() {
  const users: User[] = data.users as any;
  const courses: Course[] = data.courses as any;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);

  // Icons
  type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };
  const UserIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 1 1 16.5 0v.75H4.5v-.75Z" />
    </svg>
  );
  const LogoutIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m9 0-2.25-2.25M18 12l-2.25 2.25" />
    </svg>
  );
  const CalendarIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v9A3.75 3.75 0 0 1 17.25 21h-10.5A3.75 3.75 0 0 1 3 17.25v-9A1.5 1.5 0 0 1 4.5 6.75Z" />
    </svg>
  );
  const VideoIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6.75A1.5 1.5 0 0 0 14.25 5.25h-9A1.5 1.5 0 0 0 3.75 6.75v10.5A1.5 1.5 0 0 0 5.25 18.75h9a1.5 1.5 0 0 0 1.5-1.5V13.5l4.5 3v-9l-4.5 3Z" />
    </svg>
  );
  const FileIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h4.5L18 8.25v9A3 3 0 0 1 15 20.25H9A3 3 0 0 1 6 17.25v-9A3 3 0 0 1 9 5.25Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3.75V7.5H18" />
    </svg>
  );
  const ShieldIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75 4.5 6.75v6a9 9 0 0 0 7.5 8.73A9 9 0 0 0 19.5 12.75v-6L12 3.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75l1.5 1.5 3-3" />
    </svg>
  );

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) {
      setError("Usuario o contraseña incorrectos");
      return;
    }
    setLoggedUser(found);
    setActiveCourseId(found.courseIds[0] ?? null);
  };

  const handleLogout = () => {
    setLoggedUser(null);
    setUsername("");
    setPassword("");
    setActiveCourseId(null);
    try {
      localStorage.removeItem('aulaUser');
      localStorage.removeItem('activeCourseId');
      const url = new URL(window.location.href);
      url.searchParams.delete('curso');
      url.searchParams.delete('c');
      window.history.replaceState({}, '', url);
    } catch {}
  };

  if (!loggedUser) {
    return (
      <section className="min-h-[100vh] grid place-items-center bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
        <div className="w-full max-w-md p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
          <h1 className="text-2xl font-bold mb-1 text-center">Aula Virtual</h1>
          <p className="text-white/70 mb-6">Accede con tu usuario y contraseña asignados.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Usuario</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-white/90 text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
                placeholder="usuario"
                autoComplete="contraseña"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white/90 text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="text-sm text-red-300">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-[#ffb403] text-black font-semibold px-4 py-2.5 rounded-lg hover:brightness-95 transition"
            >
              Ingresar
            </button>
          </form>
        </div>
      </section>
    );
  }

  const activeCourse = myCourses.find((c) => c.id === activeCourseId) || myCourses[0];

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="min-h-[10vh] bg-[#191c29]/90">
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-6 self-start">
          <div className="p-5 bg-white rounded-xl border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 grid place-items-center text-slate-600">
                <UserIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Alumno</p>
                <p className="font-semibold leading-tight">{loggedUser.fullName}</p>
              </div>
            </div>
            
          </div>

          <div className="p-5 bg-white rounded-xl border shadow-sm">
            <h3 className="font-semibold mb-3">Mis cursos</h3>
            <div className="space-y-2">
              {myCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => selectCourse(c.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition flex items-start gap-3 ${
                    activeCourse?.id === c.id
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="mt-0.5">
                    <CalendarIcon className={`h-5 w-5 ${activeCourse?.id === c.id ? 'text-blue-600' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="text-xs text-gray-500">Inicio: {new Date(c.startDate).toLocaleDateString('es-PE')}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <a href="/contacto#contacto" className="block text-center px-4 py-2.5 rounded-lg bg-[#101fd2] text-white hover:bg-[#0e1ab3] transition">Soporte</a>
          <div className="mt-4 flex items-center justify-center">
              <button onClick={handleLogout} className="w-full inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-red-500 hover:scale-105 transition-all duration-300 text-white">
                <LogoutIcon className="h-4 w-4" /> Cerrar sesión
              </button>
            </div>
        </aside>

        {/* Main */}
        <main className="space-y-6">
          <div className="p-5 bg-white rounded-xl border shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{activeCourse.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                  <span>{activeCourse.schedule}</span>
                  <span className="mx-1">•</span>
                  <span>Inicio: {new Date(activeCourse.startDate).toLocaleDateString('es-PE')}</span>
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 border">
                  <VideoIcon className="h-4 w-4 text-slate-600" /> {activeCourse.recordings.length} clases
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 border">
                  <FileIcon className="h-4 w-4 text-slate-600" /> {activeCourse.materials.length} archivos
                </span>
                {activeCourse.zoom && (
                  <a href={activeCourse.zoom} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    Ingresar a clases en vivo
                  </a>
                )}
              </div>
            </div>
            
            {error && (
              <div className="mt-3 text-sm text-red-600">{error}</div>
            )}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <VideoIcon className="h-5 w-5 text-blue-600" /> Grabaciones (Zoom)
              </h4>
              <ul className="space-y-2">
                {activeCourse.recordings.map((r, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-md bg-blue-50 text-blue-700 grid place-items-center border border-blue-200">
                        <VideoIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{r.title}</p>
                        <p className="text-xs text-gray-500">Grabación</p>
                      </div>
                    </div>
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        Ver
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-white rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileIcon className="h-5 w-5 text-emerald-700" /> Material descargable
              </h4>
              <ul className="space-y-2">
                {activeCourse.materials.map((m, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-md bg-emerald-50 text-emerald-700 grid place-items-center border border-emerald-200">
                        <FileIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{m.title}</p>
                        <p className="text-xs text-gray-500">Archivo</p>
                      </div>
                    </div>
                    <a href={m.url} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" download>
                      Descargar
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
