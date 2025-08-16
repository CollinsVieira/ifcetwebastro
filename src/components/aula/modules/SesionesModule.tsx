import type React from "react";

interface Recording {
  id: number;
  title: string;
  url: string;
  duration: string;
  date: string;
  description: string;
}

interface Course {
  id: number;
  name: string;
  recordings: Recording[];
}

interface SesionesModuleProps {
  course: Course;
}

// Icons
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const VideoIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6.75A1.5 1.5 0 0 0 14.25 5.25h-9A1.5 1.5 0 0 0 3.75 6.75v10.5A1.5 1.5 0 0 0 5.25 18.75h9a1.5 1.5 0 0 0 1.5-1.5V13.5l4.5 3v-9l-4.5 3Z" />
  </svg>
);

const PlayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.5l11.5 6.5-11.5 6.5v-13z" />
  </svg>
);

const ClockIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const CalendarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v9A3.75 3.75 0 0 1 17.25 21h-10.5A3.75 3.75 0 0 1 3 17.25v-9A1.5 1.5 0 0 1 4.5 6.75Z" />
  </svg>
);

export function SesionesModule({ course }: SesionesModuleProps) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sesiones Grabadas</h2>
        <div className="text-sm text-gray-500">
          {course.recordings.length} sesiones disponibles
        </div>
      </div>

      <div className="grid gap-4">
        {course.recordings.map((recording) => (
          <div 
            key={recording.id} 
            className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              {/* Video Thumbnail/Icon */}
                             <div className="flex-shrink-0">
                 <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                   <VideoIcon className="h-8 w-8 text-white" />
                 </div>
               </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                  {recording.title}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  {recording.description}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{formatDate(recording.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" />
                    <span>{recording.duration}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                {recording.url ? (
                  <a 
                    href={recording.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/25 font-medium group-hover:scale-105"
                  >
                    <PlayIcon className="h-5 w-5" />
                    Ver grabación
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-medium">
                    <ClockIcon className="h-5 w-5" />
                    Próximamente
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {course.recordings.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <VideoIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay grabaciones disponibles</h3>
          <p className="text-gray-500">Las sesiones grabadas aparecerán aquí después de cada clase.</p>
        </div>
      )}
    </div>
  );
}
