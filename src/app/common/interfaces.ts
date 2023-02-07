export interface Componente {
  nombre: string,
  anyoCreacion: number,
  icono: string
}

export interface Serie{

  nombre: string,
  url: String[],
  categorias: Categorias[],
  numeroDeCapitulos: number,
  anyDeEmision: number,
  sinopsis: string,
  puntuacion: Puntuacion[]
}

export interface Puntuacion{
  email: string,
  puntuacion: number
}

export interface Categorias{
  _id: string,
  nombre: string,
  img: string
}

