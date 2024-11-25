export type Paging = {
    size : number,
    current_page : number,
    total_page : number
}


export type Pageable<T> = {
    data : T[], 
    paging : Paging
}