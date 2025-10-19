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

type Query {
  hello: String,
  operazioni: [Operazione],
  conti: [Conto]
}
`
export default schema
