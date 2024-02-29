import formateTimestampToDate from "./formateDate.js";

const formateDeals = (deals) => {
    return deals.map((deal) => {
       const createdAt = formateTimestampToDate(deal.created_at);
       const updatedAt = formateTimestampToDate(deal.updated_at);

        return {
            name: deal.name,
            price: deal.price,
            created_at: createdAt,
            updated_at: updatedAt,
            responsible_user_id: deal.responsible_user_id,
        };
    });
};

export default formateDeals;