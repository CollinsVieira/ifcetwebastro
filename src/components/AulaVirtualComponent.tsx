"use client";

import { useMemo, useState } from "react";
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
}

export function AulaVirtualComponent() {
  const users: User[] = data.users as any;
  const courses: Course[] = data.courses as any;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);

  const myCourses = useMemo(() => {
    if (!loggedUser) return [] as Course[];
    return courses.filter((c) => loggedUser.courseIds.includes(c.id));
  }, [loggedUser, courses]);

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
  };

  if (!loggedUser) {
    return (
      <section className="min-h-[70vh] grid place-items-center bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
        <div className="w-full max-w-md p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
          <h1 className="text-2xl font-bold mb-1">Aula Virtual IFCET</h1>
          <p className="text-white/70 mb-6">Accede con tu usuario y contraseña asignados.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Usuario</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-white/90 text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
                placeholder="alumno1"
                autoComplete="username"
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

            <p className="text-xs text-white/70">Demo: usuario "alumno1" / contraseña "ifcet2025"</p>
          </form>
        </div>
      </section>
    );
  }

  const activeCourse = myCourses.find((c) => c.id === activeCourseId) || myCourses[0];

  return (
    <section className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Hola, {loggedUser.fullName}</h2>
            <p className="text-white/70 text-sm">Bienvenido a tu panel del aula virtual</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15">
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6">
        <aside className="space-y-3">
          <div className="p-4 bg-white rounded-xl border">
            <h3 className="font-semibold mb-3">Mis cursos</h3>
            <div className="space-y-2">
              {myCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCourseId(c.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition ${
                    (activeCourse?.id === c.id)
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-gray-500">Inicio: {new Date(c.startDate).toLocaleDateString('es-PE')}</div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          <div className="p-5 bg-white rounded-xl border">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{activeCourse.name}</h3>
                <p className="text-sm text-gray-600">{activeCourse.schedule} • Inicio: {new Date(activeCourse.startDate).toLocaleDateString('es-PE')}</p>
              </div>
              <a href="/contacto#contacto" className="px-4 py-2 rounded-lg bg-[#101fd2] text-white hover:bg-[#ffb204] transition">Soporte</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white rounded-xl border">
              <h4 className="font-semibold mb-3">Grabaciones (Zoom)</h4>
              <ul className="space-y-2">
                {activeCourse.recordings.map((r, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{r.title}</p>
                      <p className="text-xs text-gray-500">Video</p>
                    </div>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Ver</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-white rounded-xl border">
              <h4 className="font-semibold mb-3">Material descargable</h4>
              <ul className="space-y-2">
                {activeCourse.materials.map((m, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{m.title}</p>
                      <p className="text-xs text-gray-500">Archivo</p>
                    </div>
                    <a href={m.url} className="px-3 py-1.5 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" download>
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
