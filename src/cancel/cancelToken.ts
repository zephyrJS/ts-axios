import { CancelExecutor, CancelTokenSource, Canceler } from '../types'

interface ResovlePromise {
    (reason?: string): void
}

export default class CancelToken {
    promise: Promise<string>
    reason?: string

    constructor(executor: CancelExecutor) {
        let resolvePromise: ResovlePromise
        this.promise = new Promise<string>(resolve => {
            resolvePromise = resolve
        })

        executor(reason => {
            if (this.reason) {
                return
            }
            this.reason = reason
            resolvePromise(this.reason)
        })
    }

    static source(): CancelTokenSource {
        let cancel!: Canceler
        const token = new CancelToken(c => {
            cancel = c
        })
        return {
            token,
            cancel
        }
    }
}
