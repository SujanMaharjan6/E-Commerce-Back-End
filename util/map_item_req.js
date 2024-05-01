module.exports = function (item, itemDetails) {
    if (itemDetails.name)
        item.name = itemDetails.name;
    if (itemDetails.description)
        item.description = itemDetails.description;
    if (itemDetails.brand)
        item.brand = itemDetails.brand;
    if (itemDetails.category)
        item.category = itemDetails.category;
    if (itemDetails.price)
        item.price = itemDetails.price;
    if (itemDetails.color)
        item.color = itemDetails.color;
    if (itemDetails.size)
        item.size = itemDetails.size;
    if (itemDetails.quantity)
        item.quantity = itemDetails.quantity;
    if (itemDetails.warrentyPeriod)
        item.warrentyPeriod = itemDetails.warrentyPeriod;
    if (itemDetails.warrentyStatus)
        item.warrentyStatus = itemDetails.warrentyStatus;
    if (itemDetails.isReturnEligible)
        item.isReturnEligible = itemDetails.isReturnEligible;
    if (itemDetails.returnTimePeroidInDay)
        item.returnTimePeroidInDay = itemDetails.returnTimePeroidInDay;
    if (itemDetails.salesDate)
        item.salesDate = itemDetails.salesDate;
    if (itemDetails.modelNo)
        item.modelNo = itemDetails.modelNo;
    if (itemDetails.images)
        item.images = itemDetails.images;
    if (itemDetails.vendor)
        item.vendor = itemDetails.vendor;
    if (itemDetails.status)
        item.status = itemDetails.status;
    if (itemDetails.offers)
        item.offers = typeof (itemDetails.offers) === 'string' ? itemDetails.offers.split(',') : itemDetails.offers;
    if (itemDetails.tags)
        item.tags = typeof (itemDetails.tags) === 'string' ? itemDetails.tags.split(',') : itemDetails.tags;
    if (itemDetails.discountedItem || itemDetails.discountType || itemDetails.discountValue) {
        if (!item.discount)
            item.discount = {};
        if (itemDetails.discountedItem)
            item.discount.discountedItem = itemDetails.discountedItem;
        if (itemDetails.discountType)
            item.discount.discountType = itemDetails.discountType;
        if (itemDetails.discountValue)
            item.discount.discountValue = itemDetails.discountValue;
    }
    if (itemDetails.ratingPoint && itemDetails.ratingMessage) {

        var ratingBody = {
            message: itemDetails.ratingMessage,
            point: itemDetails.ratingPoint
        };
        item.ratings.push(ratingBody);
    }

    return item;
}
