export default interface IUpdateMeasureService {
  execute: (data: unknown) => Promise<void>
}
