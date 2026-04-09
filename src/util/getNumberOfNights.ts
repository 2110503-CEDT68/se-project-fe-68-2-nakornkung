export function getNumberOfNights(checkInDate: string, checkOutDate: string) {
  const inDate = new Date(checkInDate);
  const outDate = new Date(checkOutDate);
  const diffMs = outDate.getTime() - inDate.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
};
