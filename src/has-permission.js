function isInAdminList(id) {
  return global.config.admins.includes(String(id));
}

module.exports = function hasPermission(command, user) {
  return isInAdminList(user.id);
}