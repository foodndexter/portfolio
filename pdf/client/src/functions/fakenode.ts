const sampleUser: User[] = [{ id: "testuser00700", password: "123123", cart: [], basket: [], lectures: [], payments: [] }]

export const findById = (id: string) => {
  const isUser = sampleUser.find((user) => user.id === id)
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      isUser && resolve(isUser)
    }, 500)
  })
}
