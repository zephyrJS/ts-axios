import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './cancel'

interface ResovlePromise {
    (reason?: Cancel): void
}

export default class CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel

    constructor(executor: CancelExecutor) {
        let resolvePromise: ResovlePromise
        this.promise = new Promise<Cancel>(resolve => {
            resolvePromise = resolve
        })

        executor(message => {
            if (this.reason) {
                return
            }
            this.reason = new Cancel(message!)
            resolvePromise(this.reason)
        })
    }

    throwIfRequested() {
        if (this.reason) {
            throw this.reason
        }
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
