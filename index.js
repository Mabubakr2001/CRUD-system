const titleInput = document.querySelector(".input-title");
const priceInput = document.querySelector(".input-price");
const taxesInput = document.querySelector(".input-taxes");
const adsInput = document.querySelector(".input-ads");
const discountInput = document.querySelector(".input-discount");
const totalPriceSpot = document.querySelector(".total-price-create-amount");
const countInput = document.querySelector(".input-count");
const categoryInput = document.querySelector(".input-category");
const btnCreateProduct = document.querySelector(".btn-create-product");
const btnUpdateProduct = document.querySelector(".btn-update-product");
const tableBody = document.querySelector(".products-table-body");
const searchInput = document.querySelector(".search-input");
const searchOptionsSpot = document.querySelector(".search-options");
const allSearchOptions = Array.from(
  document.querySelectorAll(".search-option")
);
const allProductsNum = document.querySelector(".all-products-num");
const btnEditProduct = document.querySelector(".btn-edit-product");
const btnDeleteProduct = document.querySelector(".btn-delete-product");
const btnDeleteAllProducts = document.querySelector(".delete-all-btn");
const overlay = document.querySelector(".overlay");
const deletionWindow = document.querySelector(".deletion-window");
const btnApplyDeleteSingleProduct = document.querySelector(".btn-yes-single");
const btnApplyDeleteAllProducts = document.querySelector(".btn-yes-all");
const btnUndo = document.querySelector(".btn-no");

let allProductsArr = [];
let productsCounter = 0;
let productID;

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
  totalPriceSpot.textContent = "";
}

function interactWithLocalStorage(interactMethod) {
  const interactMethodLower = interactMethod.toLowerCase();
  if (interactMethodLower === "set")
    return localStorage.setItem("allProducts", JSON.stringify(allProductsArr));
  if (interactMethodLower === "get")
    return JSON.parse(localStorage.getItem("allProducts"));
}

function createNewProduct(fromLocalStorage = false, ...productProperties) {
  const [
    productID,
    productName,
    productPrice,
    productTaxes,
    productAds,
    productDiscount,
    productTotalPrice,
    productCount,
    productCategory,
  ] = productProperties;

  productsCounter++;
  allProductsNum.textContent = `(${productsCounter})`;

  const markup = `
  <tr>
    <td class="id">${productID}</td>
    <td class="title">${productName}</td>
    <td class="price">${productPrice}</td>
    <td class="taxes">${productTaxes !== "" ? productTaxes : "0"}</td>
    <td class="ads">${productAds !== "" ? productAds : "0"}</td>
    <td class="discount">${productDiscount !== "" ? productDiscount : "0"}</td>
    <td class="count">${productCount} ${
    +productCount === 1 ? "item" : "items"
  }</td>
    <td class="category">${
      productCategory !== "" ? productCategory : "No category"
    }</td>
    <td class="total">${productTotalPrice}</td>
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
  tableBody.insertAdjacentHTML("beforeend", markup);

  if (!fromLocalStorage) {
    allProductsArr.push({
      ID: productID,
      name: productName,
      price: productPrice,
      taxes: productTaxes !== "" ? productTaxes : "0",
      ads: productAds !== "" ? productAds : "0",
      discount: productDiscount !== "" ? productDiscount : "0",
      count: productCount,
      category: productCategory,
      totalPrice: productTotalPrice,
    });
    interactWithLocalStorage("Set");
    clearProductInputs();
    totalPriceSpot.textContent = "";
  }
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
        product.dataset.state = "visible";
        break;
      case "id":
        const id = product.querySelector(".id").textContent;
        id.includes(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
      case "title":
        const title = product.querySelector(".title").textContent;
        title.includes(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
      case "price":
        const price = product.querySelector(".price").textContent;
        price.startsWith(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
      case "taxes":
        const taxes = product.querySelector(".taxes").textContent;
        taxes.startsWith(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
      case "ads":
        const ads = product.querySelector(".ads").textContent;
        ads.startsWith(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
      case "discount":
        const discount = product.querySelector(".discount").textContent;
        discount.startsWith(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
      case "total":
        const total = product.querySelector(".total").textContent;
        total.startsWith(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
      case "count":
        const count = product.querySelector(".count").textContent;
        count.startsWith(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
      case "category":
        const category = product.querySelector(".category").textContent;
        category.includes(searchQuery)
          ? (product.dataset.state = "visible")
          : (product.dataset.state = "hidden");
        break;
    }
  });
}

function editTheProduct(productID) {
  const allCreatedProducts = Array.from(tableBody.querySelectorAll("tr"));
  const targetProductElement = allCreatedProducts.find(
    (product) => product.querySelector(".id").textContent === productID
  );
  const targetActualProduct = allProductsArr.find(
    (actualProduct) => actualProduct.ID === productID
  );

  if (targetProductElement == null || targetActualProduct == null) return;

  targetProductElement.querySelector(".title").textContent = titleInput.value;
  targetProductElement.querySelector(".price").textContent = priceInput.value;
  targetProductElement.querySelector(".taxes").textContent =
    taxesInput.value !== "" ? taxesInput.value : "0";
  targetProductElement.querySelector(".ads").textContent =
    adsInput.value !== "" ? adsInput.value : "0";
  targetProductElement.querySelector(".discount").textContent =
    discountInput.value !== "" ? discountInput.value : "0";
  targetProductElement.querySelector(".total").textContent =
    totalPriceSpot.textContent;
  targetProductElement.querySelector(".count").textContent = `${
    countInput.value
  } ${+countInput.value === 1 ? "item" : "items"}`;
  targetProductElement.querySelector(".category").textContent =
    categoryInput.value !== "" ? categoryInput.value : "No category";

  targetActualProduct.name = titleInput.value;
  targetActualProduct.price = priceInput.value;
  targetActualProduct.taxes = taxesInput.value !== "" ? taxesInput.value : "0";
  targetActualProduct.ads = adsInput.value !== "" ? adsInput.value : "0";
  targetActualProduct.discount =
    discountInput.value !== "" ? discountInput.value : "0";
  targetActualProduct.totalPrice = totalPriceSpot.textContent;
  targetActualProduct.count = countInput.value;
  targetActualProduct.category =
    categoryInput.value !== "" ? categoryInput.value : "No category";

  interactWithLocalStorage("Set");
  clearProductInputs();

  btnCreateProduct.dataset.state = "visible";
  btnUpdateProduct.dataset.state = "hidden";
}

function deleteTheProduct(productID) {
  const allCreatedProducts = Array.from(tableBody.querySelectorAll("tr"));
  const targetProductElement = allCreatedProducts.find(
    (product) => product.querySelector(".id").textContent === productID
  );
  const targetActualProduct = allProductsArr.findIndex(
    (actualProduct) => actualProduct.ID === productID
  );

  if (targetActualProduct === -1 || targetProductElement == null) return;

  targetProductElement.remove();
  allProductsArr.splice(targetActualProduct, 1);

  allProductsArr.length === 0
    ? localStorage.clear()
    : interactWithLocalStorage("Set");

  productsCounter--;
  allProductsNum.textContent = `(${productsCounter})`;

  manipulateDeletionView("Hide");
}

function deleteAllProducts() {
  const allCreatedProducts = Array.from(tableBody.querySelectorAll("tr"));
  allCreatedProducts.forEach((product) => product.remove());
  allProductsArr.splice(0);
  localStorage.clear();
  manipulateDeletionView("Hide");
  productsCounter = 0;
  allProductsNum.textContent = `(${productsCounter})`;
}

function manipulateDeletionView(state) {
  const stateLower = state.toLowerCase();
  if (stateLower === "show") {
    deletionWindow.dataset.state = "visible";
    overlay.dataset.state = "visible";
  }
  if (stateLower === "hide") {
    deletionWindow.dataset.state = "hidden";
    overlay.dataset.state = "hidden";
  }
}

function initEverthingBack() {
  const allProductsArrFromLocalStorage = interactWithLocalStorage("Get");

  if (
    allProductsArrFromLocalStorage == null ||
    allProductsArrFromLocalStorage.length === 0
  )
    return;

  allProductsArr = allProductsArrFromLocalStorage;

  allProductsArr.forEach((product) =>
    createNewProduct(
      true,
      product.ID,
      product.name,
      product.price,
      product.taxes,
      product.ads,
      product.discount,
      product.totalPrice,
      product.count,
      product.category
    )
  );
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

  if (titleInput.value === "")
    return showError(
      "Please fill out all required fields (Title, Price, Count)!"
    );
  if (priceInput.value === "" || +priceInput.value === 0)
    return showError(
      "Please fill out all required fields (Title, Price, Count)!"
    );
  if (countInput.value === "" || +countInput.value === 0)
    return showError(
      "Please fill out all required fields (Title, Price, Count)!"
    );

  const randomProductID = Math.floor(Math.random() * 100000000).toString();

  createNewProduct(
    false,
    randomProductID,
    titleInput.value,
    priceInput.value,
    taxesInput.value,
    adsInput.value,
    discountInput.value,
    totalPriceSpot.textContent,
    countInput.value,
    categoryInput.value
  );
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

tableBody.addEventListener("click", (event) => {
  const clickedSpot = event.target;
  const correspondingProductElement = clickedSpot.closest("tr");

  if (correspondingProductElement == null) return;

  const targetProduct = allProductsArr.find(
    (product) =>
      product.ID ===
      correspondingProductElement.querySelector(".id").textContent
  );

  if (clickedSpot.classList.contains("btn-edit-product")) {
    btnCreateProduct.dataset.state = "hidden";
    btnUpdateProduct.dataset.state = "visible";
    titleInput.value = targetProduct.name;
    priceInput.value = targetProduct.price;
    taxesInput.value = targetProduct.taxes !== "0" ? targetProduct.taxes : "";
    adsInput.value = targetProduct.ads !== "0" ? targetProduct.ads : "";
    discountInput.value =
      targetProduct.discount !== "0" ? targetProduct.discount : "";
    totalPriceSpot.textContent = targetProduct.totalPrice;
    countInput.value = targetProduct.count;
    categoryInput.value =
      targetProduct.category !== "No category" ? targetProduct.category : "";
  }
  if (clickedSpot.classList.contains("btn-delete-product")) {
    manipulateDeletionView("Show");
    btnApplyDeleteAllProducts.dataset.state = "hidden";
    btnApplyDeleteSingleProduct.dataset.state = "visible";
  }

  productID = targetProduct.ID;
});

btnUpdateProduct.addEventListener("click", (event) => {
  event.preventDefault();
  if (titleInput.value === "")
    return showError(
      "Please fill out all required fields (Title, Price, Count)!"
    );
  if (priceInput.value === "" || +priceInput.value === 0)
    return showError(
      "Please fill out all required fields (Title, Price, Count)!"
    );
  if (countInput.value === "" || +countInput.value === 0)
    return showError(
      "Please fill out all required fields (Title, Price, Count)!"
    );
  editTheProduct(productID);
});

btnDeleteAllProducts.addEventListener("click", () => {
  if (allProductsArr.length === 0)
    return showError("There are no products to delete!");
  manipulateDeletionView("Show");
  btnApplyDeleteSingleProduct.dataset.state = "hidden";
  btnApplyDeleteAllProducts.dataset.state = "visible";
});

btnApplyDeleteSingleProduct.addEventListener("click", () =>
  deleteTheProduct(productID)
);

btnApplyDeleteAllProducts.addEventListener("click", deleteAllProducts);

btnUndo.addEventListener("click", () => manipulateDeletionView("Hide"));

overlay.addEventListener("click", () => manipulateDeletionView("Hide"));

window.addEventListener("keydown", ({ key }) => {
  if (key === "Escape" && deletionWindow.dataset.state === "visible")
    manipulateDeletionView("Hide");
});

window.addEventListener("load", initEverthingBack);
