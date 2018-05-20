let ACCESS_LEVEL = {
  ContentManager: 0,
  SalesManager: 1,
  Clerk: 2,
  DeliveryAgent: 3
};
let ORDER_STATUS = {
  default: 1,
  WaitForOnlineWarehouse: 2,
  OnlineWarehouseVerified:3,
  ReadyToInvoice: 4,
  WaitForInvoice: 5,
  Invoice: 6,
  ReadyToDeliver: 7,
  OnDelivery: 8,
  Delivered: 9,
  Refund: 10,
  Return: 11,
  Cancel: 12,
  NotExists: 13,
};

module.exports = {
  ACCESS_LEVEL,
  ORDER_STATUS
};

