# Early-Sunrise-SYSDES

## General information

### Login credentials 

#### Staff/Owner
Username: staffadmin  
Password: admin 

#### VIP  
Username: vipadmin  
Password: admin 

### Generate documentation

```
make doc
```

## Features

### Customer

As a customer it is possible to order products by looking at the menu that is displayed directly when the website is opened. There you can see the name and price of a product, and also a picture showing the product.  
You can choose to filter the products shown on screen by pressing the categories displayed above, or under the menu depending on the platform used when visiting our platform. With the buttons to the left of the products you can choose to further narrow down your search.  
To add a product to the shopping cart you can either choose to press the button that tells you to buy the product, or you can drag the product and drop it in the shopping cart on the right hand side of the screen.  
By clicking on the product in the menu, information will be shown about that product such as origin, and allergens. You can also choose to buy the product from within the window with the information.  
If the customer has misclicked or changes their mind on what they want to order they can either remove the product by pressing the "X", or undo their action of putting the product in the shopping cart by pressing the white arrows next to the categories.  
When the products have been chosen the customer will then have to choose which table they sit at, or if they are ordering at the bar. Then they are able to press the button that confirms their order and it is then received by the bartenders.  

### VIP

VIP customers have all the functionaities of a normal customer, with the additions that they can log in/out at the table to place an order to have the product  served at the table,  
or code to the combination lock to fetch special beer/drink themselves from fridge or bar.  
When they are signed in they can also:  
See their account balance  
Order and Pay from their account  

### Bartender

Bartenders have the same functionalities as regular customers as well as the following:  
As a bartender you are able to sign in using the staffadmin credentials above.  
In the product view you can see its stock, refill the stock, remove the product and change its price.  
You are able to notify the security using an easily accessible button in the top menu.  
In bartender tab you can check the current orders, you can manage the orders by either changing them, removing them or completing them.   

### Manager

The manager has the same credentials as a bartender, meaning there is no distinction between the two in our login. However the functionalities the qualify for this role are the following:  
Like the bartender you are able to change the stock by removing items, revising amounts, refills removing items from the menu.  
In the manager menu you are able to:  
Add new products to the stock.  
See products that are low in stock.  
See the income and expenses of the bar.  
Add balance to VIP customers.  
