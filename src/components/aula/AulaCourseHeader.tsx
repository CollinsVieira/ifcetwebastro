import type React from "react";

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
  recordings: any[];
  materials: any[];
}

interface CourseHeaderProps {
  course: Course;
  error?: string | null;
}

// Icons
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

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

const UserIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 1 1 16.5 0v.75H4.5v-.75Z" />
  </svg>
);

export function AulaCourseHeader({ course, error }: CourseHeaderProps) {
  const formatDate = (dateString: string) => {
    if (dateString === "Finalizó." || dateString === "Curso Finalizado") {
      return "Curso finalizado";
    }
    try {
      return new Date(dateString).toLocaleDateString('es-PE');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'En curso';
      case 'completed':
        return 'Finalizado';
      default:
        return 'Activo';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2 mb-3">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">{course.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2 sm:px-3 py-1 text-xs font-medium border rounded-full ${getStatusColor(course.status)}`}>
                {getStatusText(course.status)}
              </span>
              {course.codename && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md font-mono">
                  {course.codename}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span className="font-medium">{course.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span>{course.schedule}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Inicio: {formatDate(course.startDate)}</span>
            </div>
            {course.endDate && course.status !== 'completed' && (
              <div className="flex items-center gap-2">
                <span>Fin: {formatDate(course.endDate)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-sm">
            <div className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
              <VideoIcon className="h-3 w-3 sm:h-4 sm:w-4" /> 
              <span className="font-medium text-xs sm:text-sm">{course.recordings.length}</span>
              <span className="text-blue-600 text-xs sm:text-sm hidden sm:inline">sesiones</span>
            </div>
            <div className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <FileIcon className="h-3 w-3 sm:h-4 sm:w-4" /> 
              <span className="font-medium text-xs sm:text-sm">{course.materials.length}</span>
              <span className="text-emerald-600 text-xs sm:text-sm hidden sm:inline">archivos</span>
            </div>
          </div>
          
          {course.zoom && course.status === 'active' && (
            <a 
              href={course.zoom} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/25 font-medium text-xs sm:text-sm"
            >
              <VideoIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Clase en vivo</span>
              <span className="sm:hidden">En vivo</span>
            </a>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
