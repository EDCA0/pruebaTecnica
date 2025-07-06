export enum GeneroLibro {
	/* --- Ficción --- */
	AVENTURA = 'Aventura',
	CIENCIA_FICCION = 'Ciencia Ficción',
	FANTASIA = 'Fantasía',
	MISTERIO = 'Misterio',
	TERROR = 'Terror',
	ROMANCE = 'Romance',
	THRILLER = 'Thriller / Suspense',
	NOVELA_HISTORICA = 'Novela Histórica',
	NOVELA_GRAFICA = 'Novela Gráfica / Cómic',
	DISTOPIA = 'Distopía',
	JUVENIL = 'Juvenil (Young Adult)',

	/* --- No Ficción --- */
	BIOGRAFIAS = 'Biografías / Memorias',
	HISTORIA = 'Historia',
	DIVULGACION_CIENTIFICA = 'Divulgación Científica',
	PSICOLOGIA = 'Psicología',
	POLITICA = 'Política',
	ECONOMIA = 'Negocios y Economía',
	AUTOAYUDA = 'Autoayuda',
	ENSAYO = 'Ensayo',
	POESIA = 'Poesía',
}
export interface Book {
	id: number;
	title: string;
	author: string;
	year: number;
	genre: GeneroLibro;
}
