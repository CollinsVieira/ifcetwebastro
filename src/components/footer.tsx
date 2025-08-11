"use client";

import CPSM from "../assets/CPSM.webp";
import CPL from "../assets/CPL.webp";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function FooterComponent() {
  return (
    <footer className="bg-[#060a17] text-white">
      {/* Sección superior - Tres columnas */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Nosotros */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nosotros</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/mensaje-gerencial"
                  className="hover:text-[#fab500] transition-colors"
                >
                  Mensaje Gerencial
                </a>
              </li>
              <li>
                <a
                  href="/resena-historica"
                  className="hover:text-[#fab500] transition-colors"
                >
                  Reseña Histórica
                </a>
              </li>
              <li>
                <a
                  href="/mision-vision"
                  className="hover:text-[#fab500] transition-colors"
                >
                  Misión y Visión
                </a>
              </li>
              <li>
                <a
                  href="/docencia"
                  className="hover:text-[#fab500] transition-colors"
                >
                  Docencia
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 2: Redes */}
          <div>
            <h3 className="text-xl font-bold mb-4">Redes</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/ifcet.contables"
                  className="hover:text-[#fab500] transition-colors flex items-center gap-2"
                >
                  <Facebook size={16} />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ifcet.contables/"
                  className="hover:text-[#fab500] transition-colors flex items-center gap-2"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@ifcet.contables"
                  className="hover:text-[#fab500] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ifcetcontables1161"
                  className="hover:text-[#fab500] transition-colors flex items-center gap-2"
                >
                  <Youtube size={16} />
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contáctanos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:informes@ifcet.com.pe"
                  className="hover:text-[#fab500] transition-colors"
                  target="_blank"
                >
                  informes@ifcet.com.pe
                </a>
              </li>
              <li>
                <a
                  href="tel:+51983395385"
                  className="hover:text-[#fab500] transition-colors"
                  target="_blank"
                >
                  +51 950 268 31
                </a>
              </li>
              <li>
                <span className="hover:text-[#fab500] transition-colors">
                  Calle Las Rosas #110 - Chiclayo
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* IFCET Branding y Redes Sociales */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-2">IFCET</h2>
              <p className="text-sm mb-4">Educación de Calidad a Distancia</p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/ifcet.contables" target="_blank" className="hover:text-[#fab500] transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/ifcet.contables/" target="_blank" className="hover:text-[#fab500] transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.tiktok.com/@ifcet.contables" target="_blank" className="hover:text-[#fab500] transition-colors">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Botones de Categorías */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-2">
                <a
                  href="/cursos/contabilidad"
                  className="bg-[#4a5568] hover:bg-[#ffb204] text-white px-4 py-2 rounded text-center transition-colors"
                >
                  Contabilidad
                </a>
                <a
                  href="/cursos/tributacion"
                  className="bg-[#4a5568] hover:bg-[#ffb204] text-white px-4 py-2 rounded text-center transition-colors"
                >
                  Tributación
                </a>
                <a
                  href="/cursos/laboral"
                  className="bg-[#4a5568] hover:bg-[#ffb204] text-white px-4 py-2 rounded text-center transition-colors"
                >
                  Laboral
                </a>
              </div>
            </div>

            {/* Convenios */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <p className="mb-4">
                  Conoce nuestros{" "}
                  <a
                    href="/convenios"
                    className="text-[#fab500] hover:text-[#e6a800] font-semibold"
                  >
                    convenios
                  </a>
                </p>
                <div className="flex justify-center gap-4">
                  {/* Logo 1 - Universidad/Institución */}
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <img
                      src={CPSM.src}
                      alt="convenio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Logo 2 - IFCET */}
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <img
                      src={CPL.src}
                      alt="convenio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
