export default interface Measure {
  id: string,
  value: number,
  type: 'GAS' | 'WATER',
  datetime: Date,
  hasConfirmed: boolean,
  imageUrl: string,
  clientCode: string,
}
