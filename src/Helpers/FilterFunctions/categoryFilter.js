export function filterByCategories(products, { categories }) {
    const categoryKeys = Object.keys(categories);
    const categoryValues = Object.values(categories);

    let filteredList = [];
    if (categoryValues.includes(true)) {
        categoryKeys.map((eachCategory) => {
            if (categories[eachCategory]) {
                let currentFilter = [...products].filter(
                    (eachProduct) => eachProduct.categoryName.toUpperCase() === eachCategory
                );
                filteredList.push(...currentFilter);
            }
        });
    } else {
        filteredList = [...products];
    }
    return filteredList;
}
