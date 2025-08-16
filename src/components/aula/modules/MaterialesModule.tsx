import type React from "react";

interface Material {
  id: number;
  title: string;
  url: string;
  type: string;
  size: string;
  uploadDate: string;
}

interface Course {
  id: number;
  name: string;
  materials: Material[];
}

interface MaterialesModuleProps {
  course: Course;
}

// Icons
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const FileIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h4.5L18 8.25v9A3 3 0 0 1 15 20.25H9A3 3 0 0 1 6 17.25v-9A3 3 0 0 1 9 5.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3.75V7.5H18" />
  </svg>
);

const DownloadIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const CalendarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v9A3.75 3.75 0 0 1 17.25 21h-10.5A3.75 3.75 0 0 1 3 17.25v-9A1.5 1.5 0 0 1 4.5 6.75Z" />
  </svg>
);

const FolderIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25H11.69Z" />
  </svg>
);

const PresentationIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0-1-3m1 3-1-3m-16.5-3h9v-13.5" />
  </svg>
);

const TableIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 0A2.25 2.25 0 0 1 5.625 3.375h4.125c1.24 0 2.25 1.01 2.25 2.25v.375m0 0V8.25m0 0h7.875c1.24 0 2.25 1.01 2.25 2.25v.375M21 12v5.625m0 0a2.25 2.25 0 0 1-2.25 2.25h-4.125C13.01 19.875 12 18.865 12 17.625V12M21 12h-8.25m8.25 0a2.25 2.25 0 0 1 2.25 2.25M12 12l-8.25.375M12 12l.375-8.25M12 12v5.625c0 1.24-1.01 2.25-2.25 2.25H5.625c-1.24 0-2.25-1.01-2.25-2.25V12" />
  </svg>
);

export function MaterialesModule({ course }: MaterialesModuleProps) {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return FileIcon;
      case 'excel':
      case 'xlsx':
        return TableIcon;
      case 'presentation':
      case 'ppt':
      case 'pptx':
        return PresentationIcon;
      case 'drive':
      case 'folder':
        return FolderIcon;
      default:
        return FileIcon;
    }
  };

  const getFileColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'from-red-500 to-red-600';
      case 'excel':
      case 'xlsx':
        return 'from-green-500 to-green-600';
      case 'presentation':
      case 'ppt':
      case 'pptx':
        return 'from-orange-500 to-orange-600';
      case 'drive':
      case 'folder':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Material de Clase</h2>
        <div className="text-sm text-gray-500">
          {course.materials.length} archivos disponibles
        </div>
      </div>

      <div className="grid gap-4">
        {course.materials.map((material) => {
          const IconComponent = getFileIcon(material.type);
          const colorClass = getFileColor(material.type);

          return (
            <div 
              key={material.id} 
              className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                {/* File Icon */}
                <div className="flex-shrink-0">
                  <div className={`h-14 w-14 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200">
                    {material.title || 'Archivo sin título'}
                  </h3>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium uppercase">
                        {material.type}
                      </span>
                    </div>
                    {material.size && material.size !== "0 MB" && (
                      <span>{material.size}</span>
                    )}
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(material.uploadDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="flex-shrink-0">
                  {material.url && material.title ? (
                    <a 
                      href={material.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 font-medium group-hover:scale-105"
                      download
                    >
                      <DownloadIcon className="h-5 w-5" />
                      {material.type === 'drive' ? 'Abrir' : 'Descargar'}
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-medium">
                      <CalendarIcon className="h-5 w-5" />
                      Próximamente
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {course.materials.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay materiales disponibles</h3>
          <p className="text-gray-500">Los materiales de clase aparecerán aquí cuando estén disponibles.</p>
        </div>
      )}
    </div>
  );
}
