// CONTROLLER: lists IDPs for the public home page (before login).
class BrowseIDPController {
  /** @param {import('../entity/IDP')} idp */
  constructor(idp) {
    this.idp = idp;
  }

  getLatestIDPs(limit = 12) {
    const n = Math.min(Math.max(Number(limit) || 12, 1), 50);
    return this.idp.getLatestIDPs(n);
  }
}

module.exports = BrowseIDPController;
