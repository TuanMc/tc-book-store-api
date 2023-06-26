class Pagination<T> {
    data: T;
    page: number;
    totalItems: number;

    constructor(data: T, page: number, totalItems: number) {
        this.data = data;
        this.page = page;
        this.totalItems = totalItems;
    }
}

export default Pagination;