import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { NumberTransformer } from '@/utils/transformer'
import { User } from '@/modules/users/domain/user.entity'
import { Transaction } from '@/modules/transactions/domain/transaction.entity'
import { nanoid } from 'nanoid'

@Entity()
export class Budget {
  @PrimaryColumn('varchar', { unique: true, length: 21 })
    id: string

  @Column('varchar', { length: 50 })
    name: string

  @Column('decimal', { precision: 10, scale: 2, transformer: new NumberTransformer() })
    amount: number

  @Column('decimal', { precision: 10, scale: 2, transformer: new NumberTransformer() })
    balance: number

  @Column('varchar', { length: 21 })
    userId: string

  @Column('varchar', { length: 21, nullable: true })
    budgetId?: string

  @ManyToOne(() => User, user => user.financialResources)
    user: User

  @ManyToOne(() => Budget, budget => budget.budgets) // Cada presupuesto puede tener un solo presupuesto padre
    budget: Budget

  @OneToMany(() => Budget, budget => budget.budget) // Un presupuesto puede tener muchos sub presupuestos
    budgets: Budget[]

  @OneToMany(() => Transaction, transaction => transaction.budgetId)
    transactions: Transaction[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @BeforeInsert()
  generateId () {
    this.id = nanoid()
  }
}
