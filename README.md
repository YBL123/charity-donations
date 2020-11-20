# charity-donations

## To run this app:

```terminal
npm i in root and frontend
```

```terminal
npm run dev
```

## App Description: 

This app takes card details off a potential donor. It then creates a donor which is like a 'user' in the database, whilst also creating a donation period.

If a donor has been created, the app will mimick a 'logged in user' by storing the donor id in the cookies for 30 days. Therefore every time the user opens the url, the app will take them directly to the 'logged in' section which is the 'create a new period' and 'view my donations' section. 
There is also an option to log out which clears all cookies.

I chose this method becasue the architecture is such that the donation should be made over a period of 10 days. Therefore in order for the user to be able to view their donations during this period, they need to be 'logged in' and their details saved.

The architecture of the back end is such that a donor can be created and a period for a donor can be created. A donation can not be created on its own. A donation can only be created using a mock cron job webhook that will send a request every hour. This request will query the database for all active periods and check if no donations have been made on the day. 

I chose this method because a donor can create multiple donations periods, it's versatile and immutable.

## Notes: 
* The database is a remote database hosted by MongoDB Atlas. The credentials in the dotenv file.
* There is errorhandling on the back end and front end.
* There is a customised middleware in the back end to handle asynchronious requests.
* There is a 'Prefill Payment Details' button for ease of testing


## Built With: 
### Front end:
* React
* React Hooks
* Cookies
* Scss
* Axios

### Back end:
* Node.js
* MongoDB
* Express
* Moment js
* Cors
* dotenv
* Cron job Webhook (mock)


## Future Improvements:
* Incorporate Stripe for payments
* Implement a secure login and logout system
* More in-depth error handling for forms
* Email notifications 
* Improved CSS and bespoke UI elements