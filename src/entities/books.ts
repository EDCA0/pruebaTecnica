import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index, Check } from 'typeorm';
import { GeneroLibro } from '../models';

/**
 * Entidad Book que representa un libro en la base de datos
 * 
 * Esta entidad almacena la información básica de los libros incluyendo
 * título, autor, año de publicación y género literario. Hereda de BaseEntity
 * para proporcionar métodos de repositorio estáticos como find(), save(), etc.
 * 
 * @entity
 * @table books
 * 
 * @example
 * ```typescript
 * const book = new Book();
 * book.title = "El Quijote de la Mancha";
 * book.author = "Miguel de Cervantes";
 * book.year = 1605;
 * book.genre = GeneroLibro.NOVELA;
 * await book.save();
 * ```
 */
@Entity()
@Index(['author', 'year']) // Índice compuesto para búsquedas por autor y año
@Index(['genre']) // Índice para búsquedas por género
@Check(`"year" >= 1455 AND "year" <= EXTRACT(YEAR FROM CURRENT_DATE)`)
export class Book extends BaseEntity {
/**
    * Identificador único del libro
    * 
    * Clave primaria auto-incremental generada automáticamente por la base de datos.
    * Se utiliza para referenciar de manera única cada libro en el sistema.
    * 
    * @type {number}
    * @memberof Book
    * @primary
    * @generated
    * @example 1
*/
	@PrimaryGeneratedColumn()
	declare id: number;

/**
    * Título del libro
    * 
    * Campo obligatorio que almacena el título completo del libro.
    * Se limita a 100 caracteres para optimización de base de datos.
    * Los espacios en blanco se eliminan automáticamente en los DTOs.
    * 
    * @type {string}
    * @memberof Book
    * @length 1-100
    * @example "El Ingenioso Hidalgo Don Quijote de la Mancha"
*/
	@Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        comment: 'Titulo completo del libro'
    })
    @Index() 
	declare title: string;	

/**
     * Nombre completo del autor del libro
     * 
     * Campo obligatorio que almacena el nombre completo del autor.
     * Se limita a 80 caracteres para optimización de base de datos.
     * Los espacios en blanco se eliminan automáticamente en los DTOs.
     * 
     * @type {string}
     * @memberof Book
     * @length 3-80
     * @example "Miguel de Cervantes Saavedra"
     */
	@Column({
		type: 'varchar',
		length: 80,
		nullable: false,
		comment: 'Nombre completo del autor'
	})
	declare author: string;

/**
     * Año de publicación del libro
     * 
     * Campo obligatorio que almacena el año de publicación del libro.
     * Debe ser un número entero positivo entre 1455 (año de la primera imprenta
     * de Gutenberg) y el año actual. Se valida dinámicamente contra el año actual
     * para evitar fechas futuras irreales.
     * 
     * @type {number}
     * @memberof Book
     * @example 1605
     */
	@Column({
		type: 'int',
		nullable: false,
		comment: 'Año de publicación del libro'
	})
	declare year: number;

/**
     * Género literario del libro
     * 
     * Campo obligatorio que almacena el género del libro.
     * Debe ser uno de los valores definidos en el enum GeneroLibro.
     * La validación se realiza automáticamente contra los valores permitidos.
     * 
     * @type {GeneroLibro}
     * @memberof Book
     * @example GeneroLibro.NOVELA
     */
	@Column({
		type: 'enum',
		enum: GeneroLibro,
		nullable: false,
		comment: 'Género literario del libro'
	})
	declare genre: GeneroLibro;
}
