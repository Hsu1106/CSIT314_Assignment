// CONTROLLER: application logic for "As a user, I want to log in".
// Boundary -> LoginController -> UserAccount (entity)
class LoginController {
  /** @param {import('../entity/UserAccount')} userAccount */
  constructor(userAccount) {
    this.userAccount = userAccount;
  }

  login(username, password) {
    if (!username || !password) {
      return { success: false, message: 'Username and password are required' };
    }
    const account = this.userAccount.login(username.trim(), password);
    if (!account) {
      return { success: false, message: 'Invalid username or password' };
    }
    return { success: true, account };
  }
}

module.exports = LoginController;
