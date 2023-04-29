const initialize = {
    orders: [],
    order: {},
    // productsCategories: []
};

export const OrdersReducer = (state = initialize, action) => {
    switch (action.type) {
        case "GET_Orders_LIST":
            return {
                ...state,
                orders: action.payload
            }
        case "ALL_ORDER_LIST":
            return {
                ...state,
                orders: action.payload
            }
        case "DELETE_ORDER_BY_ADMIN":
            return {
                ...state,
                orders: action.payload.data
            }
        case "DELETE_ORDER":
            return {
                ...state,
                orders: action.payload.data
            }
        case "GET_SINGLE_ORDER":
            return {
                ...state,
                order: action.payload,
            }
        case "ADD_ORDER":
            state.orders.push(action.payload)
            return {
                ...state,
                orders: action.payload
            }

        default:
            return state;
    }
};