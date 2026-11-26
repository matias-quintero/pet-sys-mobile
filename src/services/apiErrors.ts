const TRANSLATIONS: [RegExp, string][] = [
    [/^Invalid email or password\.$/, 'Email o contraseña incorrectos.'],
    [/^User with id .+ is suspended\.$/, 'Tu usuario está suspendido. Comunicate con la veterinaria.'],
    [/^Pet with id .+ was not found\.$/, 'La mascota no existe.'],
    [/^Consultation with id .+ was not found\.$/, 'La consulta no existe.'],
    [/^One or more validation errors occurred\.$/, 'Revisá los datos ingresados.'],
];

export function translateApiError(title: string): string {
    return TRANSLATIONS.find(([pattern]) => pattern.test(title))?.[1] ?? '';
}