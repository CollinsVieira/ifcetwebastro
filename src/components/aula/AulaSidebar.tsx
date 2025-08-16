import type React from "react";

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

interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  status: string;
  startDate: string;
  endDate: string;
  schedule: string;
  codename?: string;
}

type ActiveModule = 'inicio' | 'sesiones' | 'materiales' | 'tareas' | 'examenes';

interface SidebarProps {
  user: User;
  courses: Course[];
  activeCourseId: number | null;
  activeModule: ActiveModule;
  onCourseSelect: (courseId: number) => void;
  onModuleSelect: (module: ActiveModule) => void;
  onLogout: () => void;
}

// Icons
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const CalendarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v9A3.75 3.75 0 0 1 17.25 21h-10.5A3.75 3.75 0 0 1 3 17.25v-9A1.5 1.5 0 0 1 4.5 6.75Z" />
  </svg>
);

const HomeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
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

const TaskIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
  </svg>
);

const ExamIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443a55.381 55.381 0 0 1 5.25 2.882V15a.75.75 0 1 0 1.5 0v-3.675a55.378 55.378 0 0 1 0 7.35V21h-9v-2.325a55.378 55.378 0 0 1 0-7.35V15a.75.75 0 1 0-1.5 0Z" />
  </svg>
);

const LogoutIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m9 0-2.25-2.25M18 12l-2.25 2.25" />
  </svg>
);

export function AulaSidebar({ user, courses, activeCourseId, activeModule, onCourseSelect, onModuleSelect, onLogout }: SidebarProps) {
  const activeCourse = courses.find(c => c.id === activeCourseId);
  const currentProgress = activeCourse ? user.progress[activeCourse.id] || 0 : 0;

  const moduleItems = [
    { id: 'inicio', label: 'Dashboard', icon: HomeIcon },
    { id: 'sesiones', label: 'Sesiones', icon: VideoIcon },
    { id: 'materiales', label: 'Materiales', icon: FileIcon },
    { id: 'tareas', label: 'Tareas', icon: TaskIcon },
    { id: 'examenes', label: 'Exámenes', icon: ExamIcon }
  ] as const;

  return (
    <aside className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
              {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{user.fullName}</h3>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
        
        {activeCourse && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progreso</span>
              <span className="font-medium text-blue-600">{currentProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Course Selection */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          Mis Cursos
        </h3>
        <div className="space-y-2">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                activeCourseId === course.id
                  ? 'bg-blue-50 border border-blue-200 text-blue-700'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${
                  activeCourseId === course.id ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{course.name}</div>
                  <div className="text-xs text-gray-500">
                    {course.status === 'completed' ? 'Finalizado' : course.instructor}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Module Navigation */}
      <div className="flex-1 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Navegación</h3>
        <nav className="space-y-1">
          {moduleItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onModuleSelect(id as ActiveModule)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeModule === id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className={`h-5 w-5 ${
                activeModule === id ? 'text-white' : 'text-gray-400'
              }`} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-gray-100 space-y-3">
        <a 
          href="/contacto#contacto" 
          className="block w-full text-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
        >
          Soporte Técnico
        </a>
        <button 
          onClick={onLogout} 
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-medium"
        >
          <LogoutIcon className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
