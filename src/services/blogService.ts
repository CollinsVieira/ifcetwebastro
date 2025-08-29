import type { Post, BlogFilters, BlogApiResponse, Author } from '../types/index';

// Configuración de la API - cambiar según el entorno
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:8000/api/v1'  // Desarrollo local (HTTP)
  : 'https://ifcetwebbackend.onrender.com/api/v1'; // Producción (HTTPS)


export class BlogService {
  /**
   * Obtiene todos los posts del blog
   */
  static async getAllPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/posts/`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const posts: Post[] = await response.json();
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('No se pudieron cargar los posts del blog');
    }
  }

  /**
   * Obtiene un post específico por su slug
   */
  static async getPostBySlug(slug: string): Promise<Post | null> {
    try {
      const posts = await this.getAllPosts();
      const post = posts.find(p => p.slug === slug);
      return post || null;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw new Error('No se pudo cargar el post');
    }
  }

  /**
   * Obtiene un post específico por su ID
   */
  static async getPostById(id: number): Promise<Post | null> {
    try {
      const posts = await this.getAllPosts();
      const post = posts.find(p => p.id === id);
      return post || null;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw new Error('No se pudo cargar el post');
    }
  }

  /**
   * Obtiene posts filtrados según los criterios especificados
   */
  static async getFilteredPosts(filters: BlogFilters): Promise<Post[]> {
    try {
      let posts = await this.getAllPosts();
      
      // Aplicar filtros
      if (filters.category) {
        posts = posts.filter(post => 
          post.category && post.category.toLowerCase().includes(filters.category!.toLowerCase())
        );
      }
      
      if (filters.tag) {
        posts = posts.filter(post => 
          post.tags && post.tags.some(tag => 
            tag.toLowerCase().includes(filters.tag!.toLowerCase())
          )
        );
      }
      
      if (filters.author) {
        posts = posts.filter(post => 
          post.author && post.author.name.toLowerCase().includes(filters.author!.toLowerCase())
        );
      }
      
      if (filters.featured !== undefined) {
        posts = posts.filter(post => post.featured === filters.featured);
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          (post.author && post.author.name.toLowerCase().includes(searchTerm)) ||
          (post.category && post.category.toLowerCase().includes(searchTerm)) ||
          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      }
      
      // Ordenar por fecha de publicación (más recientes primero)
      posts.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      
      // Aplicar paginación si se especifica
      if (filters.page && filters.page_size) {
        const startIndex = (filters.page - 1) * filters.page_size;
        const endIndex = startIndex + filters.page_size;
        posts = posts.slice(startIndex, endIndex);
      }
      
      return posts;
    } catch (error) {
      console.error('Error filtering posts:', error);
      throw new Error('No se pudieron filtrar los posts');
    }
  }

  /**
   * Obtiene posts destacados
   */
  static async getFeaturedPosts(): Promise<Post[]> {
    try {
      const posts = await this.getAllPosts();
      return posts.filter(post => post.featured);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      throw new Error('No se pudieron cargar los posts destacados');
    }
  }

  /**
   * Obtiene posts por categoría
   */
  static async getPostsByCategory(categoryName: string): Promise<Post[]> {
    try {
      const posts = await this.getAllPosts();
      return posts.filter(post => 
        post.category && post.category.toLowerCase().includes(categoryName.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw new Error('No se pudieron cargar los posts de la categoría');
    }
  }

  /**
   * Obtiene posts por tag
   */
  static async getPostsByTag(tagName: string): Promise<Post[]> {
    try {
      const posts = await this.getAllPosts();
      return posts.filter(post => 
        post.tags && post.tags.some(tag => 
          tag.toLowerCase().includes(tagName.toLowerCase())
        )
      );
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      throw new Error('No se pudieron cargar los posts del tag');
    }
  }

  /**
   * Obtiene posts por autor
   */
  static async getPostsByAuthor(authorName: string): Promise<Post[]> {
    try {
      const posts = await this.getAllPosts();
      return posts.filter(post => 
        post.author && post.author.name.toLowerCase().includes(authorName.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching posts by author:', error);
      throw new Error('No se pudieron cargar los posts del autor');
    }
  }

  /**
   * Obtiene posts recientes (últimos N posts)
   */
  static async getRecentPosts(limit: number = 5): Promise<Post[]> {
    try {
      const posts = await this.getAllPosts();
      return posts
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      throw new Error('No se pudieron cargar los posts recientes');
    }
  }

  /**
   * Busca posts por término de búsqueda
   */
  static async searchPosts(searchTerm: string): Promise<Post[]> {
    try {
      const posts = await this.getAllPosts();
      const term = searchTerm.toLowerCase();
      
      return posts.filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        (post.author && post.author.name.toLowerCase().includes(term)) ||
        (post.category && post.category.toLowerCase().includes(term)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    } catch (error) {
      console.error('Error searching posts:', error);
      throw new Error('No se pudo realizar la búsqueda');
    }
  }

  /**
   * Obtiene todas las categorías disponibles
   */
  static async getCategories(): Promise<string[]> {
    try {
      const posts = await this.getAllPosts();
      const categories = posts
        .map(post => post.category)
        .filter((category): category is string => category !== null && category !== undefined);
      
      // Eliminar duplicados
      return [...new Set(categories)];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('No se pudieron cargar las categorías');
    }
  }

  /**
   * Obtiene todos los tags disponibles
   */
  static async getTags(): Promise<string[]> {
    try {
      const posts = await this.getAllPosts();
      const tags = posts
        .flatMap(post => post.tags || [])
        .filter((tag): tag is string => tag !== null && tag !== undefined);
      
      // Eliminar duplicados
      return [...new Set(tags)];
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw new Error('No se pudieron cargar los tags');
    }
  }

  /**
   * Obtiene todos los autores disponibles
   */
  static async getAuthors(): Promise<Author[]> {
    try {
      const posts = await this.getAllPosts();
      const authors = posts
        .map(post => post.author)
        .filter((author): author is Author => author !== null && author !== undefined);
      
      // Eliminar duplicados por nombre
      const uniqueAuthors = authors.reduce((acc, author) => {
        const existing = acc.find(a => a.name === author.name);
        if (!existing) {
          acc.push(author);
        }
        return acc;
      }, [] as Author[]);
      
      return uniqueAuthors;
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw new Error('No se pudieron cargar los autores');
    }
  }

  /**
   * Obtiene estadísticas del blog
   */
  static async getBlogStats(): Promise<{
    total_posts: number;
    total_categories: number;
    total_tags: number;
    total_authors: number;
    featured_posts_count: number;
    recent_posts: Post[];
  }> {
    try {
      const posts = await this.getAllPosts();
      const categories = await this.getCategories();
      const tags = await this.getTags();
      const authors = await this.getAuthors();
      const featuredPosts = posts.filter(post => post.featured);
      const recentPosts = await this.getRecentPosts(5);
      
      return {
        total_posts: posts.length,
        total_categories: categories.length,
        total_tags: tags.length,
        total_authors: authors.length,
        featured_posts_count: featuredPosts.length,
        recent_posts: recentPosts
      };
    } catch (error) {
      console.error('Error fetching blog stats:', error);
      throw new Error('No se pudieron cargar las estadísticas del blog');
    }
  }
}
