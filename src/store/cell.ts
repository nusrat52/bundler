
export type Celltypes = "code" | "text";

export interface Cell {
    id: string;
    type: Celltypes;
    content:string
}