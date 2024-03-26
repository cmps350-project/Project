const users = [
    {
      username: "user1",
      password: "password1",
      email: "user1@example.com",
      currentBasket: [1, 3],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
      username: "user2",
      password: "password2",
      email: "user2@example.com",
      currentBasket: [2, 4],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
      username: "user3",
      password: "password3",
      email: "user3@example.com",
      currentBasket: [],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
      username: "user4",
      password: "password4",
      email: "user4@example.com",
      currentBasket: [],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
      username: "user5",
      password: "password5",
      email: "user5@example.com",
      currentBasket: [],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    }
  ]

 export function getUsers(){
    return users
}