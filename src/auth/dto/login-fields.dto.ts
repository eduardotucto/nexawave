import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginFieldsDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
    email: string

  @IsNotEmpty({ message: 'Password is required' })
    password: string
}
