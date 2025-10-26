export type TypeAuth = {
  _id: string
  fullName: string
  email: string
  password: string
  token: string
  profilePic: string
}

export type PartialAuth = Partial<TypeAuth>
export type PartialFormAuth = Partial<Pick<TypeAuth, 'email' | 'password'| 'fullName'>>
