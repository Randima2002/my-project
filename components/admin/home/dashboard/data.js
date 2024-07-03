// data.js
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "Email", uid: "email" },
  { name: "NIC", uid: "nic" },
  { name: "Contact No", uid: "contact" },
  { name: "Checking Date", uid: "checking_date", sortable: true },
  { name: "Checkout Date", uid: "checkout_date" },
  { name: "Adult", uid: "adult" },
  { name: "Children", uid: "child" },
  { name: "Room Type", uid: "room_type" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions };
