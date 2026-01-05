import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from "firebase/firestore";

/**
 * Hook para obtener el catálogo de marcas y modelos en tiempo real.
 * @param {string} deviceType - El tipo de dispositivo (ej: 'CPU', 'MONITOR')
 */
export const useDeviceCatalog = (deviceType) => {
    const [catalog, setCatalog] = useState({ marcas: [], modelos: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!deviceType) return;

        // Escucha en tiempo real el documento dentro de la colección 'catalog_devices'
        const unsub = onSnapshot(doc(db, "catalog_devices", deviceType), (snapshot) => {
            if (snapshot.exists()) {
                setCatalog(snapshot.data());
            } else {
                // Estructura por defecto si el documento no existe aún
                setCatalog({ marcas: [], modelos: {} });
            }
            setLoading(false);
        });

        return () => unsub();
    }, [deviceType]);

    return { marcas: catalog.marcas || [], modelos: catalog.modelos || {}, loading };
};