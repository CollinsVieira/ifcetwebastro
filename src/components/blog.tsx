import { useState } from 'react';
import blogData from '../data/blog.json';
import { Aside } from '../components/aside';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  image: string;
  featured: boolean;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export function BlogComponent() {
  // Ordenar posts por fecha de publicación (más reciente primero)
  const sortedPosts = [...blogData.posts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const [posts] = useState<Post[]>(sortedPosts);
  const [categories] = useState<Category[]>(blogData.categories);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(3);

  const featuredPosts = posts.filter(post => post.featured);
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Lógica de paginación
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Resetear página cuando cambie la búsqueda o categoría
  const resetPage = () => {
    setCurrentPage(1);
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para renderizar contenido con tablas
  const renderContentWithTables = (content: string) => {
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Detectar si es una tabla (comienza con |)
      if (paragraph.includes('|') && paragraph.includes('---|')) {
        const lines = paragraph.split('\n');
        const tableLines = lines.filter(line => line.trim().startsWith('|'));
        
        if (tableLines.length >= 3) { // Header + separator + at least one row
          const headers = tableLines[0].split('|').filter(cell => cell.trim()).map(cell => cell.trim());
          const rows = tableLines.slice(2).map(row => 
            row.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
          );
          
          return (
            <div key={index} className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header, headerIndex) => (
                      <th 
                        key={headerIndex}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, cellIndex) => (
                        <td 
                          key={cellIndex}
                          className="px-4 py-3 text-sm text-gray-900 border-b"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }
      
      // Renderizado normal para otros tipos de contenido
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      } else if (paragraph.trim()) {
        return (
          <p key={index} className="text-gray-700 leading-relaxed my-4">
            {paragraph}
          </p>
        );
      }
      return null;
    }).filter(Boolean);
  };





  return (
    <div className="w-full">
      {/* Hero Section con Bento Grid */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Blog de Contabilidad</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Descubre insights, consejos y las últimas novedades en contabilidad, impuestos y gestión empresarial
            </p>
          </div>

          {/* Bento Grid con Posts Destacados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredPosts.slice(0, 5).map((post, index) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group block bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                  index === 0 ? 'md:col-span-2 md:row-span-1' : ''
                }`}
              >
                {post.image && (
                  <div className={`relative w-full overflow-hidden rounded-xl mb-4 ${index === 0 ? 'h-56 md:h-72' : 'h-40'}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl mb-4 ${getCategoryInfo(post.category)?.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">
                    {getCategoryInfo(post.category)?.name.charAt(0)}
                  </span>
                </div>
                
                <h3 className={`font-bold text-white mb-3 ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                  {post.title}
                </h3>
                
                <p className={`text-blue-100 mb-4 ${index === 0 ? 'text-lg' : 'text-sm'}`}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-blue-100 text-sm">{post.author}</span>
                  </div>
                  <span className="text-blue-100 text-sm">{post.readTime}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Layout con Asides */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr_1fr] min-h-screen max-w-full overflow-x-hidden gap-4">
        {/* Aside Izquierdo */}
        <aside className="col-span-1 hidden lg:block">
          <Aside />
        </aside>

        {/* Contenido Principal */}
        <main className="col-span-1 lg:col-span-1 w-full overflow-hidden">
          {/* Filtros y Búsqueda */}
          <section className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 py-8">
              {/* Búsqueda */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      resetPage();
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Categorías */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    resetPage();
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todas las categorías
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      resetPage();
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? `${category.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Lista de Artículos */}
          <section className="max-w-7xl mx-auto px-4 py-12">
            {/* Información de resultados */}
            {filteredPosts.length > 0 && (
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">
                  Mostrando {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} de {filteredPosts.length} artículos
                </p>
                {totalPages > 1 && (
                  <p className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </p>
                )}
              </div>
            )}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron artículos</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Intenta con otros términos de búsqueda o categorías.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <a href={`/blog/${post.slug}`} className="block">
                      {post.image && (
                        <div className="w-full h-48 overflow-hidden rounded-t-xl">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className={`px-3 py-1 rounded-full sm:text-[11px] text-white text-[clamp(0.6rem,1.5vw,0.8rem)] font-medium ${getCategoryInfo(post.category)?.color}`}>
                            {getCategoryInfo(post.category)?.name}
                          </span>
                          <span className="text-sm text-gray-500">{post.readTime}</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                          </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full items-center justify-center hidden 2xl:flex 2xl:bg-amber-200">
                              <span className="text-black font-bold text-sm">
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{post.author}</p>
                              <p className="text-xs text-gray-500">{post.authorRole}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      </a>
                    </article>
                  ))}
                </div>
                
                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Anterior
                    </button>
                    
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </main>

        {/* Aside Derecho */}
        <aside className="col-span-1 hidden lg:block">
          <Aside />
        </aside>
      </div>
    </div>
  );
};
