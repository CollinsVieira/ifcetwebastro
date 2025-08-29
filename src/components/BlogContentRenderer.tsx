import { useEffect, useState } from 'react';
import { renderBlogContent } from '../utils/blogContentRenderer';

interface BlogContentRendererProps {
  content: string;
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const [renderedContent, setRenderedContent] = useState<string>('');

  useEffect(() => {
    if (content) {
      console.log('Contenido original recibido:', content);
      console.log('Longitud del contenido:', content.length);
      
      // Limpiar el contenido antes de procesarlo
      let cleanContent = content;
      
      // Reemplazar caracteres de escape comunes
      cleanContent = cleanContent.replace(/\\n\\n/g, '\n\n');
      cleanContent = cleanContent.replace(/\\n/g, '\n');
      cleanContent = cleanContent.replace(/\\"/g, '"');
      cleanContent = cleanContent.replace(/\\'/g, "'");
      
      console.log('Contenido limpio:', cleanContent);
      
      const html = renderBlogContent(cleanContent);
      console.log('HTML renderizado:', html);
      
      setRenderedContent(html);
    }
  }, [content]);

  if (!content) {
    return (
      <div className="prose prose-lg max-w-none">
        <div className="text-center py-8">
          <p className="text-gray-500">No hay contenido para mostrar</p>
        </div>
      </div>
    );
  }

  if (!renderedContent) {
    return (
      <div className="prose prose-lg max-w-none">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
        </div>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Debug:</strong> Procesando contenido...
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            Longitud del contenido: {content.length}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none blog-content">
      <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
      
      {/* Debug info - solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded text-xs">
          <p><strong>Debug Info:</strong></p>
          <p>Contenido original: {content.substring(0, 100)}...</p>
          <p>HTML renderizado: {renderedContent.substring(0, 100)}...</p>
        </div>
      )}
    </div>
  );
}
