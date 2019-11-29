export interface ITitleProps {
  title: string;
}

export interface IResponseCommon<T = any> {
  code: number;
  data: T ;
  message: string
}