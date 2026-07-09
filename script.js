let packages = [];

async function loadPackages() {
  const res = await fetch("packages/index.json");
  const data = await res.json();

  packages = data.packages || [];
  document.getElementById("packageCount").textContent = packages.length;
  document.getElementById("totalDownloads").textContent =
    packages.reduce((sum, p) => sum + (p.downloads || 0), 0).toLocaleString();

  renderPackages(packages);
}

function renderPackages(list) {
  const grid = document.getElementById("packageGrid");
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p>No packages found.</p>`;
    return;
  }

  for (const pkg of list) {
    const card = document.createElement("article");
    card.className = "package-card";

    const tags = (pkg.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join("");
    const installId = `install-${pkg.id}`;

    card.innerHTML = `
      <h3>
        <span>${escapeHtml(pkg.name)}</span>
        <span class="version">v${escapeHtml(pkg.version)}</span>
      </h3>
      <p>${escapeHtml(pkg.description)}</p>
      <div class="tags">${tags}</div>
      <div class="install-box">
        <code id="${installId}">${escapeHtml(pkg.install)}</code>
        <button onclick="copyText('${installId}')">Copy</button>
      </div>
      <div class="card-actions">
        <a href="${pkg.file}" download>Download .luma</a>
        <a href="${pkg.homepage}" target="_blank" rel="noreferrer">Source</a>
      </div>
    `;

    grid.appendChild(card);
  }
}

function copyText(id) {
  const el = document.getElementById(id);
  const text = el.innerText;
  navigator.clipboard.writeText(text);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();

  const filtered = packages.filter(pkg => {
    const blob = [
      pkg.id,
      pkg.name,
      pkg.description,
      pkg.language,
      ...(pkg.tags || [])
    ].join(" ").toLowerCase();

    return blob.includes(q);
  });

  renderPackages(filtered);
});

loadPackages();
