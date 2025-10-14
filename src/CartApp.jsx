import { CartView } from "./components/CartView"
import { CatalogView } from "./components/CatalogView"
import { Navbar } from "./components/Navbar"
import { Carrusel } from "./components/Carrusel"

export const CartApp = () => {

    return (
        <>

            <nav>
                <Navbar/>
            </nav>

            <div>
                <Carrusel/>
            </div>
            

            <div className="container">


                <h1 class="productos">Recomendado para ti</h1>
                <CatalogView />

                <div className="my-4 w-50">
                    <CartView />
                </div>

            </div>
        </>
    )
}