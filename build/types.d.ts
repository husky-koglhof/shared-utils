/**
 * Negates a boolean
 */
export declare type Not<T extends boolean> = T extends true ? false : true;
/**
 * Combines two booleans using logical AND
 */
export declare type And<T1 extends boolean, T2 extends boolean> = T1 extends false ? false : T2 extends false ? false : true;
/**
 * Combines two booleans using logical AND
 */
export declare type Or<T1 extends boolean, T2 extends boolean> = T1 extends true ? true : T2 extends true ? true : false;
/**
 * Tests if the type TSource is assignable to TTarget
 */
export declare type AssignableTo<TSource, TTarget> = [TSource] extends [TTarget] ? true : false;
/**
 * Tests if two types are equal
 */
export declare type Equals<T, S> = [T] extends [S] ? ([S] extends [T] ? true : false) : false;
/**
 * Creates a union from the numeric keys of an Array or tuple.
 * The result is the union of all fixed entries and (if open-ended or an array) the type `number`
 */
export declare type IndizesOf<T extends any[], U = Omit<T, keyof []>, NumericKeysOfT = keyof U> = NumericKeysOfT | (number extends LengthOf<T> ? number : never);
/**
 * Creates a union from the types of an Array or tuple
 */
export declare type UnionOf<T extends any[]> = T[number];
/**
 * Returns the length of an array or tuple
 */
export declare type LengthOf<T extends any[]> = T["length"];
export declare type IsFixedLength<T extends any[]> = number extends LengthOf<T> ? false : true;
export declare type IsVariableLength<T extends any[]> = Not<IsFixedLength<T>>;
/**
 * Tests if a type is a fixed-length tuple (true) or an Array/open-ended tuple (false)
 */
export declare type IsTuple<T extends any[]> = IsFixedLength<T> extends true ? true : IndizesOf<T> extends number ? false : true;
/**
 * Tests if all types in an array or tuple are assignable to T
 */
export declare type Every<TArr extends any[], T> = Equals<UnionOf<TArr>, T>;
/**
 * Tests if all types in an array or tuple are strictly equal to T
 */
export declare type EveryStrict<TArr extends T[], T, OnlyTupleKeys = Omit<TArr, keyof []>, TupleKeysEqualT = {
    [P in keyof OnlyTupleKeys]: Equals<OnlyTupleKeys[P], T>;
}, AllTupleKeysTrue = TupleKeysEqualT[keyof TupleKeysEqualT]> = {
    "empty": Equals<T, never>;
    "tuple": Equals<AllTupleKeysTrue, true>;
    "array": T[] extends TArr ? true : false;
}[TArr extends [] ? "empty" : IsTuple<TArr> extends true ? "tuple" : "array"];
/**
 * Excludes the properties K from type T
 */
export declare type Omit<T, K> = {
    [P in Exclude<keyof T, K>]: T[P];
};
/**
 * Builds a subset of type T with the properties K that are all optional
 */
export declare type Optional<T, K> = {
    [P in Extract<keyof T, K>]+?: T[P];
};
/**
 * Makes the properties K in type T optional
 */
export declare type SemiPartial<T, K extends keyof T> = T extends never ? never : Omit<T, K> & Optional<T, K>;
/**
 * Extracts a union of possible key-value pairs from type T
 * @returns A union of `{key, value}` objects where `key` can take the values of `keyof T` and `value` the corresponding property types.
 */
export declare type KeyValuePairsOf<T extends Record<string, any>, U = {
    [K in keyof T]: {
        key: K;
        value: T[K];
    };
}> = U[keyof U];
/**
 * Returns the first item's type in a tuple
 */
export declare type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
/**
 * Returns all but the first item's type in a tuple/array
 */
export declare type Tail<T extends any[]> = ((...args: T) => any) extends ((head: any, ...tail: infer R) => any) ? R : never;
/**
 * Returns the given tuple/array with the item type prepended to it
 */
export declare type Unshift<List extends any[], Item> = ((first: Item, ...rest: List) => any) extends ((...list: infer R) => any) ? R : never;
/**
 * Returns a tuple of the function parameter types
 */
export declare type Arguments<F extends (...args: any[]) => any> = F extends ((...args: infer R) => any) ? R : never;
/** Takes the elements from T2 that have a corresponding index in T1 */
declare type MapTuples<T1 extends any[], T2 extends any[]> = {
    [K in keyof T1]: K extends keyof T2 ? T2[K] : never;
};
declare type TakeLastFixed<T extends any[], L1 extends number = Tail<T>["length"]> = T[L1];
declare type TakeLastVariable<T extends any[], MinusOne = keyof Tail<T>, PlusOne = keyof Unshift<T, never>, Index = Exclude<PlusOne, MinusOne>, U = T[Index]> = U;
/** Returns the last item in a tuple */
export declare type TakeLast<T extends any[]> = IsFixedLength<T> extends true ? TakeLastFixed<T> : TakeLastVariable<T>;
/** Removes the last item from a tuple */
export declare type DropLast<T extends any[], L extends number = LengthOf<T>, MinusOne extends any[] = Tail<T>> = Equals<L, number> extends true ? T : MapTuples<MinusOne, T>;
/** Forces T to be a tuple - this might discard type information */
declare type ForceTuple<T> = T extends any[] ? T : any[];
/** Forces T to be a function - this might discard type information */
declare type ForceFunction<T> = T extends ((...args: any[]) => any) ? T : ((...args: any[]) => any);
/**
 * Returns a promisified function signature for the given callback-style function
 * WARNING: This is still experimental. The names of the inferred signature args are off by one!
 */
export declare type Promisify<F extends (...args: any[]) => void, FArgs extends any[] = Arguments<F>, PromiseArgs extends any[] = ForceTuple<DropLast<FArgs>>, CallbackArgs extends any[] = Arguments<ForceFunction<TakeLast<FArgs>>>, CallbackLength = LengthOf<CallbackArgs>, TError = CallbackArgs[0], TResult = 1 extends CallbackLength ? void : CallbackArgs[1]> = (...args: PromiseArgs) => Promise<TResult>;
export {};
