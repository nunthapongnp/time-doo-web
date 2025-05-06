export interface PagedData<T> {
    data: T[];
    page: Page;
}

export class Page {
    size: number = 10;
    totalElements: number = 0;
    totalPages: number = 0;
    pageNumber: number = 0;
    index: number = 0;
    sort: string = "";
}
