const allRoles = {
  user: ['appointment', 'customer'],
  business: ['service', 'branch', 'business', 'appointment'],
  manager: ['approveBusiness', 'manageCategories', 'manager'],
  admin: ['getUsers', 'manageUsers', 'admin'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
