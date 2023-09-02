import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsOptional() // Esto permite que el campo sea opcional
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
    email: string

  @IsNotEmpty({ message: 'Password is required' })
    password: string

  @IsOptional()
    phone?: string

  @IsOptional()
    authStrategy?: string
}
