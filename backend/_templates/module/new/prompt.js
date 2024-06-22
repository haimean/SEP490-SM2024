module.exports = [
  {
    type: 'select',
    name: 'moduleName',
    message: 'Choose the module role',
    choices: ['admin', 'auth', 'guest', 'host', 'user'],
  },

  {
    type: 'input',
    name: 'name',
    message: 'Enter the module name',
  },
];
