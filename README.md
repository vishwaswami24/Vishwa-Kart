# Ekart Ecommerce static Website 

-`Login page` - User authentication

-`Register page` - User create his account with ekart application

-`Index page` -  Home page of ekart application with list of product cards and their different sortings

-`About page` - Give overview of the web application

-`Product_details page` - Give detailed information about the specific product

-`Placeorder page` - Used to place the order 

-`Cart page` - Used to add products in the cart

-`Contact page` - Consists location, address, contact and email 

## Running this project

To get this project up and running you should start by having Python installed on your computer. It's advised you create a virtual environment to store your projects dependencies separately. You can install virtualenv with
```bash
pip install virtualenv
```
Clone or download this repository and open it in your editor of choice. In a terminal (mac/linux) or windows terminal, run the following command in the base directory of this project
```bash
virtualenv env
```
### **Clone the Repository**

After installing the prerequisite files just clone the project:
```bash
git clone https://github.com/vishwaswami24/ekart.git
```
That will create a new folder `env` in your project directory. Next activate it with this command on mac/linux:
```bash
source env/bin/active
```
Then install the project dependencies with
```bash
pip install -r requirements.txt
```
Now you can run the project with this command
```bash
python manage.py runserver
```


