import { User } from 'src/users/domain/user.entity'
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { nanoid } from 'nanoid'
import { Transaction } from 'src/transactions/domain/transaction.entity'

@Entity()
export class MoneyStorage {
  @PrimaryColumn('varchar', { unique: true, length: 21 })
    id: string

  @Column('varchar', { length: 50 })
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

  @Column('varchar', { length: 21 })
    userId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date

  @ManyToOne(() => User, user => user.moneyStorages)
    user: User

  @OneToMany(() => Transaction, transaction => transaction.moneyStorage)
    transactions: Transaction[]

  @BeforeInsert()
  generateId () {
    this.id = nanoid()
  }
}
