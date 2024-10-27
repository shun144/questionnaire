type LoadableState<T> =
  | {
    status: "pending";
    promise: Promise<T>;
  }
  | {
    status: "fulfilled";
    data: T;
  }
  | {
    status: "rejected";
    error: unknown;
  };

export class Loadable<T> {
  #state: LoadableState<T>;
  constructor(promise: Promise<T>) {
    this.#state = {
      status: "pending",
      promise: promise.then(
        // thenの第一引数：resolveの状態で実行される処理
        (data) => {
          this.#state = {
            status: "fulfilled",
            data,
          };
          return data;
        },
        // thenの第二引数：rejectの状態で実行される処理 
        (error) => {
          this.#state = {
            status: "rejected",
            error,
          };
          throw error;
        }
      ),
    };
  }
  getOrThrow(): T {
    switch (this.#state.status) {
      case "pending":
        throw this.#state.promise;
      case "fulfilled":
        return this.#state.data;
      case "rejected":
        throw this.#state.error;
    }
  }
}