const sortDeals = (deals, sortBy, order) => {
    return deals.sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'dealName') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortBy === 'dealPrice') {
            comparison = parseFloat(a.price) - parseFloat(b.price);
        }
        
        return order === 'desc' ? -comparison : comparison;
    });
}

export default sortDeals;