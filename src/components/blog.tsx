import { useState } from 'react';
import blogData from '../data/blog.json';
import { Aside } from '../components/aside';

interface Post {
  id: number;
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
  const [posts] = useState<Post[]>(blogData.posts);
  const [categories] = useState<Category[]>(blogData.categories);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
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

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    // Obtener artículos relacionados (misma categoría, excluyendo el actual)
    let relatedPosts = posts
      .filter(post => post.category === selectedPost.category && post.id !== selectedPost.id)
      .slice(0, 3);

    // Si no hay suficientes artículos relacionados, agregar artículos de otras categorías
    if (relatedPosts.length < 3) {
      const otherPosts = posts
        .filter(post => post.category !== selectedPost.category && post.id !== selectedPost.id)
        .slice(0, 3 - relatedPosts.length);
      relatedPosts = [...relatedPosts, ...otherPosts];
    }

    return (
      <div className="w-full pt-[110px] md:pt-[110px]">
        {/* Header del artículo */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <button
              onClick={closePost}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al blog
            </button>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getCategoryInfo(selectedPost.category)?.color}`}>
                {getCategoryInfo(selectedPost.category)?.name}
              </span>
              <span>{formatDate(selectedPost.publishedAt)}</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{selectedPost.excerpt}</p>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {selectedPost.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedPost.author}</p>
                <p className="text-sm text-gray-600">{selectedPost.authorRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout con Asides para el artículo completo */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr_1fr] min-h-screen max-w-full overflow-x-hidden gap-4">
          {/* Aside Izquierdo */}
          <aside className="col-span-1 hidden lg:block">
            <Aside />
          </aside>

          {/* Contenido Principal del Artículo */}
          <main className="col-span-1 lg:col-span-1 w-full overflow-hidden">
            {/* Contenido del artículo */}
            <div className="bg-white rounded-lg shadow-sm p-8 mx-4 my-8">
              {selectedPost.image && (
                <div className="mb-6">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full max-h-[520px] object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="prose prose-lg max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, index) => {
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
                  } else if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 my-4">
                        {paragraph.split('\n').filter(item => item.startsWith('- ')).map((item, i) => (
                          <li key={i} className="text-gray-700">{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.startsWith('**') && paragraph.includes('**')) {
                    return (
                      <p key={index} className="font-semibold text-gray-900 my-4">
                        {paragraph.replace(/\*\*/g, '')}
                      </p>
                    );
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed my-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>

                             {/* Tags */}
               <div className="mt-8 pt-6 border-t border-gray-200">
                 <div className="flex flex-wrap gap-2">
                   {selectedPost.tags.map((tag, index) => (
                     <span
                       key={index}
                       className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                     >
                       #{tag}
                     </span>
                   ))}
                 </div>
               </div>

               {/* Compartir y Navegación Social */}
               <div className="mt-8 pt-6 border-t border-gray-200">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-4">
                     <span className="text-sm text-gray-600">Compartir:</span>
                     <button 
                       onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                       className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                     >
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                       </svg>
                     </button>
                     <button 
                       onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                       className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                     >
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                       </svg>
                     </button>
                     <button 
                       onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                       className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
                     >
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                       </svg>
                     </button>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="text-sm text-gray-600">Autor:</span>
                     <div className="flex items-center space-x-2">
                       <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                         <span className="text-white font-bold text-xs">
                           {selectedPost.author.split(' ').map(n => n[0]).join('')}
                         </span>
                       </div>
                       <span className="text-sm font-medium text-gray-900">{selectedPost.author}</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

            {/* Artículos Relacionados */}
            {relatedPosts.length > 0 && (
              <section className="mx-4 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Relacionados</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((post) => (
                      <article
                        key={post.id}
                        onClick={() => handlePostClick(post)}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer group"
                      >
                        {post.image && (
                          <div className="w-full h-36 mb-3 overflow-hidden rounded-md">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getCategoryInfo(post.category)?.color}`}>
                            {getCategoryInfo(post.category)?.name}
                          </span>
                          <span className="text-xs text-gray-500">{post.readTime}</span>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="text-xs text-gray-600">{post.author}</span>
                          </div>
                          <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Sección de Artículos Populares */}
            <section className="mx-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos Populares</h2>
                <div className="space-y-4">
                  {featuredPosts.slice(0, 5).map((post, index) => (
                    <article
                      key={post.id}
                      onClick={() => handlePostClick(post)}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#976287] rounded-lg flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      {post.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getCategoryInfo(post.category)?.color}`}>
                            {getCategoryInfo(post.category)?.name}
                          </span>
                          <span className="text-xs text-gray-500">{post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* Aside Derecho */}
          <aside className="col-span-1 hidden lg:block">
            <Aside />
          </aside>
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
            {featuredPosts.slice(0, 6).map((post, index) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className={`group cursor-pointer bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
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
              </div>
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
                      onClick={() => handlePostClick(post)}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    >
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
