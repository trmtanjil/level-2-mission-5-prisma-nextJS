type IOptions={
    page?:number|string,
    limit?:number|string,
    sortOrder?:string,
    sortBy?:string
}
const paginationSortingHelper=(options:IOptions)=>{
    console.log(options)
    return options
}

export default paginationSortingHelper;