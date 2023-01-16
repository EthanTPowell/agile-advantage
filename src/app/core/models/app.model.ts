
export class Priority {
    constructor(public id: number, 
                public value: string){ }
}

export class Type {
    constructor(public id: number, 
                public value: string,
                public svg: string
        ){ }
}

export class Status {
    constructor(
                public id: number, 
                public keyField: string,
                public headerText: string,
                public value: string,
                public icon: string,
                public color: string,
                ){ 

                }
}

export class Location {
    constructor(public propertyId: number,
                public lat: number,
                public lng: number){ }
}

export class Gallery {
    constructor(public id: number, 
                public small: string,
                public medium: string,
                public big: string){ }
}

export class Pagination {
    constructor(public page: number,
                public perPage: number,
                public prePage: number,
                public nextPage: number,
                public total: number,
                public totalPages: number){ }
}