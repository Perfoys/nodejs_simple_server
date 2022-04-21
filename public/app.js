const toCurrency = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

const $cart = document.querySelector(".cart");
if ($cart) {
  $cart.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;

      fetch("/cart/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((cart) => {
          if (cart.courses.length) {
            const html = cart.courses.map((element) => {
              return `
                                <tr>
                                    <td>${element.title}</td>
                                    <td>${element.count}</td>
                                    <td>
                                        <button class="btn btn-primary js-remove" data-id="${element.id}">Delete</button>
                                    </td>
                                </tr>
                            `;
            });
            $cart.querySelector("tbody").innerHTML = html;
            $cart.querySelector(".price").innerHTML = toCurrency(cart.price);
          } else {
            $cart.innerHTML = "<p>Cart is empty</p>";
          }
        });
    }
  });
}
