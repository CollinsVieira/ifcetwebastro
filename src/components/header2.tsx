import { useState, useEffect } from "react";
import logoBlanco from "../assets/IFCET-instuto-de-formacion-contable-empresarial-y-tributaria.png";
import hamburger from "../assets/hamburger.svg";
import close from "../assets/close.svg";
import WhatsApp from "../utils/WhatsApp";
import Facebook from "../utils/Facebook";
import Instagram from "../utils/Instagram";
import LinkedIn from "../utils/LinkedIn";
import TikTok from "../utils/Tiktok";

export function Header2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header
        className={`w-full py-4 transition-all duration-300 rounded-b-[25px] ${
          isScrolled ? "bg-[#000312]/90 backdrop-blur-sm " : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Versión Móvil */}
          <div className="flex justify-between items-center md:hidden">
            <a href="/" className="flex-shrink-0">
              <img src={logoBlanco.src} alt="Logo" className="h-6 w-auto" />
            </a>
            <button
              className="flex-shrink-0 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <img
                  src={close.src}
                  alt="Cerrar Menu"
                  className="w-[28px] h-[28px]"
                />
              ) : (
                <img
                  src={hamburger.src}
                  alt="Abrir Menu"
                  className="w-[28px] h-[28px]"
                />
              )}
            </button>
          </div>

          {/* Versión Desktop */}
          <div className="hidden md:flex justify-between items-center">
            <a href="/" className="flex-shrink-0">
              <img src={logoBlanco.src} alt="IFCET" className="h-6 w-auto" />
            </a>

            <nav className="flex items-center space-x-8">
              <a
                href="/"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Inicio
              </a>
              <a
                href="/docentes"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Docentes
              </a>
              
              <a
                href="/cursos"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Cursos
              </a>
              <a
                href="/contacto"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Contacto
              </a>
              <a
                href="/nosotros"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Nosotros
              </a>
              <a
                href="/blog"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Blog
              </a>
              <a
                href="/biblioteca"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Biblioteca
              </a>
              <a
                href="/aula-virtual"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Aula Virtual
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Menú móvil desplegable */}
      <div
        className={`bg-[#e3e4e6] text-ifcet-primary md:hidden transition-all duration-300 
        ${
          isOpen
            ? "opacity-100 visible max-h-screen mt-1"
            : "opacity-0 invisible max-h-0"
        }`}
      >
        <div className="px-4 py-6">
          <ul className="flex flex-col gap-y-4">
            <li className="text-center">
              <a href="/biblioteca">Biblioteca</a>
            </li>
            <li className="text-center">
              <a href="/aula-virtual">Aula Virtual</a>
            </li>
            <li className="text-center">
              <a href="/docentes">Docentes</a>
            </li>
            <li className="text-center">
              <a href="/blog">Blog</a>
            </li>
            <li className="text-center">
              <a href="/noticias">Noticias</a>
            </li>
            <li className="text-center">
              <a href="/cursos">Cursos</a>
            </li>
            <li className="text-center">
              <a href="/contacto">Contáctanos</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Redes sociales en móvil */}
      <div
        className={`bg-[#eaebf1] text-ifcet-primary md:hidden transition-all duration-300 
        ${
          isOpen
            ? "opacity-100 visible max-h-screen mt-1"
            : "opacity-0 invisible max-h-0"
        }`}
      >
        <div className="p-2 flex justify-center items-center gap-x-4">
          <a href="" className="hover:opacity-80" target="_blank">
            <WhatsApp className="w-[28px] h-[28px]" />
          </a>
          <a href="" className="hover:opacity-80" target="_blank">
            <Facebook className="w-[28px] h-[28px]" />
          </a>
          <a href="" className="hover:opacity-80" target="_blank">
            <Instagram className="w-[28px] h-[28px]" />
          </a>
          <a href="" className="hover:opacity-80" target="_blank">
            <LinkedIn className="w-[28px] h-[28px]" />
          </a>
          <a href="" className="hover:opacity-80" target="_blank">
            <TikTok className="w-[28px] h-[28px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
