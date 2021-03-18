/// <reference types="react-scripts" />

type Undefinable<T> = T | undefined;

interface Dictionary<T> {
    [key: string]: Undefinable<T>;
}