export class Book {
  $key: string;
  title: string;
  author?:string;
  cathegory:string;
  description:string;
  imageUrl?:string;
  isbn:string;
  body: string;
  active: boolean = true;
  timeStamp: number;
}
