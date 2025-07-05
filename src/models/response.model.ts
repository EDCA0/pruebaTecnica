export interface ApiResponse <T> {
    success: boolean
    statusCode : number
    data: T | null
    error?: string | string[] //> Se usa si success es false para explicar el por qué dio false o dar el listado de errores
}