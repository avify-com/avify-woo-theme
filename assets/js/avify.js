import Checkout from "./components/checkout";
import Animations from "./components/animations";

(function () {
    window.addEventListener("load", (event) => {
        new Checkout();

        new Animations();
    });
})();
