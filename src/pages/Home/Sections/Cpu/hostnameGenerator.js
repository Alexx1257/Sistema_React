/**
 * Genera un Hostname basado en reglas institucionales
 * @param {Object} usuario - Objeto con nombres, apellido_pa, apellido_ma
 * @param {boolean} esLaptop - Si el equipo es tipo LAPTOP
 * @param {Array} cpusExistentes - Lista de CPUs para verificar duplicados y sufijos
 */
export const generarHostname = (usuario, esLaptop = false, cpusExistentes = []) => {
    let hostnameBase = "627";
    
    // Inicial del nombre
    const primeraLetra = usuario.nombre ? usuario.nombre[0].toUpperCase() : "X";
    hostnameBase += primeraLetra;

    // Procesar apellidos (reemplazar Ñ)
    const limpiarTexto = (t) => (t || "").replace(/Ñ/g, "N").toUpperCase();
    const apePat = limpiarTexto(usuario.apellido_pa);
    const apeMat = limpiarTexto(usuario.apellido_ma);

    let apellidosStr = "";
    if (apePat.length >= 7) {
        apellidosStr = apePat.substring(0, 7);
    } else {
        const faltantes = 7 - apePat.length;
        apellidosStr = apePat + apeMat.substring(0, faltantes);
    }

    hostnameBase += apellidosStr.substring(0, 7);
    hostnameBase = hostnameBase.padEnd(11, "X").substring(0, 11);

    // Verificar si ya existe para OTRO usuario (simulación de lógica Django)
    const existeParaOtro = cpusExistentes.some(cpu => 
        cpu.hostname.startsWith(hostnameBase) && cpu.usuario !== `${usuario.nombre} ${usuario.apellido_pa}`
    );

    if (existeParaOtro) {
        let apellidosAlt = "";
        if (apeMat.length >= 7) {
            apellidosAlt = apeMat.substring(0, 7);
        } else {
            const faltantes = 7 - apeMat.length;
            apellidosAlt = apeMat + apePat.substring(0, faltantes);
        }
        hostnameBase = "627" + primera_letra_nombre + apellidosAlt.substring(0, 7);
    }

    if (esLaptop) hostnameBase += "L";

    // Calcular sufijo
    const regex = new RegExp(`^${hostnameBase}(\\d{2})`);
    let maxContador = 0;

    cpusExistentes.forEach(cpu => {
        const match = cpu.hostname.match(regex);
        if (match) {
            const num = parseInt(match[1]);
            if (num > maxContador) maxContador = num;
        }
    });

    const nuevoSufijo = String(maxContador + 1).padStart(2, '0');
    return hostnameBase + nuevoSufijo;
};