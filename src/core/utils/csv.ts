export function arraysACSV(
  nombresColumnas: string[],
  datos: (string | number)[][],
  nombreArchivo: string
): void {
  let csvData: string[] = [];
  csvData.push(nombresColumnas.join(','));

  datos.forEach((fila) => {
    csvData.push(fila.join(','));
  });

  const csvContent: string = csvData.join('\n');
  const blob: Blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const link: HTMLAnchorElement = document.createElement('a');
  if (link.download !== undefined) {
    const url: string = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', nombreArchivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
