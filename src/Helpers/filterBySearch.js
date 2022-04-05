export function filterBySearchFunction(productsList, searchValue) {
    if (searchValue.trim() !== "") {
        return productsList.filter((eachProduct) => {
            return (
                eachProduct.title.toUpperCase().includes(searchValue.trim().toUpperCase()) ||
                eachProduct.description.toUpperCase().includes(searchValue.trim().toUpperCase())
            );
        });
    } else {
        return productsList;
    }
}
