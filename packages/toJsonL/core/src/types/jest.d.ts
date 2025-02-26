declare module '@jest/globals' {
    export function describe(name: string, fn: any): any;
    export function test(name: string, fn: any): any;
    export function expect(actual: any): any;
} 