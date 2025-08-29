import { useState, useEffect } from 'react';
import { BlogService } from '../services/blogService';
import { Aside } from '../components/aside';
import type { Post } from '../types/index';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export function BlogComponent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(3);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar posts desde la API
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Obtener todos los posts
        const allPosts = await BlogService.getAllPosts();
        setPosts(allPosts);
        
        // Generar categorías dinámicamente desde los posts
        const uniqueCategories = [...new Set(allPosts.map(post => post.category).filter(Boolean))];
        const dynamicCategories: Category[] = uniqueCategories.map((cat, index) => ({
          id: cat!,
          name: cat!,
          description: `Artículos sobre ${cat}`,
          color: getCategoryColor(index)
        }));
        
        setCategories(dynamicCategories);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('No se pudieron cargar los posts del blog');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Función para asignar colores a las categorías
  const getCategoryColor = (index: number): string => {
    const colors = [
      'bg-blue-600',
      'bg-green-600', 
      'bg-purple-600',
      'bg-red-600',
      'bg-yellow-600',
      'bg-indigo-600',
      'bg-pink-600',
      'bg-teal-600'
    ];
    return colors[index % colors.length];
  };

  // Ordenar posts por fecha de publicación (más reciente primero)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  const featuredPosts = sortedPosts.filter(post => post.featured);
  
  const filteredPosts = sortedPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
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

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando blog...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si ocurrió
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar el blog</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

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
                <div className={`w-12 h-12 rounded-xl mb-4 ${getCategoryInfo(post.category || '')?.color || 'bg-gray-600'} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">
                    {getCategoryInfo(post.category || '')?.name?.charAt(0) || 'B'}
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
                        {post.author?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                      </span>
                    </div>
                    <span className="text-blue-100 text-sm">{post.author?.name || 'Autor'}</span>
                  </div>
                  <span className="text-blue-100 text-sm">{post.read_time}</span>
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
                          <span className={`px-3 py-1 rounded-full sm:text-[11px] text-white text-[clamp(0.6rem,1.5vw,0.8rem)] font-medium ${getCategoryInfo(post.category || '')?.color || 'bg-gray-600'}`}>
                            {getCategoryInfo(post.category || '')?.name || 'Sin categoría'}
                          </span>
                          <span className="text-sm text-gray-500">{post.read_time}</span>
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
                                {post.author?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{post.author?.name || 'Autor'}</p>
                              <p className="text-xs text-gray-500">{post.author?.role || 'Escritor'}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{formatDate(post.published_at)}</span>
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
