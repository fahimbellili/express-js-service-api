/* eslint-disable global-require */
class Base {
  static getService() {
    if (this.service) {
      return this.service;
    }

    const className = this.name;
    const serviceName = `${
      className.charAt(0).toLocaleLowerCase() + className.slice(1)
    }Service`;

    // eslint-disable-next-line import/no-dynamic-require
    this.service = require(`../services/${serviceName}`);

    return this.service;
  }
}

module.exports = Base;
