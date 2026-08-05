//Sirve para formatear los numeros ejem 1.000.000
const numberFormatter = new Intl.NumberFormat("es-CO");

export const formatNumber = (value: number) => {
  return numberFormatter.format(value);
};