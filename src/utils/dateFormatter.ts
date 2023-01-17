

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("Id", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: 'numeric'
    })
};

export { formatDate }