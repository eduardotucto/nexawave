import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { AuthService } from '@/auth/application/auth.service'
import { StorageTypeEnum } from '@/modules/financial-resources/dto'
import { FinancialResourcesCrudService } from '@/modules/financial-resources/application'
import { TransactionsCrudService } from '@/modules/transactions/application'
import { EntryType } from '@/modules/outstanding/domain/outstanding.entity'
import { OutstandingCrudService } from '@/modules/outstanding/application'
import { BudgetsCrudService } from '@/modules/budget/application'

enum Currency { USD = 'USD', PEN = 'PEN' }
enum Limit { UNO = 1000, DOS = 2000, TRES = 3000, CUATRO = 4000 }

@Injectable()
export class SeedService {
  constructor (
    private readonly authService: AuthService,
    private readonly financialResourcesCrudService: FinancialResourcesCrudService,
    private readonly transactionsCrudService: TransactionsCrudService,
    private readonly outstandingCrudService: OutstandingCrudService,
    private readonly budgetsCrudService: BudgetsCrudService
  ) {}

  async seedUsers () {
    const users = [...Array(2)].map(_ => {
      return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'password',
        phone: `${faker.number.int({ min: 900000000, max: 999999999 })}`

      }
    })

    const savedUsers = await Promise.all(users.map(user => this.authService.signUp(user)))
    const savedUsersIds = savedUsers.map(user => user.id)

    await Promise.all([
      this.seedFinancialResources(savedUsersIds),
      this.seedOutstandings(savedUsersIds),
      this.seedBudgets(savedUsersIds)
    ])
  }

  async seedFinancialResources (usersId: string[]) {
    const financialResourcesGrouped = usersId.map(id => {
      const financialResourcesPerId = [...Array(3)].map(_ => {
        const type = faker.helpers.enumValue(StorageTypeEnum)
        let contribution = faker.number.binary() === '1'
        let creditLimit = 0
        if (type === StorageTypeEnum.Credit) {
          contribution = false
          creditLimit = faker.helpers.enumValue(Limit)
        }

        const randomNumber = Math.floor(Math.random() * 90) + 10

        return {
          label: `${faker.finance.accountName()} ${randomNumber}`,
          type,
          creditLimit,
          currency: faker.helpers.enumValue(Currency),
          balance: parseFloat(faker.finance.amount({ min: 0, max: 1000, dec: 2 })),
          contribution,
          userId: id
        }
      })

      return financialResourcesPerId
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const savedFinancialResources = await Promise.all(financialResourcesGrouped.flat().map(financialResource => {
      const { userId, ...data } = financialResource
      return this.financialResourcesCrudService.create(data, userId)
    }))

    // const savedFinancialResourcesIds = savedFinancialResources.map(financialResource => financialResource.id)
    // await this.seedTransactions(savedFinancialResourcesIds)
  }

  async seedTransactions (financialResourcesIds: string[]) {
    const transactionsGrouped = financialResourcesIds.map(id => {
      const transactionsPerId = [...Array(5)].map(_ => {
        return {
          transactionDate: faker.date.recent({ days: 4 }),
          description: faker.finance.transactionType(),
          amount: parseFloat(faker.finance.amount({ min: 0, max: 100, dec: 2 })),
          financialResourceId: id
        }
      })
      return transactionsPerId
    })

    return Promise.all(transactionsGrouped.flat().map(transaction => this.transactionsCrudService.create(transaction)))
  }

  async seedOutstandings (usersId: string[]) {
    const outstandingsGrouped = usersId.map(id => {
      const outstandingsPerId = [...Array(4)].map(_ => {
        const randomNumber = Math.floor(Math.random() * 90) + 10

        const type = faker.helpers.enumValue(EntryType)
        let isRecurring = faker.number.binary() === '1'
        let paymentDay = null

        if (type === EntryType.PAYMENT) isRecurring = false
        if (isRecurring) paymentDay = faker.number.int({ min: 0, max: 28 })

        return {
          description: `${faker.finance.transactionType()} ${randomNumber}`,
          amount: faker.number.int({ min: 0, max: 100 }),
          isCompleted: faker.number.binary() === '1',
          type: faker.helpers.enumValue(EntryType),
          isRecurring,
          paymentDay,
          userId: id
        }
      })
      return outstandingsPerId
    })

    await Promise.all(outstandingsGrouped.flat().map(outstanding => {
      const { userId, ...data } = outstanding
      return this.outstandingCrudService.create(data, userId)
    }))
  }

  async seedBudgets (usersId: string[]) {
    const budgetsGrouped = usersId.map(id => {
      const budgetsPerId = [
        { userId: id, name: 'Necesidades', amount: 500 },
        { userId: id, name: 'Deseos', amount: 300 },
        { userId: id, name: 'Ahorros', amount: 200 }
      ]
      return budgetsPerId
    })

    await Promise.all(budgetsGrouped.flat().map(budget => {
      const { userId, ...data } = budget
      return this.budgetsCrudService.create(data, userId)
    }))
  }
}
