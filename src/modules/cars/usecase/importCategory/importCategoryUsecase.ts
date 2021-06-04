import fs from 'fs'
import csvParser from 'csv-parse'
import { TCategoryRepository } from '../../repository/TCategoryRepository'

import { inject, injectable } from 'tsyringe'

type TCategoryPayload = {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUsecase {
  constructor(
    @inject("CategoryRepository")
    private repository: TCategoryRepository
  ) { }

  loadCategories(file: Express.Multer.File): Promise<TCategoryPayload[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const parser = csvParser()

      const categories: TCategoryPayload[] = []

      stream.pipe(parser)

      parser.on("data", async (line: string) => {
        const [name, description] = line
        console.log(line)
        categories.push({
          name,
          description
        })
      }).on("end", () => {
        fs.promises.unlink(file.path)
        resolve(categories)
      })
        .on("error", (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async cat => {
      const { name, description } = cat

      const categoryAlreadyExists = await this.repository.findByName(name)

      if (!categoryAlreadyExists) {
        this.repository.create({
          description,
          name
        })
      }
    })
  }
}
