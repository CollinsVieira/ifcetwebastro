import { useMemo, useState } from "react";
import libros from "../data/libros.json";
import { Aside } from "./aside";
import bibliotecaImagen from "../assets/IFCET-biblioteca-certificados-cursos-instituto-formacion-contable.webp";

type Libro = {
  nombre?: string;
  categoria?: string;
  imagen: string;
  url: string; // url de Google Drive
};

export function BibliotecaComponent() {
  const data = (libros as Libro[]) ?? [];

  const categorias = useMemo(() => {
    const set = new Set<string>(["Todas"]);
    data.forEach((l) => l.categoria && set.add(l.categoria));
    return Array.from(set);
  }, [data]);

  const [busqueda, setBusqueda] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("Todas");

  const filtrados = useMemo(() => {
    const term = busqueda.trim().toLowerCase();
    return data.filter((l) => {
      const coincideCategoria = categoria === "Todas" || l.categoria === categoria;
      const coincideTexto = term
        ? (l.nombre ?? "").toLowerCase().includes(term) || (l.categoria ?? "").toLowerCase().includes(term)
        : true;
      return coincideCategoria && coincideTexto;
    });
  }, [data, busqueda, categoria]);

  return (
    <div className="w-full">
      {/* Hero superior (por encima de los Aside) */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 items-center gap-6 md:gap-10">
            {/* Texto */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-tight">Biblioteca</h1>
              <p className="text-white/80">
                Descarga materiales y libros de apoyo para potenciar tus habilidades.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="/cursos"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#ffb403] text-black hover:scale-[1.02] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb403]"
                >
                  Ver cursos
                </a>
                <a
                  href="#listado"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-white border border-white/30 hover:bg-white/15 hover:scale-[1.02] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Ir al listado
                </a>
              </div>
            </div>
            {/* Imagen/Placeholder */}
            <div className="relative h-[32vh] md:h-[46vh] flex items-center justify-center">
              <div className="h-full w-full flex items-center justify-center">
                {/* Insertar imágen aquí: Portadas de libros en grilla, estilo limpio, formato .webp */}
                <img src={bibliotecaImagen.src} alt="Portadas de libros" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout con Aside a los lados y contenido al centro */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_4fr_1fr] grid-rows-1 min-h-screen">
        <div className="hidden lg:block">
        <Aside videoUrl="/videos/IFCET-Curso-Auditoria-Tributaria-Preventiva.webm" linkUrl="https://wa.link/xdm8j0" />
        </div>
        <main className="p-4 sm:p-6 lg:p-8 text-black flex justify-start items-center flex-col w-full">
          <section id="listado" className="w-full">
            <div className="container mx-auto px-6 md:px-8 py-10 md:py-16">
              {/* Controles */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre o categoría..."
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/10 text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
                  />
                </div>
                <div>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/10 text-black focus:outline-none focus:ring-2 focus:ring-[#ffb403]"
                  >
                    {categorias.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resultados */}
              {filtrados.length === 0 ? (
                <div className="text-black/80">No se encontraron resultados.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtrados.map((libro, index) => (
                    <article
                      key={`${libro.url}-${index}`}
                      className="bg-white/5 border border-black/10 rounded-2xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform hover:shadow-lg hover:backdrop-blur-sm"
                    >
                      <div className="aspect-[4/3] w-full bg-white/5 flex items-center justify-center">
                        {libro.imagen ? (
                          <img
                            src={libro.imagen}
                            alt={libro.nombre ? `Portada: ${libro.nombre}` : "Portada del libro de la biblioteca"}
                            className="w-full h-full object-cover text-black/80"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center border border-dashed border-white/20">
                            {/* Insertar imagen aquí: Portada simple con título del libro, colores neutros */}
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col items-center gap-3">
                        <div className="min-w-0">
                          {libro.nombre && (
                            <h3 className="font-semibold text-black/80 text-pretty" title={libro.nombre}>
                              {libro.nombre}
                            </h3>
                          )}
                          <p className="text-xs text-black/70 truncate">
                            {libro.categoria || "Recurso descargable"}
                          </p>
                        </div>
                        <a
                          href={libro.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#ffb403] text-black hover:scale-[1.02] transition-transform"
                        >
                          Descargar
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <div className="hidden lg:block">
        <Aside videoUrl="/videos/IFCET-Curso-Codigo-Tributario-Peruano.webm" linkUrl="https://wa.link/20lh8p"/>
        </div>
      </section>
    </div>
  );
}
