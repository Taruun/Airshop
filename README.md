# Airshop
Full stack E-commerce app build with Next.js and strapi. Integrated stripe for payments and auth0 for login.  
#### Due to heroku billing updates live mode is not working for now.

### Built with Next Js, Strapi, Framer Motion, Styled-components, Stripe and Auth0.

### Functionalities

- [x] Create products dynamically using strapi
- [x] Checkout with stripe with additional features
- [x] Animations with framer motion
- [x] Safe and quick google authentication

### Stack

- Language : [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- Frontend : [Next Js](https://nextjs.org/)
- Backend : [Strapi](https://strapi.io/)
- Hosting - [Vercel](https://vercel.com/) [Heroku](https://dashboard.heroku.com/)
- Payments: [Stripe](https://stripe.com/en-in)
- Authentication: [Auth0](https://auth0.com/)
- Optimization : [Cloudinary](https://cloudinary.com/)
- Fonts - [Google Fonts](https://fonts.google.com/)
- Style : [Styled Components](https://styled-components.com/)
- Animation : [Framer Motion](https://www.framer.com/motion/)
- Toast: [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)


### Installation

####  Fork The Repo 

Click on the Right Side of the Top Bar to After the Watch button. <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/GitHub_Fork_Button.png" width="120px" />

#### OR

#### Clone

- Clone this repo with url

```shell
git clone https://github.com/Taruun/Airshop.git
```

##### Setup

> Install npm dependencies using npm install

```shell
cd Airshop && npm install
```

> Set up environment Variables.

> Create a .env file in the root directory.



```.env [Frontend] 
NEXT_PUBLIC_BACKEND_API='http://localhost:1337/graphql'
BASE_URL='http://localhost:3000'
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
NEXT_PUBLIC_STRIPE_SECRET_KEY="NEXT_PUBLIC_STRIPE_SECRET_KEY"
AUTH0_CLIENT_SECRET="AUTH0_CLIENT_SECRET"
AUTH0_CLIENT_ID="AUTH0_CLIENT_ID"
AUTH0_ISSUER_BASE_URL="AUTH0_ISSUER_BASE_URL"
AUTH0_SECRET="AUTH0_SECRET"
AUTH0_BASE_URL="http://localhost:3000"

```
Let's Run this command for dev

```shell
npm run dev
--or--
yarn dev
```

<!-- ### Screenshots -->
 ### Landing Page:
 <img src="https://raw.githubusercontent.com/Taruun/imges/main/MacBook%20Air%20-%201.png" />
 
 ### Product Details:
 <img src="https://raw.githubusercontent.com/Taruun/imges/main/MacBook%20Air%20-%202.png" />
 
 ### Cart Items:
 <img src="https://raw.githubusercontent.com/Taruun/imges/main/MacBook%20Air%20-%203.png" />

 <img src="https://raw.githubusercontent.com/Taruun/imges/main/MacBook%20Air%20-%204.png" />
 
 ### Stripe Payment Option:
 <img src="https://raw.githubusercontent.com/Taruun/imges/main/MacBook%20Air%20-%205.png" />
 
 ### Success Page:
 <img src="https://raw.githubusercontent.com/Taruun/imges/main/MacBook%20Air%20-%206.png" />
 
 ### Order Details:
 <img src="https://raw.githubusercontent.com/Taruun/imges/main/MacBook%20Air%20-%207.png" />

