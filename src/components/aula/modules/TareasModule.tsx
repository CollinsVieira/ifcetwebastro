import type React from "react";

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

interface Course {
  id: number;
  name: string;
  tasks?: Task[];
}

interface TareasModuleProps {
  course: Course;
}

// Icons
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const TaskIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
  </svg>
);

const CalendarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v9A3.75 3.75 0 0 1 17.25 21h-10.5A3.75 3.75 0 0 1 3 17.25v-9A1.5 1.5 0 0 1 4.5 6.75Z" />
  </svg>
);

const ClockIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const UploadIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

const StarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5Z" />
  </svg>
);

export function TareasModule({ course }: TareasModuleProps) {
  const tasks = course.tasks || [];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
      case 'pending':
        return {
          label: 'Pendiente',
          colorClass: 'from-yellow-500 to-orange-500',
          bgClass: 'bg-yellow-50 border-yellow-200',
          textClass: 'text-yellow-700'
        };
      case 'submitted':
        return {
          label: 'Enviado',
          colorClass: 'from-blue-500 to-blue-600',
          bgClass: 'bg-blue-50 border-blue-200',
          textClass: 'text-blue-700'
        };
      case 'graded':
        return {
          label: 'Calificado',
          colorClass: 'from-green-500 to-green-600',
          bgClass: 'bg-green-50 border-green-200',
          textClass: 'text-green-700'
        };
      case 'closed':
        return {
          label: 'Cerrado',
          colorClass: 'from-gray-500 to-gray-600',
          bgClass: 'bg-gray-50 border-gray-200',
          textClass: 'text-gray-700'
        };
      default:
        return {
          label: 'Pendiente',
          colorClass: 'from-yellow-500 to-orange-500',
          bgClass: 'bg-yellow-50 border-yellow-200',
          textClass: 'text-yellow-700'
        };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    try {
      const due = new Date(dueDate);
      const now = new Date();
      const diffTime = due.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Tareas y Actividades</h2>
        <div className="text-sm text-gray-500">
          {tasks.filter(t => t.status === 'active' || t.status === 'pending').length} tareas pendientes
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6">
        {tasks.map((task) => {
          const statusInfo = getStatusInfo(task.status);
          const daysUntilDue = getDaysUntilDue(task.dueDate);

          return (
            <div 
              key={task.id} 
              className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                {/* Status Icon */}
                <div className="flex items-center gap-4 lg:gap-0 lg:flex-shrink-0">
                  <div className={`h-12 w-12 lg:h-14 lg:w-14 bg-gradient-to-br ${statusInfo.colorClass} rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                    {task.status === 'graded' ? (
                      <CheckIcon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    ) : task.status === 'submitted' ? (
                      <StarIcon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    ) : (
                      <TaskIcon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    )}
                  </div>
                  
                  {/* Title and status on mobile - inline with icon */}
                  <div className="lg:hidden flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
                        {task.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium border rounded-full ${statusInfo.bgClass} ${statusInfo.textClass} whitespace-nowrap`}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-3 lg:space-y-4">
                  {/* Title and status on desktop */}
                  <div className="hidden lg:flex lg:items-start lg:justify-between lg:mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium border rounded-full ${statusInfo.bgClass} ${statusInfo.textClass}`}>
                        {statusInfo.label}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">{task.points} puntos</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Points on mobile */}
                  <div className="lg:hidden text-sm font-medium text-blue-600">{task.points} puntos</div>
                  
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    {task.description}
                  </p>

                  {task.instructions && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Instrucciones:</h4>
                      <p className="text-sm text-blue-800">{task.instructions}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="text-xs lg:text-sm">Vencimiento: {formatDate(task.dueDate)}</span>
                    </div>
                    {daysUntilDue !== null && task.status !== 'graded' && task.status !== 'closed' && (
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <span className={`font-medium text-xs lg:text-sm ${
                          daysUntilDue < 0 ? 'text-red-600' : 
                          daysUntilDue <= 3 ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {daysUntilDue < 0 ? `Vencido hace ${Math.abs(daysUntilDue)} días` :
                           daysUntilDue === 0 ? 'Vence hoy' :
                           `${daysUntilDue} días restantes`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 w-full lg:w-auto">
                  {task.status === 'active' || task.status === 'pending' ? (
                    <button className="flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-purple-500 text-white rounded-lg lg:rounded-xl hover:bg-purple-600 transition-all duration-200 shadow-lg shadow-purple-500/25 font-medium group-hover:scale-105 text-sm lg:text-base w-full lg:w-auto">
                      <UploadIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                      Enviar tarea
                    </button>
                  ) : task.status === 'submitted' ? (
                    <div className="flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-blue-100 text-blue-700 rounded-lg lg:rounded-xl font-medium text-sm lg:text-base w-full lg:w-auto">
                      <CheckIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                      Enviado
                    </div>
                  ) : task.status === 'graded' ? (
                    <div className="flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-green-100 text-green-700 rounded-lg lg:rounded-xl font-medium text-sm lg:text-base w-full lg:w-auto">
                      <StarIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                      Calificado
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-gray-100 text-gray-500 rounded-lg lg:rounded-xl font-medium text-sm lg:text-base w-full lg:w-auto">
                      <ClockIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                      Cerrado
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TaskIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas disponibles</h3>
          <p className="text-gray-500">Las tareas y actividades aparecerán aquí cuando estén disponibles.</p>
        </div>
      )}
      
      {/* Extra padding for mobile scrolling */}
      <div className="h-4 lg:h-0"></div>
    </div>
  );
}
