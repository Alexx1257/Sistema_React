import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf'; // Cambio: Importación nombrada
import autoTable from 'jspdf-autotable'; // Cambio: Importación directa del plugin

export const exportToExcel = async (data, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventario');

    worksheet.columns = [
        { header: 'Expediente', key: 'expediente', width: 15 },
        { header: 'Serie', key: 'serie', width: 20 },
        { header: 'Tipo', key: 'tipo', width: 10 },
        { header: 'Marca', key: 'marca', width: 15 },
        { header: 'Modelo', key: 'modelo', width: 15 },
        { header: 'IP', key: 'ip', width: 15 },
        { header: 'Hostname', key: 'hostname', width: 20 },
        { header: 'Usuario', key: 'usuario', width: 20 },
        { header: 'Área', key: 'area', width: 20 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'SIGTIG', key: 'sigtig', width: 10 }
    ];

    data.forEach(item => {
        worksheet.addRow({
            ...item,
            sigtig: item.sigtig ? 'SÍ' : 'NO'
        });
    });

    worksheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${fileName}.xlsx`);
};

export const exportToPDF = (data, title) => {
    const doc = new jsPDF(); // Crear instancia
    
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    const tableColumn = ["Expediente", "Equipo", "IP/Host", "Usuario", "Área", "Status"];
    const tableRows = data.map(item => [
        item.expediente,
        `${item.marca} ${item.modelo}`,
        `${item.ip}\n${item.hostname}`,
        item.usuario,
        item.area,
        item.status
    ]);

    // Uso directo de autoTable pasando el documento (más robusto)
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [15, 23, 42] }
    });

    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
};