export const checkIfUserIsSubscribed = () => {
  // make an API call to our backend to check if user is subscribed
  return null;
};

export const subscribeUser = () => {
  // make an API call to our backend to subscribe user
};

//

// on the mainpage, lets make a backend call asking about user's push permissions - pushNotiService.getUserPreference()
// this will give us a boolean / undefined
// if unset, lets make a component which asks the user for permission to send notifications
// lets save their answer in the backend - pushNotiService.setUserPreference()
// if pushNotiService.getUserPreference() returns true, lets listen to pushevents we get from backend
// lets implement serviceworker's getSubscription, subscribe and permissionState
// https://w3c.github.io/push-api/#abstract
