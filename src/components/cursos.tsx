import { Swiper, SwiperSlide } from "swiper/react";
import "./swipermodules.css";
import { FreeMode, Pagination } from "swiper/modules";
import { Card } from "./card.tsx";
import cursosData from "../data/cursos.json";

export function Cursos() {
  const cursos = cursosData;

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
          {cursos.map((curso, index) => (
            <SwiperSlide key={index} className="pb-8">
              <Card
                img={curso.img}
                title={curso.title}
                docente={curso.docente}
                Inicio={curso.Inicio}
                lessons={curso.lessons}
                students={curso.students}
                hours={curso.hours}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
