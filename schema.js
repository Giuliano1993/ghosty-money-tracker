const schema = `
type Conto {
  ID: ID,
  Nome: String,
  Operazioni: [Operazione],
  Saldo: Float
}

type Operazione{
  ID: ID,
  Importo: Float,
  Descrizione: String,
  Conto: Conto,
  Tipo: String
}

input CreateOperazioneInput{
  Importo: Float!,
  Descrizione:String!
  Conto: Int!,
  Tipo: String!
}
input CreateContoInput{
  Nome: String!
}
input GirocontoInput{
  ContoFrom: Int!,
  ContoTo: Int!,
  Importo:Float!
}
type Query {
  hello: String,
  operazioni: [Operazione],
  conti: [Conto],
  totalePatrimonio: Float
}
type Mutation{
  CreateOperazione(input: CreateOperazioneInput) : Operazione!,
  CreateConto(input: CreateContoInput): Conto!,
  CreateGiroconto(input: GirocontoInput): Boolean
}

`
export default schema
