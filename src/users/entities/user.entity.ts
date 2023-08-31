import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column({ nullable: true })
    phone?: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date

  @Column({ nullable: true })
    authStrategy?: string
}
