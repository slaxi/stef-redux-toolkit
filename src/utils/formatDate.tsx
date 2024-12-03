
export const formatDate = (d: string) => {
    const date = new Date(d);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
   return formattedDate

}