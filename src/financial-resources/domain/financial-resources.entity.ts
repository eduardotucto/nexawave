import { User } from 'src/users/domain/user.entity'
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { nanoid } from 'nanoid'
import { Transaction } from 'src/transactions/domain/transaction.entity'

@Entity()
export class FinancialResource {
  @PrimaryColumn('varchar', { unique: true, length: 21 })
    id: string

  @Column('varchar', { length: 50 })
    label: string

  @Column({
    type: 'enum',
    enum: ['Cash', 'Bank account', 'Credit', 'Other']
  })
    type: string

  @Column('varchar', { length: 3 })
    currency: string

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
    balance: number

  @Column({ type: 'boolean', default: true })
    contribution: boolean

  @Column('varchar', { length: 21 })
    userId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @ManyToOne(() => User, user => user.financialResources)
    user: User

  @OneToMany(() => Transaction, transaction => transaction.financialResource)
    transactions: Transaction[]

  @BeforeInsert()
  generateId () {
    this.id = nanoid()
  }
}
