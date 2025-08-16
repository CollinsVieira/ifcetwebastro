import type React from "react";

interface User {
  id: number;
  fullName: string;
  docente?: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  recordings: any[];
  materials: any[];
  tasks?: any[];
  exams?: any[];
}

interface InicioModuleProps {
  course: Course;
  user: User;
  onModuleSelect: (module: 'sesiones' | 'materiales' | 'tareas' | 'examenes') => void;
}

// Icons
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

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

const BookIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const ArrowRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const LinkIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
);

export function InicioModule({ course, user, onModuleSelect }: InicioModuleProps) {
  const pendingTasks = course.tasks?.filter(t => t.status === 'active' || t.status === 'pending')?.length || 0;
  const upcomingExams = course.exams?.filter(e => e.status === 'scheduled' || e.status === 'upcoming')?.length || 0;

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button 
          onClick={() => onModuleSelect('sesiones')}
          className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl hover:shadow-lg transition-all duration-300 text-left"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <VideoIcon className="h-6 w-6 text-white" />
            </div>
            <ArrowRightIcon className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Sesiones Grabadas</h3>
          <p className="text-sm text-gray-600 mb-2">{course.recordings.length} grabaciones disponibles</p>
          <span className="text-xs text-blue-600 font-medium">Ver todas →</span>
        </button>

        <button 
          onClick={() => onModuleSelect('materiales')}
          className="group p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl hover:shadow-lg transition-all duration-300 text-left"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileIcon className="h-6 w-6 text-white" />
            </div>
            <ArrowRightIcon className="h-5 w-5 text-emerald-600 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Material de Clase</h3>
          <p className="text-sm text-gray-600 mb-2">{course.materials.length} archivos disponibles</p>
          <span className="text-xs text-emerald-600 font-medium">Ver todos →</span>
        </button>

        <button 
          onClick={() => onModuleSelect('tareas')}
          className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl hover:shadow-lg transition-all duration-300 text-left"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TaskIcon className="h-6 w-6 text-white" />
            </div>
            <ArrowRightIcon className="h-5 w-5 text-purple-600 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Tareas</h3>
          <p className="text-sm text-gray-600 mb-2">{pendingTasks} tareas pendientes</p>
          <span className="text-xs text-purple-600 font-medium">Ver todas →</span>
        </button>

        <button 
          onClick={() => onModuleSelect('examenes')}
          className="group p-6 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl hover:shadow-lg transition-all duration-300 text-left"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ExamIcon className="h-6 w-6 text-white" />
            </div>
            <ArrowRightIcon className="h-5 w-5 text-orange-600 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Exámenes</h3>
          <p className="text-sm text-gray-600 mb-2">{upcomingExams} próximos exámenes</p>
          <span className="text-xs text-orange-600 font-medium">Ver todos →</span>
        </button>
      </div>

      {/* Resources Section */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <BookIcon className="h-6 w-6 text-blue-500" />
          Recursos de Aprendizaje
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="#"
            className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
          >
            <h4 className="font-medium text-gray-900 mb-2 group-hover:text-blue-700">Temario actualizado</h4>
            <p className="text-sm text-gray-600 mb-3">Manual completo para aprovechar al máximo tu curso</p>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
              <LinkIcon className="h-4 w-4" />
              Ver temario
            </div>
          </a>

          <a 
            href="#"
            className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
          >
            <h4 className="font-medium text-gray-900 mb-2 group-hover:text-blue-700">Calendario Académico</h4>
            <p className="text-sm text-gray-600 mb-3">Fechas importantes y cronograma del curso</p>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
              <LinkIcon className="h-4 w-4" />
              Ver calendario
            </div>
          </a>

          <a 
            href="/biblioteca"
            className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
          >
            <h4 className="font-medium text-gray-900 mb-2 group-hover:text-blue-700">Biblioteca Digital</h4>
            <p className="text-sm text-gray-600 mb-3">Acceso a libros y recursos adicionales</p>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
              <LinkIcon className="h-4 w-4" />
              Ir a biblioteca
            </div>
          </a>

          <a 
            href="/contacto#contacto"
            className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
          >
            <h4 className="font-medium text-gray-900 mb-2 group-hover:text-blue-700">Soporte Técnico</h4>
            <p className="text-sm text-gray-600 mb-3">¿Necesitas ayuda? Contacta a nuestro equipo</p>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
              <LinkIcon className="h-4 w-4" />
              Solicitar soporte
            </div>
          </a>
        </div>
      </div>

      {/* Instructor Info */}
      {course.instructor && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Tu Instructor</h3>
          <p className="text-blue-800 font-medium text-lg">{course.instructor}</p>
          <p className="text-sm text-blue-700 mt-1">Especialista en {course.name}</p>
        </div>
      )}
    </div>
  );
}
