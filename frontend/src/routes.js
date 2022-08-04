import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage"
import RegisterPage from "./components/RegisterPage"
import LoginPage from "./components/LoginPage"
import PlansDisplay from "./components/PlansDisplay"
import CheckoutPage from "./components/CheckoutPage"
import RedirectPage from "./components/RedirectPage"
import SubscriptionPage from "./components/SubscriptionPage"
const routes = [
    {
        path : "/",
        name : "Home",
        component  : HomePage
    },
    {
        path : "/register",
        name : "Register",
        component  : RegisterPage  
    },
    {
        path : "/login",
        name : "login",
        component  : LoginPage  
    },
    {
        path : '/account',
        name : 'account',
        component : PlansDisplay
    },
    {
        path : '/checkout/:plan/:rec',
        name : 'checkout',
        component : CheckoutPage
    },
    {
        path : '/redirect',
        name : 'redirect',
        component : RedirectPage
    },
    {
        path : '/subscription',
        name : 'subscription',
        component : SubscriptionPage
    }
]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes
})

export default router