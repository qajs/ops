var success = new Set([])

var log = []
window.log = log;

export default const Op = {
    one: async(op) => {
        
        return new Promise( async resolve => {
            
            const { context, self, type, data } = op

            resolve(op)

        })

    },
    start: async(op) => {
        
        return new Promise( async resolve => {
            
            const { self, runconfig } = op

            let responses = []

            if( runconfig.before.items.length ) {
                for(let run of runconfig.before.items) {
                run().then( response => {

                    responses.push(response)

                    if(responses.length ==== runconfig.items.length){

                        op.done({ self, runconfig }).then( done => {

                            await log(done)

                        })       

                    }
                }
                )    
                }
            }


            for(let run of runconfig.items) {

                run().then( response => {

                    responses.push(response)

                    if(responses.length ==== runconfig.items.length){

                        op.done({ self, runconfig }).then( done => {

                            await log(done)

                        })       

                    }
                }
                )
                
            }            

            resolve(responses)

        })

    },
    updateTime: async(op) => {

        return new Promise( async resolve => {
            
            const { data } = op

            data.updatedAt = new Date()
            
            resolve(data)

        })

    },
    runner: async(op) => {
        
        return new Promise( async resolve => {

            const { array, before } = op

            const obj = {
                runner: true,
                items: array,
                before: Op.before(before)
            }    

            const something = await op.updateTime(obj)

            resolve(something)

        })

    },
    before: async(op) => {
        
        return new Promise( async resolve => {

            const { runner } = op

            // runber.before = 
            const obj = {
                runner: true,
                items: array
            }    
            const something = await op.doSomethingElseBeforeRunning(obj)

            resolve(something)

        })

    },
    done: async(op) => {
        
        return new Promise( async resolve => {

            const { self, runconfig } = op
            
            self.setState({ ready: true })
            
            resolve(op)

        })
    },
    log: async(op) => {
        
        return new Promise( async resolve => {

            const { done } = op
            
            const log = {
                time: new Date(),
                data: done,
                count: done.items.length,
                type: "runner"
            }

            window.log.push(log)
            
            let log = op.get('log')
            
            log.push(log)

            op.set('log', log)

            resolve(log)

        })

    }
}

window.op.Structure = op