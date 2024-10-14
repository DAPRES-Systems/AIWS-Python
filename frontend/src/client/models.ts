export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type ItemCreate = {
  id: string
  owner_id: string
  title: string
  description?: string | null
  aiwscode: string
  name: string
  location: string
  expiry?: string | null
  stk: number
  mtk: number
  lot?: string | null
  serial?: string | null
  notes?: string | null
}

export type ItemPublic = {
  id: string
  owner_id: string
  title: string
  description?: string | null
  aiwscode: string
  name: string
  location: string
  expiry?: string | null
  stk: number
  mtk: number
  lot?: string | null
  serial?: string | null
  notes?: string | null
}


export type ItemUpdate = {
  owner_id: string| null
  title: string| null
  description?: string | null
  aiwscode: string| null
  name: string| null
  location: string| null
  expiry?: string | null
  stk: number| null
  mtk: number| null
  lot?: string | null
  serial?: string | null
  notes?: string | null
}

export type ItemsPublic = {
  data: Array<ItemPublic>
  count: number
}

export type Message = {
  message: string
}

export type NewPassword = {
  token: string
  new_password: string
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
