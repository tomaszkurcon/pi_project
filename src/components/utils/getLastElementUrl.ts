export const getLastElemenetUrl = (pathname:string):string => {
    return pathname.substring(pathname.lastIndexOf('/')+1)
}