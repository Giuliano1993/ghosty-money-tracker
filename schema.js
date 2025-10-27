const schema = `
type Account{
  ID: ID,
  name: String,
  transactions: [Transaction],
  balance: Float
}

type Transaction{
  ID: ID,
  amount: Float,
  description: String,
  account: Account,
  type: String
}

input CreateTransactionInput{
  amount: Float!,
  description:String!
  account: Int!,
  type: String!
}
input CreateAccountInput{
  name: String!
}
input TransferInput{
  accountFrom: Int!,
  accountTo: Int!,
  amount:Float!
}
type Query {
  hello: String,
  transactions: [Transaction],
  accounts: [Account],
  totalSale: Float
}
type Mutation{
  createTransaction(input: CreateTransactionInput) : Transaction!,
  createAccount(input: CreateAccountInput): Account!,
  createTransfer(input: TransferInput): Boolean
}

`
export default schema
