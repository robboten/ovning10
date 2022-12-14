const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
  <header class="container">
  <nav class="navbar navbar-expand-lg text-white">
  <div class="container">
      <a class="navbar-brand text-white" href="/">Övning 10</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                  <a class="nav-link text-white" aria-current="page" href="index.html">SW Search 1</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link text-white" href="alt2.html">SW Search 2</a>
              </li>
              <li class="nav-item">
              <a class="nav-link text-white" href="cards.html">Cards</a>
          </li>
          </ul>
      </div>
  </div>
</nav>
  </header>
`;

class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'closed' });
  
      shadowRoot.appendChild(headerTemplate.content);
    }
  }

  customElements.define('header-component', Header);