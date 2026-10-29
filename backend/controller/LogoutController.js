// CONTROLLER: #12 "As an Interior Designer, I want to logout of my account".
class LogoutController {
  /** @param {import('../entity/UserAccount')} userAccount */
  constructor(userAccount) {
    this.userAccount = userAccount;
  }

  logout(userId) {
    if (!userId) return { success: false, message: 'Not logged in' };
    this.userAccount.recordLogout(userId);
    return { success: true };
  }
}

module.exports = LogoutController;
