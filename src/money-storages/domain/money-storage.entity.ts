import { User } from 'src/users/domain/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class MoneyStorage {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @ManyToOne(() => User, user => user.moneyStorages)
    user: User

  @Column()
    userId: string

  @Column({ unique: true })
    label: string

  @Column({
    type: 'enum',
    enum: ['Debit', 'Credit', 'Cash', 'Investment', 'Other']
  })
    type: string

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
    balance: number

  @Column({ type: 'boolean', default: true })
    contribution: boolean

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date
}
