export function addressFormvalidator(details, addressFormErrorDispatch) {
    const { name, city, state, locality, pincode, phoneNumber } = details;
    let errorFlag = false;
    if (name.trim() === "" || !/^[a-zA-Z]+(\s*\w*)*$/.test(name)) {
        addressFormErrorDispatch({ type: "SET_NAME_ERROR", payload: { error: "Please enter valid name" } });
        errorFlag = true;
    }
    if (city.trim() === "" || !/^[a-zA-Z]+(\s*\w*)*$/.test(city)) {
        addressFormErrorDispatch({ type: "SET_CITY_ERROR", payload: { error: "Please enter the city" } });
        errorFlag = true;
    }
    if (state.trim() === "" || !/^[a-zA-Z]+(\s*\w*)*$/.test(state)) {
        addressFormErrorDispatch({ type: "SET_STATE_ERROR", payload: { error: "Please enter the state" } });
        errorFlag = true;
    }
    if (locality.trim() === "") {
        addressFormErrorDispatch({ type: "SET_LOCALITY_ERROR", payload: { error: "Please enter the locality" } });
        errorFlag = true;
    }
    if (!pincode.match("^[1-9][0-9]{5}$")) {
        addressFormErrorDispatch({ type: "SET_PINCODE_ERROR", payload: { error: "Not a valid Pincode" } });
        errorFlag = true;
    }

    let numRegex = new RegExp("^(\\+91[\\-\\s]?)?[0]?(91)?[6789]\\d{9}$");
    if (!phoneNumber.match(numRegex)) {
        addressFormErrorDispatch({ type: "SET_NUMBER_ERROR", payload: { error: "Enter number in valid format." } });
        errorFlag = true;
    }
    return errorFlag;
}
