import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be string' })
  @MaxLength(150, { message: 'Name is too long' })
    name: string

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100, {
    message: 'Email is too long'
  })
    email: string

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
    password: string

  @IsOptional()
  @IsString({ message: 'Phone must be string' })
  @MaxLength(50, {
    message: 'Phone is too long'
  })
    phone?: string

  @IsString({ message: 'AuthStrategy must be string' })
  @IsOptional()
    authStrategy?: string
}
