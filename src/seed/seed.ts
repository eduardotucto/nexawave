import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/modules/app/app.module'
import { SeedService } from './seed.service'

async function bootstrap () {
  const app = await NestFactory.createApplicationContext(AppModule)
  const seedService = app.get(SeedService)

  try {
    await seedService.seedUsers()
    console.log('Seed completed successfully.')
  } catch (error) {
    console.error('Seed failed:', error)
  }

  await app.close()
}

bootstrap()
