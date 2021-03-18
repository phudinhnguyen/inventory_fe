export const formatPrice = (
    price: Undefinable<number>
): string => {
    if (price) {
        const priceString = String(price);
        return `${priceString.substr(0, priceString.length - 3)}.${priceString.substr(priceString.length - 3)} đ`;
    }
    return String(0);
};
