export type TypeAuth = {
  _id: string
  fullName: string
  email: string
  password: string
  token: string
  profilePic: string
}

export type PartialAuth = Partial<TypeAuth>
