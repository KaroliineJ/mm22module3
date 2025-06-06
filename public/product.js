document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  if (!name) return;

  try {
    const res = await fetch(`/api/products?name=${encodeURIComponent(name)}`);
    const product = await res.json();

    document.getElementById("product-title").textContent = product.nimi || "Toode";
    document.getElementById("product-image").src = product.pilt || "assets/placeholder.jpg";
    document.getElementById("product-image").alt = product.nimi || "Toote pilt";
    document.getElementById("product-description").textContent = product.kirjeldus || "Kirjeldus puudub";
    document.getElementById("product-price").textContent = product.hind + " €";
  } catch (err) {
    document.getElementById("product-title").textContent = "Toote laadimine ebaõnnestus";
  }
});
