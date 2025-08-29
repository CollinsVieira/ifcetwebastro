// Función para renderizar contenido del blog con soporte para tablas
export function renderBlogContent(content: string): string {
  // Limpiar el contenido de caracteres de escape innecesarios
  let cleanContent = content;
  
  // Reemplazar \n\n con saltos de línea reales
  cleanContent = cleanContent.replace(/\\n\\n/g, '\n\n');
  cleanContent = cleanContent.replace(/\\n/g, '\n');
  
  // Dividir por párrafos (doble salto de línea)
  const paragraphs = cleanContent.split('\n\n');
  
  return paragraphs.map(paragraph => {
    // Limpiar espacios en blanco al inicio y final
    paragraph = paragraph.trim();
    
    // Detectar si es una tabla (contiene | y ---)
    if (paragraph.includes('|') && paragraph.includes('---|')) {
      const lines = paragraph.split('\n');
      const tableLines = lines.filter(line => line.trim().startsWith('|'));
      
      if (tableLines.length >= 3) { // Header + separator + at least one row
        const headers = tableLines[0].split('|').filter(cell => cell.trim()).map(cell => cell.trim());
        const rows = tableLines.slice(2).map(row => 
          row.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
        );
        
        let tableHtml = `
          <div class="overflow-x-auto my-8">
            <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead class="bg-gray-50">
                <tr>`;
        
        headers.forEach(header => {
          tableHtml += `
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-200">
                    ${header}
                  </th>`;
        });
        
        tableHtml += `
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">`;
        
        rows.forEach((row, rowIndex) => {
          const bgClass = rowIndex % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100';
          tableHtml += `
                <tr class="${bgClass}">`;
          
          row.forEach(cell => {
            tableHtml += `
                  <td class="px-6 py-4 text-sm text-gray-700 border-b border-gray-200">
                    ${cell}
                  </td>`;
          });
          
          tableHtml += `
                </tr>`;
        });
        
        tableHtml += `
              </tbody>
            </table>
          </div>`;
        
        return tableHtml;
      }
    }
    
    // Detectar listas con letras (a), b), c), etc.)
    if (paragraph.match(/^[a-z]\)/)) {
      const listItems = paragraph.split('\n')
        .filter(item => item.trim().match(/^[a-z]\)/))
        .map(item => {
          const cleanItem = item.replace(/^[a-z]\)\s*/, '');
          return `<li class="text-gray-700 mb-2">${cleanItem}</li>`;
        })
        .join('');
      return `<ul class="list-none space-y-2 my-4 pl-4">${listItems}</ul>`;
    }
    
    // Detectar listas con viñetas (✔)
    if (paragraph.includes('✔')) {
      const listItems = paragraph.split('\n')
        .filter(item => item.trim().includes('✔'))
        .map(item => {
          const cleanItem = item.replace('✔', '').trim();
          return `<li class="text-gray-700 mb-2 flex items-start">
            <span class="text-purple-600 mr-2">✔</span>
            <span>${cleanItem}</span>
          </li>`;
        })
        .join('');
      return `<ul class="list-none space-y-2 my-4">${listItems}</ul>`;
    }
    
    // Detectar listas con guiones (-)
    if (paragraph.startsWith('- ')) {
      const listItems = paragraph.split('\n')
        .filter(item => item.startsWith('- '))
        .map(item => `<li class="text-gray-700 mb-2">${item.replace('- ', '')}</li>`)
        .join('');
      return `<ul class="list-disc list-inside space-y-2 my-4">${listItems}</ul>`;
    }
    
    // Renderizado de encabezados
    if (paragraph.startsWith('## ')) {
      return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${paragraph.replace('## ', '')}</h2>`;
    } else if (paragraph.startsWith('### ')) {
      return `<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">${paragraph.replace('### ', '')}</h3>`;
    } else if (paragraph.startsWith('#### ')) {
      return `<h4 class="text-lg font-semibold text-gray-800 mt-4 mb-2">${paragraph.replace('#### ', '')}</h4>`;
    }
    
    // Texto en negrita
    if (paragraph.startsWith('**') && paragraph.includes('**')) {
      return `<p class="font-semibold text-gray-900 my-4">${paragraph.replace(/\*\*/g, '')}</p>`;
    }
    
    // Párrafos normales
    if (paragraph.trim()) {
      // Verificar si el párrafo contiene múltiples líneas
      const lines = paragraph.split('\n');
      if (lines.length > 1) {
        // Si tiene múltiples líneas, renderizar cada una como un párrafo separado
        const paragraphsHtml = lines
          .filter(line => line.trim())
          .map(line => `<p class="text-gray-700 leading-relaxed my-3">${line.trim()}</p>`)
          .join('');
        return paragraphsHtml;
      } else {
        return `<p class="text-gray-700 leading-relaxed my-4">${paragraph.trim()}</p>`;
      }
    }
    
    return '';
  }).filter(Boolean).join('');
}

