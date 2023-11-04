import { Container } from 'inversify'
import 'reflect-metadata'
import BookRepositoryInterface from './interfaces/BookRepositoryInterface'
import BookRepository from './repositories/BookRepository'

export const container = new Container()
container.bind<BookRepositoryInterface>(BookRepository).toSelf().inSingletonScope();
