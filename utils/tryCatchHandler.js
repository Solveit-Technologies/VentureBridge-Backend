
const tryCatchHandler = (reqHandler)=>{
    return (req, res,next)=>{
        Promise.resolve(reqHandler(req,res,next))
        .catch((err)=>next(err))

}}

export {tryCatchHandler}




//Adil please use tryCatchHandler like 
// const userCreate = asyncHandler(async (req, res) => { your logic  })
// don't use try catch 