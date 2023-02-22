const titleInput = document.querySelector(".input-title");
const priceInput = document.querySelector(".input-price");
const taxesInput = document.querySelector(".input-taxes");
const adsInput = document.querySelector(".input-ads");
const discountInput = document.querySelector(".input-discount");
const totalPriceSpot = document.querySelector(".total-price-create-amount");
const countInput = document.querySelector(".input-count");
const categoryInput = document.querySelector(".input-category");
const btnCreateProduct = document.querySelector(".btn-create-product");
const tableBody = document.querySelector(".products-table-body");
const allProductsNum = document.querySelector(".all-products-num");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const searchOptionsSpot = document.querySelector(".search-options");
const allSearchOptions = Array.from(
  document.querySelectorAll(".search-option")
);

let allProductsArr = [];
let productsCounter = 0;

function calculateTotalPrice() {
  if (priceInput.value === "" || +priceInput.value === 0)
    return (totalPriceSpot.textContent = "");
  const totalPrice =
    +priceInput.value +
    +taxesInput.value +
    +adsInput.value -
    discountInput.value;
  totalPriceSpot.textContent = totalPrice;
}

function clearProductInputs() {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  adsInput.value = "";
  discountInput.value = "";
  countInput.value = "";
  categoryInput.value = "";
}

function interactWithLocalStorage(interactMethod) {
  const interactMethodLower = interactMethod.toLowerCase();
  if (interactMethodLower === "set")
    return localStorage.setItem("allProducts", JSON.stringify(allProductsArr));
  if (interactMethodLower === "get")
    return JSON.parse(localStorage.getItem("allProducts"));
}

function createNewProduct(fromLocalStorage = false, productInfoArr) {
  const [
    productName,
    productPrice,
    productTaxes,
    productAds,
    productDiscount,
    productCount,
    productCategory,
  ] = productInfoArr;

  if (productPrice === "" || +productPrice === 0) return;
  if (productCount === "" || +productCount === 0) return;
  if (productName === "") return;

  productsCounter += +productCount;
  allProductsNum.textContent = `(${productsCounter})`;

  for (let i = 0; i < +productCount; i++) {
    const productID = Math.floor(Math.random() * 1000000);
    const newProductElement = `
    <tr>
      <td class="id">${productID}</td>
      <td class="title">${productName}</td>
      <td class="price">${productPrice}</td>
      <td class="taxes">${productTaxes !== "" ? productTaxes : "0"}</td>
      <td class="ads">${productAds !== "" ? productAds : "0"}</td>
      <td class="discount">${
        productDiscount !== "" ? productDiscount : "0"
      }</td>
      <td class="category">${
        productCategory !== "" ? productCategory : "No category"
      }</td>
      <td class="total">${totalPriceSpot.textContent}</td>
      <td class="manipulate-product-spot">
          <button class="btn-edit-product" title="Edit the product">
              <svg
                  fill="#fff"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                  d="M18.111,2.293,9.384,11.021a.977.977,0,0,0-.241.39L8.052,14.684A1,1,0,0,0,9,16a.987.987,0,0,0,.316-.052l3.273-1.091a.977.977,0,0,0,.39-.241l8.728-8.727a1,1,0,0,0,0-1.414L19.525,2.293A1,1,0,0,0,18.111,2.293ZM11.732,13.035l-1.151.384.384-1.151L16.637,6.6l.767.767Zm7.854-7.853-.768.767-.767-.767.767-.768ZM3,5h8a1,1,0,0,1,0,2H4V20H17V13a1,1,0,0,1,2,0v8a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V6A1,1,0,0,1,3,5Z"
                  />
              </svg>
              Edit
          </button>
      </td>
      <td class="manipulate-product-spot">
          <button class="btn-delete-product" title="Delete the product">
              <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                  fill="#fff"
                  d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                  />
              </svg>
              Delete
          </button>
      </td>
  </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", newProductElement);

    if (!fromLocalStorage)
      allProductsArr.push({
        ID: productID.toString(),
        name: productName,
        price: productPrice,
        taxes: productTaxes !== "" ? productTaxes : "0",
        ads: productAds !== "" ? productAds : "0",
        discount: productDiscount !== "" ? productDiscount : "0",
        // count: productCount,
        category: productCategory,
        totalPrice: totalPriceSpot.textContent,
      });
  }

  interactWithLocalStorage("Set");

  clearProductInputs();
  totalPriceSpot.textContent = "";
}

function showError(errorMessage) {
  const errorElement = document.createElement("p");
  errorElement.classList.add("error");
  errorElement.textContent = errorMessage;
  document
    .querySelector(".search-by")
    .insertAdjacentElement("beforebegin", errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 2500);
}

function searchForProduct(searchOption) {
  const allCreatedProducts = Array.from(tableBody.querySelectorAll("tr"));
  const searchQuery = searchInput.value;
  allCreatedProducts.forEach((product) => {
    switch (searchOption) {
      case "normal":
        product.dataset.visibility = "visible";
        break;
      case "id":
        const id = product.querySelector(".id").textContent;
        id.startsWith(searchQuery)
          ? (product.dataset.visibility = "visible")
          : (product.dataset.visibility = "hidden");
        break;
      case "title":
        const title = product.querySelector(".title").textContent;
        title.includes(searchQuery)
          ? (product.dataset.visibility = "visible")
          : (product.dataset.visibility = "hidden");
        break;
      case "price":
        const price = product.querySelector(".price").textContent;
        price.startsWith(searchQuery)
          ? (product.dataset.visibility = "visible")
          : (product.dataset.visibility = "hidden");
        break;
      case "taxes":
        const taxes = product.querySelector(".taxes").textContent;
        taxes.startsWith(searchQuery)
          ? (product.dataset.visibility = "visible")
          : (product.dataset.visibility = "hidden");
        break;
      case "ads":
        const ads = product.querySelector(".ads").textContent;
        ads.startsWith(searchQuery)
          ? (product.dataset.visibility = "visible")
          : (product.dataset.visibility = "hidden");
        break;
      case "discount":
        const discount = product.querySelector(".discount").textContent;
        discount.startsWith(searchQuery)
          ? (product.dataset.visibility = "visible")
          : (product.dataset.visibility = "hidden");
        break;
      case "total":
        const total = product.querySelector(".total").textContent;
        total.startsWith(searchQuery)
          ? (product.dataset.visibility = "visible")
          : (product.dataset.visibility = "hidden");
        break;
      case "category":
        const category = product.querySelector(".category").textContent;
        category.includes(searchQuery)
          ? (product.dataset.visibility = "visible")
          : (product.dataset.visibility = "hidden");
        break;
    }
  });
}

function initEverthingBack() {
  const allProductsArrFromLocalStorage = interactWithLocalStorage("Get");
  if (allProductsArrFromLocalStorage == null) return;
  allProductsArr = allProductsArrFromLocalStorage;
  allProductsArr.forEach((product) => {
    const newProductElement = `
    <tr>
      <td class="id">${product.ID}</td>
      <td class="title">${product.name}</td>
      <td class="price">${product.price}</td>
      <td class="taxes">${product.taxes}</td>
      <td class="ads">${product.ads}</td>
      <td class="discount">${product.discount}</td>
      <td class="category">${product.category}</td>
      <td class="total">${product.totalPrice}</td>
      <td class="manipulate-product-spot">
          <button class="btn-edit-product" title="Edit the product">
              <svg
                  fill="#fff"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                  d="M18.111,2.293,9.384,11.021a.977.977,0,0,0-.241.39L8.052,14.684A1,1,0,0,0,9,16a.987.987,0,0,0,.316-.052l3.273-1.091a.977.977,0,0,0,.39-.241l8.728-8.727a1,1,0,0,0,0-1.414L19.525,2.293A1,1,0,0,0,18.111,2.293ZM11.732,13.035l-1.151.384.384-1.151L16.637,6.6l.767.767Zm7.854-7.853-.768.767-.767-.767.767-.768ZM3,5h8a1,1,0,0,1,0,2H4V20H17V13a1,1,0,0,1,2,0v8a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V6A1,1,0,0,1,3,5Z"
                  />
              </svg>
              Edit
          </button>
      </td>
      <td class="manipulate-product-spot">
          <button class="btn-delete-product" title="Delete the product">
              <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                  fill="#fff"
                  d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                  />
              </svg>
              Delete
          </button>
      </td>
  </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", newProductElement);
  });

  productsCounter = allProductsArrFromLocalStorage.length;
  allProductsNum.textContent = `(${productsCounter})`;
}

["click", "input"].forEach((event) => {
  priceInput.addEventListener(event, calculateTotalPrice);
  taxesInput.addEventListener(event, calculateTotalPrice);
  adsInput.addEventListener(event, calculateTotalPrice);
  discountInput.addEventListener(event, calculateTotalPrice);
});

btnCreateProduct.addEventListener("click", (event) => {
  event.preventDefault();
  const productInfo = [
    titleInput.value,
    priceInput.value,
    taxesInput.value,
    adsInput.value,
    discountInput.value,
    countInput.value,
    categoryInput.value,
  ];
  createNewProduct(false, productInfo);
});

searchOptionsSpot.addEventListener("click", (event) => {
  const clickedSpot = event.target.closest(".search-option");
  if (clickedSpot == null) return;
  allSearchOptions.forEach((option) => (option.dataset.state = "unchecked"));
  clickedSpot.dataset.state = "checked";
  if (searchInput.value !== "")
    searchForProduct(clickedSpot.querySelector("input").value);
});

searchInput.addEventListener("input", () => {
  const checkedRadioParent = allSearchOptions.find(
    (option) => option.dataset.state === "checked"
  );
  if (searchInput.value === "") return searchForProduct("normal");
  searchForProduct(checkedRadioParent.querySelector("input").value);
});

window.addEventListener("load", initEverthingBack);
