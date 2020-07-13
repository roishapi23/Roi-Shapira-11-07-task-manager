export class Task{
    constructor(
       public taskName: string,
       public phone: string,
       public email: string,
       public userName: string,
       public taskDescription?: string,
       public id ?: number,
       public date?: string,
      //  public teamId: number,
      //  public teamId : number,
    ){}
}