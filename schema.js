const schema = `
type Conto {
  ID: ID,
  Nome: String,
}

type Operazione{
  ID: ID,
  Importo: Float,
  Descrizione: String,
  Conto_id: Conto
}

type Query {
  hello: String,
  operazioni: [Operazione],
  conti: [Conto]
}
`
export default schema
