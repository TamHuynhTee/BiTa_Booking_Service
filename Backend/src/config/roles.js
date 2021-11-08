const allRoles = {
  user: [],
  business: [],
  manager: ['approveBusiness', 'manageCategories'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
