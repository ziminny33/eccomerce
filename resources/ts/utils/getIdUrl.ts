export const getIdUrl = () => {
    const { pathname } = location
    return parseInt(pathname.split("/")[pathname.split("/").length - 1]);
}