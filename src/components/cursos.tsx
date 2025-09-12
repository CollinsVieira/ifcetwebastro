import { Swiper, SwiperSlide } from "swiper/react";
import "./swipermodules.css";
import { FreeMode, Pagination } from "swiper/modules";
import { Card } from "./card.tsx";
import categoriasData from "../data/cursos.json";
import type { CategoriaCurso } from "../types/index";

export function Cursos() {
  // Extraer todos los cursos de todas las categorías
  const todosLosCursos = (categoriasData as CategoriaCurso[]).flatMap(categoria => categoria.cursos);

  return (
    <section className="bg-white overflow-x-hidden w-full">
      <div className="w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1536: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[FreeMode, Pagination]}
          className="courses-swiper"
        >
          {todosLosCursos.map((curso, index) => (
            <SwiperSlide key={index} className="pb-8">
              <Card
                img={curso.img}
                title={curso.title}
                docente={curso.docente}
                Inicio={curso.Inicio}
                lessons={parseInt(curso.lessons)}
                students={parseInt(curso.students)}
                hours={curso.hours}
                link={curso.link}
                brochure={curso.brochure}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
