import type React from "react";

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
  exams?: Exam[];
}

interface ExamenesModuleProps {
  course: Course;
}

// Icons
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const ExamIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443a55.381 55.381 0 0 1 5.25 2.882V15a.75.75 0 1 0 1.5 0v-3.675a55.378 55.378 0 0 1 0 7.35V21h-9v-2.325a55.378 55.378 0 0 1 0-7.35V15a.75.75 0 1 0-1.5 0Z" />
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

const PlayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.5l11.5 6.5-11.5 6.5v-13z" />
  </svg>
);

const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const QuestionMarkIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>
);

const StarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5Z" />
  </svg>
);

export function ExamenesModule({ course }: ExamenesModuleProps) {
  const exams = course.exams || [];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'scheduled':
      case 'upcoming':
        return {
          label: 'Programado',
          colorClass: 'from-blue-500 to-blue-600',
          bgClass: 'bg-blue-50 border-blue-200',
          textClass: 'text-blue-700'
        };
      case 'available':
        return {
          label: 'Disponible',
          colorClass: 'from-green-500 to-green-600',
          bgClass: 'bg-green-50 border-green-200',
          textClass: 'text-green-700'
        };
      case 'completed':
        return {
          label: 'Completado',
          colorClass: 'from-gray-500 to-gray-600',
          bgClass: 'bg-gray-50 border-gray-200',
          textClass: 'text-gray-700'
        };
      case 'graded':
        return {
          label: 'Calificado',
          colorClass: 'from-purple-500 to-purple-600',
          bgClass: 'bg-purple-50 border-purple-200',
          textClass: 'text-purple-700'
        };
      default:
        return {
          label: 'Programado',
          colorClass: 'from-blue-500 to-blue-600',
          bgClass: 'bg-blue-50 border-blue-200',
          textClass: 'text-blue-700'
        };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getDaysUntilExam = (examDate: string) => {
    try {
      const exam = new Date(examDate);
      const now = new Date();
      const diffTime = exam.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Exámenes</h2>
        <div className="text-sm text-gray-500">
          {exams.filter(e => e.status === 'scheduled' || e.status === 'upcoming' || e.status === 'available').length} exámenes programados
        </div>
      </div>

      <div className="grid gap-6">
        {exams.map((exam) => {
          const statusInfo = getStatusInfo(exam.status);
          const daysUntilExam = getDaysUntilExam(exam.date);

          return (
            <div 
              key={exam.id} 
              className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  <div className={`h-14 w-14 bg-gradient-to-br ${statusInfo.colorClass} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    {exam.status === 'completed' || exam.status === 'graded' ? (
                      <CheckIcon className="h-7 w-7 text-white" />
                    ) : exam.status === 'available' ? (
                      <PlayIcon className="h-7 w-7 text-white" />
                    ) : (
                      <ExamIcon className="h-7 w-7 text-white" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                      {exam.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium border rounded-full ${statusInfo.bgClass} ${statusInfo.textClass}`}>
                        {statusInfo.label}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">{exam.points} puntos</div>
                        {exam.grade && (
                          <div className="text-xs text-green-600 font-medium">Nota: {exam.grade}/20</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {exam.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="font-medium">Fecha</div>
                        <div className="text-xs">{formatDate(exam.date)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="font-medium">Duración</div>
                        <div className="text-xs">{exam.duration} minutos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <QuestionMarkIcon className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="font-medium">Preguntas</div>
                        <div className="text-xs">{exam.questions} preguntas</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <StarIcon className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="font-medium">Intentos</div>
                        <div className="text-xs">{exam.attempts} permitido{exam.attempts > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  </div>

                  {daysUntilExam !== null && exam.status !== 'completed' && exam.status !== 'graded' && (
                    <div className="flex items-center gap-2 text-sm">
                      <ClockIcon className="h-4 w-4" />
                      <span className={`font-medium ${
                        daysUntilExam < 0 ? 'text-red-600' : 
                        daysUntilExam <= 7 ? 'text-orange-600' : 
                        'text-green-600'
                      }`}>
                        {daysUntilExam < 0 ? `Examen pasado` :
                         daysUntilExam === 0 ? 'Examen hoy' :
                         `En ${daysUntilExam} días`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  {exam.status === 'available' ? (
                    <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 shadow-lg shadow-green-500/25 font-medium group-hover:scale-105">
                      <PlayIcon className="h-5 w-5" />
                      Iniciar examen
                    </button>
                  ) : exam.status === 'completed' ? (
                    <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">
                      <CheckIcon className="h-5 w-5" />
                      Completado
                    </div>
                  ) : exam.status === 'graded' ? (
                    <div className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium">
                      <StarIcon className="h-5 w-5" />
                      Calificado
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-medium">
                      <CalendarIcon className="h-5 w-5" />
                      Programado
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {exams.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExamIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay exámenes programados</h3>
          <p className="text-gray-500">Los exámenes aparecerán aquí cuando estén programados.</p>
        </div>
      )}
    </div>
  );
}
