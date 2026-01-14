import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";

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

/**
 * Código Nuevo: Hook para obtener el catálogo de sitios e IPs en tiempo real.
 * Se conecta a la colección 'sites' para obtener empresa, nombre y segmento de IP.
 */
export const useSiteCatalog = () => {
    const [sitios, setSitios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Referencia a la colección de sitios ordenada por nombre
        const q = query(collection(db, "sites"), orderBy("nombre", "asc"));

        const unsub = onSnapshot(q, (snapshot) => {
            const sitiosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() // Aquí viene el campo 'segmento' (ej: 10.5.1)
            }));
            setSitios(sitiosData);
            setLoading(false);
        }, (error) => {
            console.error("Error al cargar el catálogo de sitios:", error);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return { sitios, loading };
};