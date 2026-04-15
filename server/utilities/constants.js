const UserRoles = {
    ADMIN: "admin",
    CUSTOMER: "customer"
};

const GeneralStatus ={
    ACTIVE:"active",
    INACTIVE:"inactive"
}
const Gender = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other"
}
const OrderStatus ={
    PENDING:"pending",
    PROCESSING:"processing",
    COMPLETED:'completed',
    CANCELLED:"cancelled"

}
const PaymentStatus = {
    PENDING:"pending",
    SUCCESS:"success",
    FAILED:"failed"
}

module.exports = {
    UserRoles,
    GeneralStatus,
    Gender,
    OrderStatus,
    PaymentStatus
}

