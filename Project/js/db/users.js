const users = [
    {
      username: "ahmed_omar",
      password: "password1",
      fullName: "Ahmed Omar",
      email: "user1@example.com",
      type: "seller",
      currentBasket: [1, 3],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
      username: "sara_ali",
      password: "password2",
      email: "user2@example.com",
      fullName: "Sara Ali",
      type: "customer",
      currentBasket: [2, 4],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
      username: "john_smith",
      password: "password3",
      email: "user3@example.com",
      fullName: "John Smith",
      type: "seller",
      currentBasket: [],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
      username: "jane_brown",
      password: "password4",
      email: "user4@example.com",
      fullName: "Jane Brown",
      type: "customer",
      currentBasket: [],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
      username: "maryam_amer",
      password: "password5",
      email: "user5@example.com",
      fullName: "Maryam Amer",
      type: "admin",
      currentBasket: [],
      purchaseHistory: [],
      currentSelling: [],
      soldHistory: []
    },
    {
        username: "saif_osama",
        password: "password6",
        email: "user6@example.com",
        fullName: "Saif Osama",
        type: "admin",
        currentBasket: [],
        purchaseHistory: [],
        currentSelling: [],
        soldHistory: []
      }
  ]

 export function getUsers(){
    return users
}