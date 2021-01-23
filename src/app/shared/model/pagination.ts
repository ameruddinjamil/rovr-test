export class Pagination {
    page: number;
    limit: number;
    total: number;

    constructor(limit: number) {
        this.page = 1;
        this.limit = limit;
        this.total = 0;
    }

    resetPageNumber(): void {
        this.page = 1;
    }
}