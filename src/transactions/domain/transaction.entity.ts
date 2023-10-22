import { nanoid } from 'nanoid'
import { MoneyStorage } from 'src/money-storages/domain/money-storage.entity'
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Transaction {
  @PrimaryColumn('varchar', { unique: true, length: 21 })
    id: string

  @Column({ type: 'timestamp with time zone' })
    transactionDate: Date

  @Column('varchar', { nullable: true, length: 150 })
    description: string

  @Column('decimal', { precision: 8, scale: 2 })
    amount: number

  @ManyToOne(() => MoneyStorage, moneyStorage => moneyStorage.transactions)
    moneyStorage: MoneyStorage

  @Column('varchar', { length: 21 })
    moneyStorageId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @BeforeInsert()
  generateId () {
    this.id = nanoid()
  }
}
