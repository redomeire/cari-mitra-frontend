

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("Id", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
};

export { formatDate }