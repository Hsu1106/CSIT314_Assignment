// Shared helpers for every page: calling the API and drawing the top navigation.
const Api = {
  async request(method, url, body) {
    const res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'same-origin',
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, ...data };
  },
  get(url) { return this.request('GET', url); },
  post(url, body) { return this.request('POST', url, body ?? {}); },
  me() { return this.get('/api/auth/me'); },
};

const Nav = {
  /** Draws the nav bar. Returns the logged-in account (or null). */
  async render() {
    const { account } = await Api.me();
    const nav = document.getElementById('nav');
    nav.className = 'nav';
    nav.innerHTML = `<div class="nav-inner">
        <a class="brand" href="/index.html">Interior<span>Match</span></a>
        <a class="link" href="/index.html">Home</a>
        <span id="navRight"></span>
      </div>`;
    const right = nav.querySelector('#navRight');
    right.style.display = 'flex';
    right.style.gap = '16px';
    right.style.alignItems = 'center';
    if (account) {
      const who = document.createElement('span');
      who.className = 'who';
      who.textContent = `${account.username} · ${account.profile}`;
      const dash = Object.assign(document.createElement('a'), { className: 'link', href: '/dashboard.html', textContent: 'Dashboard' });
      const out = Object.assign(document.createElement('button'), { className: 'btn secondary', textContent: 'Log out', id: 'logoutBtn' });
      right.append(dash, who, out);
    } else {
      right.append(Object.assign(document.createElement('a'), { className: 'btn', href: '/login.html', textContent: 'Log in' }));
    }
    return account ?? null;
  },
};

// #12 Logout (boundary side): clickLogout -> LogoutController, then clear the session and go to login.
const LogoutAction = {
  bind() {
    const btn = document.getElementById('logoutBtn');
    if (btn) btn.addEventListener('click', () => this.clickLogout());
  },
  async clickLogout() {
    await Api.post('/api/auth/logout');
    this.redirectToLoginPage();
  },
  redirectToLoginPage() {
    window.location.href = '/login.html?loggedOut=1';
  },
};

// Small helpers for drawing text safely (never put user data into innerHTML).
function el(tag, props = {}, ...children) {
  const node = Object.assign(document.createElement(tag), props);
  for (const c of children) node.append(c);
  return node;
}
const money = (n) => (n == null ? '' : `S$${Number(n).toLocaleString('en-SG')}`);
