import { Question } from './pregunta.model';
export class Test {

    constructor(
        public titulo: string,
        public descripcion?: string,
        public tiempo?: string,
        public instrucciones?: string,
        public intentos?: [],
        public preguntas?: [Question],
        public _id?: string
    ) { }

}

