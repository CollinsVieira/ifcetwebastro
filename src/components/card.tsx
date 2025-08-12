interface CardProps {
  img: string;
  title: string;
  docente: string;
  Inicio: string;
  lessons?: number;
  students?: number;
  hours?: string;
  link?: string;
}

export function Card({
  img,
  title,
  docente,
  Inicio,
  lessons = 4,
  students = 22,
  hours = "120 horas",
  link,
}: CardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl mb-8 
    md:max-w-[300px] lg:max-w-[400px]">
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg
              fill="#585D69"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8,3 L8,17 L19,17 L19,3.5 C19,3.22385763 18.7761424,3 18.5,3 L8,3 Z M7,3 L6.5,3 C5.67157288,3 5,3.67157288 5,4.5 L5,17.4998169 C5.41783027,17.1859724 5.93719704,17 6.5,17 L7,17 L7,3 Z M4.15121433,20.3582581 C4.05793442,20.2674293 4,20.1404803 4,20 L4,4.5 C4,3.11928813 5.11928813,2 6.5,2 L18.5,2 C19.3284271,2 20,2.67157288 20,3.5 L20,20.5 C20,21.3284271 19.3284271,22 18.5,22 L6.5,22 C5.42082093,22 4.50134959,21.3162099 4.15121433,20.3582581 L4.15121433,20.3582581 Z M19,18 L6.5,18 C5.67157288,18 5,18.6715729 5,19.5 C5,20.3284271 5.67157288,21 6.5,21 L18.5,21 C18.7761424,21 19,20.7761424 19,20.5 L19,18 Z M10.5,10 C10.2238576,10 10,9.77614237 10,9.5 C10,9.22385763 10.2238576,9 10.5,9 L16.5,9 C16.7761424,9 17,9.22385763 17,9.5 C17,9.77614237 16.7761424,10 16.5,10 L10.5,10 Z M10.5,8 C10.2238576,8 10,7.77614237 10,7.5 C10,7.22385763 10.2238576,7 10.5,7 L14.5,7 C14.7761424,7 15,7.22385763 15,7.5 C15,7.77614237 14.7761424,8 14.5,8 L10.5,8 Z" />
            </svg>
            <span className="text-sm">{lessons}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="3"
              stroke="#585D69"
              fill="none"
            >
              <path d="M48.61,56.07A16.61,16.61,0,0,0,32,39.45h0A16.61,16.61,0,0,0,15.39,56.07Z" />
              <path d="M39.41,28a8.11,8.11,0,0,1-8.25,8.1,8.28,8.28,0,0,1-7.95-8.37V16.45a.06.06,0,0,1,.05-.06,60.56,60.56,0,0,1,8.27-.68,54.93,54.93,0,0,1,7.91.68.06.06,0,0,1,.06.06Z" />
              <path d="M23.21,20.14l-8.27-3.8a.08.08,0,0,1,0-.13L31.32,8.39h.06l16.33,7.74a.07.07,0,0,1,0,.12L39.5,20.14" />
              <path d="M23.21,24.35H20.89s-2,0-2,3.1c0,2.86,2,2.86,2,2.86l2.72,0" />
              <path d="M39.41,24.71h2.32s2,0,2,3.09c0,2.86-2,2.86-2,2.86H39" />
              <line x1="46.85" y1="33.15" x2="46.85" y2="16.72" />
              <circle cx="46.85" cy="35.28" r="2.13" />
              <path d="M39.5,23a42.89,42.89,0,0,0-7.95-.69,40.85,40.85,0,0,0-8.34.69" />
            </svg>
            <span className="font-medium">{students}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              fill="#585D69"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M13,11 L17,11 L17,13 L11,13 L11,6 L13,6 L13,11 Z"
              />
            </svg>
            <span className="font-medium">{hours}</span>
          </div>
        </div>
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 leading-tight line-clamp-2">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="flex text-yellow-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">{docente}</p>
          <p className="text-xs text-gray-500">Inicio: {Inicio}</p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <a
            className="w-full bg-[#101fd2] hover:bg-[#ffb204] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-center block text-sm"
            role="button"
            href={link || "#"}
            target={link?.startsWith('http') ? "_blank" : undefined}
            rel={link?.startsWith('http') ? "noopener noreferrer" : undefined}
          >
            Solicitar información
          </a>
        </div>
      </div>
    </article>
  );
}
