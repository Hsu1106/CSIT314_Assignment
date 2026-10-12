// BOUNDARY: the login page the user interacts with.
class LoginPage {
  init() {
    this.form = document.getElementById('loginForm');
    this.message = document.getElementById('message');
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmit();
    });
  }

  async onSubmit() {
    const data = new FormData(this.form);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: data.get('username'), password: data.get('password') }),
    });
    const result = await response.json();
    if (result.success) {
      this.displaySuccess(result.account);
    } else {
      this.displayError(result.message);
    }
  }

  displaySuccess(account) {
    this.message.className = 'success';
    this.message.textContent = `Welcome, ${account.username} (${account.profile})`;
  }

  displayError(message) {
    this.message.className = 'error';
    this.message.textContent = message;
  }
}
