const schema = `
type Conto {
  ID: ID,
  Nome: String,
  Operazioni: [Operazione]
}

type Operazione{
  ID: ID,
  Importo: Float,
  Descrizione: String,
  Conto: Conto
}

input CreateOperazioneInput{
  Importo: Float!,
  Descrizione:String!
  Conto: Int!,
  Tipo: String!
}
type Query {
  hello: String,
  operazioni: [Operazione],
  conti: [Conto]
}
type Mutation{
  CreateOperazione(input: CreateOperazioneInput) : Operazione!
}

`
export default schema
