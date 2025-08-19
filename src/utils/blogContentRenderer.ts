// Función para renderizar contenido del blog con soporte para tablas
export function renderBlogContent(content: string): string {
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map(paragraph => {
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
    
    // Renderizado normal para otros tipos de contenido
    if (paragraph.startsWith('## ')) {
      return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${paragraph.replace('## ', '')}</h2>`;
    } else if (paragraph.startsWith('### ')) {
      return `<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">${paragraph.replace('### ', '')}</h3>`;
    } else if (paragraph.startsWith('- ')) {
      const listItems = paragraph.split('\n')
        .filter(item => item.startsWith('- '))
        .map(item => `<li class="text-gray-700">${item.replace('- ', '')}</li>`)
        .join('');
      return `<ul class="list-disc list-inside space-y-2 my-4">${listItems}</ul>`;
    } else if (paragraph.startsWith('**') && paragraph.includes('**')) {
      return `<p class="font-semibold text-gray-900 my-4">${paragraph.replace(/\*\*/g, '')}</p>`;
    } else if (paragraph.trim()) {
      return `<p class="text-gray-700 leading-relaxed my-4">${paragraph}</p>`;
    }
    
    return '';
  }).filter(Boolean).join('');
}
